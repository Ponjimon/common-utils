import { sign } from '@tsndr/cloudflare-worker-jwt';
import type {
  DecryptServiceAccountFunction,
  GetAccessTokenFunction,
} from './types';

export const decryptServiceAccount: DecryptServiceAccountFunction = async ({
  iv,
  key,
  cipher,
}) => {
  const importedKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    'AES-CBC',
    false,
    ['encrypt', 'decrypt']
  );
  const decipher = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: new TextEncoder().encode(iv), length: 128 },
    importedKey,
    Uint8Array.from(atob(cipher), c => c.charCodeAt(0))
  );
  return JSON.parse(new TextDecoder().decode(decipher));
};

const tokenUri = 'https://www.googleapis.com/oauth2/v4/token';
export const getAccessToken: GetAccessTokenFunction = async (
  { client_email, private_key, private_key_id },
  expiration = 3600
) => {
  const date = Math.floor(Date.now() / 1000);
  const jwt = await sign(
    {
      iss: client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: tokenUri,
      exp: date + expiration,
      iat: date,
    },
    private_key,
    {
      algorithm: 'RS256',
      header: {
        typ: 'JWT',
        kid: private_key_id,
      },
    }
  );
  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  return await res.json();
};
