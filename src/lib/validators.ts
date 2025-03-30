import isEmail from 'validator/es/lib/isEmail';
import normalizeEmail from 'validator/es/lib/normalizeEmail';
import trim from 'validator/es/lib/trim';
import isEmpty from 'validator/es/lib/isEmpty';
import isStrongPassword from 'validator/es/lib/isStrongPassword';
import equals from 'validator/es/lib/equals';
import emailVerifier from './email-verifier';
import THE_DICTIONARY from '@/dictionaries';
import {Locale, defaultLocale} from '@/l10n';

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

export const signUpValidator = async (
  body: Record<string, string>,
  {
    locale,
    blockBurnerEmails = true,
  }: {locale?: Locale | null; blockBurnerEmails?: boolean} = {}
) => {
  const l10n = THE_DICTIONARY(locale ?? defaultLocale);
  const validated = {...body};
  const errors = [];
  const {email, name, password, confirmPassword} = body;
  if (!name || isEmpty(name)) {
    errors.push({field: 'name', message: l10n.auth.noNameErr});
  }

  if (name && trim(name).length < 2) {
    errors.push({field: 'name', message: l10n.auth.shortNameErr});
  }

  if (!email || isEmpty(email)) {
    errors.push({field: 'email', message: l10n.auth.noEmailErr});
  }

  if (email && !isEmail(email)) {
    errors.push({
      field: 'email',
      message: l10n.auth.invalidEmailErr,
    });
  }

  if (email && isEmail(email) && blockBurnerEmails) {
    const verifiedEmail = await emailVerifier(email);
    if (!verifiedEmail?.status) {
      const message =
        verifiedEmail?.error.message === 'Disposable email address'
          ? l10n.auth.burnerEmailErr
          : verifiedEmail?.error.message ?? l10n.auth.invalidEmailErr;
      errors.push({
        field: 'email',
        message,
      });
    }
  }

  if (!password || isEmpty(password)) {
    errors.push({field: 'password', message: l10n.auth.noPasswordErr});
  }

  if (!confirmPassword || isEmpty(confirmPassword)) {
    errors.push({
      field: 'confirmPassword',
      message: l10n.auth.noCofirmedPasswordErr,
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
      message: l10n.auth.weakPasswordErr,
    });
  }

  if (password && confirmPassword && !equals(password, confirmPassword)) {
    errors.push({
      field: 'confirmPassword',
      message: l10n.auth.noPasswordMatchErr,
    });
  }

  if (email && isEmail(email)) {
    validated.email = trim(
      normalizeEmail(email, {
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        all_lowercase: true,
      }) as string
    );
  }

  validated.name = name && trim(name);

  const errorMap = getErrorMap(errors);

  return {validated, errorMap};
};

export const loginValidator = (
  body: Record<string, string>,
  {locale}: {locale?: Locale | null} = {}
) => {
  const l10n = THE_DICTIONARY(locale ?? defaultLocale);
  const validated = {...body};
  const errors = [];
  const {email, password} = body;
  if (!email || isEmpty(email)) {
    errors.push({
      field: 'email',
      message: l10n.auth.noEmailOrUsernameErr,
    });
  }

  if (isEmail(email)) {
    validated.email = trim(
      normalizeEmail(email, {
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        all_lowercase: true,
      }) as string
    );
  }

  if (!password || isEmpty(password)) {
    errors.push({field: 'password', message: l10n.auth.noPasswordErr});
  }

  const errorMap = getErrorMap(errors);

  return {validated, errorMap};
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
