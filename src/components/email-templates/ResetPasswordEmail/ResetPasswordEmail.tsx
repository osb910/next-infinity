interface ResetPasswordEmailProps {
  resetUrl: string;
}

const ResetPasswordEmail = ({resetUrl}: ResetPasswordEmailProps) => {
  return (
    <section>
      <p>
        You are receiving this because you (or someone else) have requested the
        reset of the password for your account.
      </p>
      <p>
        Please click on the following{' '}
        <a href={resetUrl} target='_blank' rel='noreferrer'>
          link
        </a>
        , or paste this into your browser to complete the process: {resetUrl}
      </p>
      <p>
        If you did not request this, please ignore this email and your password
        will remain unchanged.
      </p>
    </section>
  );
};

export default ResetPasswordEmail;
