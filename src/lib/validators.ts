import isEmail from 'validator/es/lib/isEmail';
import normalizeEmail from 'validator/es/lib/normalizeEmail';
import trim from 'validator/es/lib/trim';
import isEmpty from 'validator/es/lib/isEmpty';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
import equals from 'validator/es/lib/equals';
import emailVerifier from './email-verifier';

const registerValidator = async (body: any) => {
  let newBody = {...body};
  const errors = [];
  const {email, name, password, confirmPassword} = body;
  if (isEmpty(name)) {
    errors.push({field: 'name', message: 'Please provide a name'});
  }

  if (name && name.length < 3) {
    errors.push({field: 'name', message: 'Name must be at least 3 characters'});
  }

  if (isEmpty(email)) {
    errors.push({field: 'email', message: 'Please provide an email address'});
  }

  // if (email && !isEmail(email)) {
  //   errors.push({
  //     field: 'email',
  //     message: 'Invalid email address',
  //   });
  // }

  if (email) {
    const verifiedEmail = await emailVerifier(email);
    !verifiedEmail?.status &&
      errors.push({
        field: 'email',
        message: verifiedEmail?.error.message ?? 'Invalid email address',
      });
  }

  if (isEmpty(password)) {
    errors.push({field: 'password', message: 'Please provide a password'});
  }

  if (isEmpty(confirmPassword)) {
    errors.push({
      field: 'confirmPassword',
      message: 'Confirmed password cannot be blank',
    });
  }

  if (
    password &&
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.push({
      field: 'password',
      message:
        'Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
    });
  }

  if (password && confirmPassword && !equals(password, confirmPassword)) {
    errors.push({
      field: 'confirmPassword',
      message: 'Passwords do not match',
    });
  }

  newBody.email = trim(
    normalizeEmail(email, {
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      all_lowercase: true,
    }) as string
  );

  newBody.name = trim(name);

  // errors.reduce(
  //   (
  //     acc: {[idx: string]: string},
  //     {field, message}: {field: string; message: string}
  //   ) => {
  //     acc[field] = message;
  //     return acc;
  //   },
  //   {}
  // ),

  return [newBody, errors];
};

const loginValidator = (body: any) => {
  let newBody = {...body};
  const errors = [];
  const {email, password} = body;
  if (isEmpty(email)) {
    errors.push({field: 'email', message: 'Please provide an email address'});
  }

  if (isEmpty(password)) {
    errors.push({field: 'password', message: 'Please provide a password'});
  }

  newBody.email = trim(
    normalizeEmail(email, {
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      all_lowercase: true,
    }) as string
  );

  return [newBody, errors];
};

export {registerValidator, loginValidator};
