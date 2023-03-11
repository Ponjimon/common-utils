import { StringUtil } from './string-util';

const bufToB64 = (buf: Uint8Array) => StringUtil.encode(buf, 'base64');
const b64ToBuf = (b64: string) => StringUtil.decode(b64, 'binary');

export async function importKey(secret: JsonWebKey, isPrivate: boolean) {
  return await crypto.subtle.importKey(
    'jwk',
    secret,
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
      hash: 'SHA-256',
    },
    true,
    isPrivate ? ['sign'] : ['verify']
  );
}

export async function signMessage(message: string, privateKey: JsonWebKey) {
  const key = await importKey(privateKey, true);
  const signature = await crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    },
    key,
    new TextEncoder().encode(message)
  );

  return bufToB64(new Uint8Array(signature));
}

export async function verifySignature(
  message: string,
  signature: string,
  publicKey: JsonWebKey
) {
  const key = await importKey(publicKey, false);
  const sigBuf = b64ToBuf(signature);

  return await crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    },
    key,
    sigBuf,
    new TextEncoder().encode(message)
  );
}
