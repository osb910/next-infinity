import {SignJWT, jwtVerify} from 'jose';
import {env} from './helpers';

const signJWT = async (
  payload: {key: string; sub: string},
  options: {exp: string}
) => {
  try {
    const secret = new TextEncoder().encode(env(payload.key));
    const alg = 'HS256';
    return new SignJWT(payload)
      .setProtectedHeader({alg})
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

const verifyJWT = async <T>(token: string, secret: string): Promise<T> => {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(secret)))
      .payload as T;
  } catch (error) {
    console.log(error);
    throw new Error('Your token has expired.');
  }
};

export {signJWT, verifyJWT};
