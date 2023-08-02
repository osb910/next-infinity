import {NextRequest, NextResponse} from 'next/server';
import User from '@/entities/next-stores/user/user.model';
import {randomBytes} from 'crypto';
import sendEmail from '@/lib/email-sender';
import ResetPasswordEmail from '@/components/email-templates/ResetPasswordEmail';

export const POST = async (req: NextRequest) => {
  try {
    const {email} = await req.json();
    const user = await User.findOne({email});
    const responseMsg = {
      status: 'notice',
      message: 'A password reset has been sent in case the email exists.',
    };
    if (!user) {
      return NextResponse.json(responseMsg, {status: 404});
    }
    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        resetPasswordToken: randomBytes(32).toString('hex'),
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      {new: true}
    );
    if (!updated) return NextResponse.json(responseMsg, {status: 404});
    const resetUrl = `${req.headers.get(
      'origin'
    )}/api/next-stores/auth/reset-password?token=${updated.resetPasswordToken}`;
    const sent = await sendEmail({
      email: updated.email,
      subject: 'Password Reset Request',
      react: ResetPasswordEmail({resetUrl}),
    });
    return NextResponse.json({...responseMsg});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get('token');
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: Date.now()},
    });
    if (!user) {
      return NextResponse.redirect(
        new URL(
          `/next-stores?sub-page=login&error=Password reset token is invalid or has expired.`,
          req.url
        )
      );
    }
    return NextResponse.redirect(
      new URL(
        `/next-stores?sub-page=reset-password&reset-token=${token}`,
        req.url
      )
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const {newPassword, confirmNewPassword, resetToken} = await req.json();
    console.log({newPassword, confirmNewPassword, resetToken});
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        {status: 'error', message: 'Passwords do not match.'},
        {status: 400}
      );
    }
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: {$gt: Date.now()},
    });
    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Password reset token is invalid or has expired.',
        },
        {status: 400}
      );
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return NextResponse.json({
      status: 'success',
      message: 'Password has been reset!',
    });
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
