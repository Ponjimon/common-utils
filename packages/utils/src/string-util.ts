import invariant from 'tiny-invariant';

export class StringUtil {
  static encode(str: string, into?: 'base64'): string;
  static encode(str: string, into?: 'binary'): Uint8Array;
  static encode(buf: ArrayBuffer, into?: 'base64'): string;
  static encode(
    strOrBuf: string | ArrayBuffer,
    into: 'base64' | 'binary' = 'binary'
  ): string | Uint8Array {
    if (typeof strOrBuf === 'string') {
      const b64 = this.cleanBase64String(btoa(strOrBuf));
      return into === 'binary' ? new TextEncoder().encode(b64) : b64;
    }

    invariant(into === 'base64', `Invalid encoding ${into}`);

    return this.cleanBase64String(
      btoa(String.fromCharCode(...new Uint8Array(strOrBuf)))
    );
  }

  static decode(b64: string, into?: 'utf-8'): string;
  static decode(b64: string, into?: 'binary'): Uint8Array;
  static decode(buf: ArrayBuffer, into?: 'utf-8'): string;
  static decode(
    b64OrBuf: string | ArrayBuffer,
    into: 'utf-8' | 'binary' = 'binary'
  ): string | Uint8Array {
    if (typeof b64OrBuf === 'string') {
      const utf8String = atob(b64OrBuf);
      return into === 'binary'
        ? new TextEncoder().encode(utf8String)
        : utf8String;
    }

    invariant(
      b64OrBuf instanceof ArrayBuffer,
      `Expected input to be of type ArrayBuffer but got: ${typeof b64OrBuf}`
    );

    return atob(new TextDecoder().decode(b64OrBuf));
  }

  static generateRandomString(length: number): string {
    return this.encode(
      crypto.getRandomValues(new Uint8Array(length)),
      'base64'
    );
  }

  protected static cleanBase64String(str: string): string {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
}
