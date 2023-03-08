import { StringUtil } from './string-util';

const generateVerifier = () => StringUtil.generateRandomString(32);
const generateChallenge = async (verifier: string) =>
  StringUtil.encode(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
    )
  );

export const generatePCKEPair = async () => {
  const verifier = generateVerifier();

  return {
    verifier,
    challenge: await generateChallenge(verifier),
  };
};

export const verifyChallenge = async (
  verifier: string,
  expectedChallenge: string
) => {
  const challenge = await generateChallenge(verifier);
  return challenge === expectedChallenge;
};
