import isEmail from 'validator/es/lib/isEmail';
import normalizeEmail from 'validator/es/lib/normalizeEmail';
import trim from 'validator/es/lib/trim';
import isEmpty from 'validator/es/lib/isEmpty';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
import equals from 'validator/es/lib/equals';
import emailVerifier from './email-verifier';

const getErrorMap = (errors: Array<{field: string; message: string}>) =>
  errors.reduce((acc, err) => {
    if (acc[err.field]) {
      acc[err.field] = [...acc[err.field], err.message];
    } else {
      acc[err.field] = [err.message];
    }
    acc.count = acc.count ? (acc.count = acc.count + 1) : (acc.count = 1);
    return acc;
  }, {} as {count: number} & Record<string, any>);

const registerValidator = async (body: Record<string, string>) => {
  const newBody = {...body};
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
    if (!verifiedEmail?.status) {
      errors.push({
        field: 'email',
        message: verifiedEmail?.error.message ?? 'Invalid email address',
      });
    }
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

const loginValidator = (body: Record<string, string>) => {
  const newBody = {...body};
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

export const contactValidator = ({
  email,
  name,
  message,
}: {
  email: string;
  name: string;
  message: string;
}): // lang?: string
{
  validated: Record<string, string>;
  errorMap: {count: number} & Record<string, string[]>;
} => {
  const validated = {email, name, message};
  const errors = [];

  if (isEmpty(email)) {
    errors.push({field: 'email', message: 'Please provide an email address'});
  }

  if (!isEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email address',
    });
  }

  if (isEmpty(name)) {
    errors.push({field: 'name', message: 'Please provide a name'});
  }

  if (name.length < 2) {
    errors.push({
      field: 'name',
      message: 'Name should be at least 2 characters',
    });
  }

  if (isEmpty(message)) {
    errors.push({field: 'message', message: 'Please provide a message'});
  }

  if (message.length < 7) {
    errors.push({
      field: 'message',
      message: 'Message should be at least 7 characters',
    });
  }

  validated.email = trim(
    normalizeEmail(email, {
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      all_lowercase: true,
    }) as string
  );

  validated.name = trim(name);
  validated.message = trim(message);

  const errorMap = getErrorMap(errors);

  return {validated, errorMap};
};

export const urlValidator = ({url, domain}: {url: string; domain?: string}) => {
  const validated = {url};
  const errors = [];

  if (isEmpty(url)) {
    errors.push({field: 'url', message: 'Please provide a URL'});
  }

  if (!url.startsWith('http')) {
    errors.push({field: 'url', message: 'Invalid URL. Must start with http'});
  }

  if (domain && !url.includes(domain)) {
    errors.push({
      field: 'url',
      message: `URL must contain ${domain}`,
    });
  }

  validated.url = trim(url);

  const errorMap = getErrorMap(errors);

  return {validated, errorMap};
};

export {registerValidator, loginValidator};
