import type {Locale} from '@/l10n';
import {parseFiveNouns} from '@/lib/text/ar/five-nouns';

const auth = (locale: Locale, options?: Record<string, any>) => {
  const parsing = options?.parsing || 'nominative';
  const gender = options?.gender ?? 'M';
  const localizedName =
    locale === 'ar'
      ? parseFiveNouns(options?.name ?? 'أخو العرب', {parsing})
      : options?.name ?? 'User';

  const localizedUser = `صديق${gender === 'F' ? 'ة' : ''} الموقع`;
  const dict = {
    ar: {
      noNameErr: 'نرجو وضع الاسم.',
      shortNameErr: 'لا بد للاسم أن يكون من حرفين فأكثر.',
      noEmailErr: 'نرجو وضع بريد إلكتروني.',
      noEmailOrUsernameErr: 'نرجو وضع بريد إلكتروني أو معرِّف.',
      invalidUsernameErr: 'المعرِّف غير صالح.',
      invalidEmailErr: 'البريد الإلكتروني غير صالح.',
      burnerEmailErr: 'هذا البريد وهمي، نرجو استعمال بريد حقيقي فضلًا.',
      emailInUseErr: 'بريدكم هذا نعرفه، لعلكم تريدون الدخول بحسابكم.',
      noPasswordErr: 'نرجو وضع كلمة السر.',
      noCofirmedPasswordErr: 'نرجو توكيد كلمة السر.',
      weakPasswordErr:
        'لا بد لكلمة السر ألا تقل عن ثمانية أحرف، وأن يكون منها حرف صغير وكبير وعددٌ ورمزٌ أو أكثر.',
      noPasswordMatchErr: 'كلمة السر وتوكيدها غيرُ متطابقَين.',
      invalidCredentials: 'كلمة السر خطأ.',
      accountLocked:
        'حسابكم مغلق من كثرة المحاولات الخائبة. يسعكم الرجوع بعد نصف ساعة.',
      welcomePreview: `حللتم أهلًا ووطئتم سهلًا يا ${localizedName}`,
      welcomeMessage: `حللتم أهلًا ووطئتم سهلًا يا ${localizedName} بين رواد الموقع!`,
      welcomeBackMessage: `عودًا حميدًا يا ${localizedName}!`,
      verificationEmailMessage: `إلى ${localizedUser} ${localizedName}...`,
      verificationCode: 'إليكم رمز توثيقكم:',
      verificationExpiry:
        'يبطُل هذا الرمز بعد أربع وعشرين ساعة، فليُستعمَل قبل فوات الأوان.',
      invalidInput: 'أدخلتم شيئًا فاسدًا، لعلكم تُعيدون الكرَّة.',
      emailSendingFailed:
        'عجزنا عن إرسال بريد التوثيق إليكم، لعلكم تأتوننا غدًا.',
      signupSuccess: 'مرحبًا بكم! تجدون في بريدكم رمز التوثيق الذي نطلبه.',
      invalidVerificationCode: 'رمز التوثيق غير صحيح.',
      accountAlreadyVerified: 'حسابكم موثق من قبل.',
      verificationCodeExpired: 'رمز التوثيق هذا باطل، نرجو إعادة التوثيق.',
      accountVerified: 'صار حسابكم موثقًا.',
      userNotFound: 'ليس عندنا حساب بهذا البريد.',
      verificationCodeSent: 'أرسلنا إليكم رمز التوثيق.',
      verificationCodeAlreadySent:
        'قد أرسلنا رمز التوثيق من قبل، تجدونه في بريدكم.',
    },
    en: {
      noNameErr: 'Please enter a name.',
      shortNameErr: 'Name must be at least 2 characters',
      noEmailErr: 'Please provide an email address',
      noEmailOrUsernameErr: 'Please provide an email address or username',
      invalidUsernameErr: 'Invalid username.',
      invalidEmailErr: 'Invalid email address.',
      burnerEmailErr: 'Disposable email address. Please use your real email.',
      emailInUseErr: 'Email already in use. Please login instead.',
      noPasswordErr: 'Please enter a password.',
      noCofirmedPasswordErr: 'Please confirm your password.',
      weakPasswordErr:
        'Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol.',
      noPasswordMatchErr: 'Password and password confirmation do not match.',
      invalidCredentials: 'Invalid credentials.',
      accountLocked:
        'Account locked due to too many failed login attempts. Try again in 30 minutes.',
      welcomePreview: `Welcome, ${localizedName}`,
      welcomeMessage: `Hello, ${localizedName}. And Welcome to Rasaif!`,
      welcomeBackMessage: `Welcome back, ${localizedName}!`,
      verificationEmailMessage: `Dear Rasaif user ${localizedName},`,
      verificationCode: 'Here is your verification code:',
      verificationExpiry:
        'This code will expire in 24 hours, please use it before it expires.',
      invalidInput: 'Invalid input. Please fix any errors and try again',
      emailSendingFailed:
        'Failed to send verification email. Please try again tomorrow.',
      signupSuccess:
        'Welcome! Please check your email for a verification code.',
      invalidVerificationCode: 'Invalid verification code.',
      accountAlreadyVerified: 'Your account is already verified.',
      verificationCodeExpired: 'Verification code has expired.',
      accountVerified: 'Your account has been verified.',
      userNotFound: 'No user found with that email.',
      verificationCodeSent: 'Verification code sent.',
      verificationCodeAlreadySent:
        'Verification code already sent. Please check your email.',
    },
  };
  return dict[locale];
};

export default auth;
