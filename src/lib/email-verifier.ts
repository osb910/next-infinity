export type EmailVerifierResponse =
  | {status: true; email: string; domain: string}
  | {status: false; error: {code: number; message: string}};

const emailVerifier = async (email: string) => {
  try {
    const res = await fetch(
      `https://verifier.meetchopra.com/verify/${email}?token=${process.env.EMAIL_VERIFIER_TOKEN}`,
      {cache: 'no-store'}
    );
    const json = await res.json();
    return json as EmailVerifierResponse;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
  }
};

export default emailVerifier;
