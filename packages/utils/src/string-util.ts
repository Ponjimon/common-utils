const base64abc = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '/',
];

/**
 * @ack [
 *  https://deno.land/std@0.179.0/encoding/base64.ts
 * ]
 */
export class StringUtil {
  static encode(str: string, into?: 'base64'): string;
  static encode(str: string, into?: 'binary'): Uint8Array;
  static encode(buf: ArrayBuffer, into?: 'base64'): string;
  static encode(
    strOrBuf: string | ArrayBuffer,
    into: 'base64' | 'binary' = 'binary'
  ): string | Uint8Array {
    const uint8 =
      typeof strOrBuf === 'string'
        ? new TextEncoder().encode(strOrBuf)
        : strOrBuf instanceof Uint8Array
        ? strOrBuf
        : new Uint8Array(strOrBuf);

    let result = '',
      i;
    const l = uint8.length;
    for (i = 2; i < l; i += 3) {
      result += base64abc[uint8[i - 2] >> 2];
      result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
      result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)];
      result += base64abc[uint8[i] & 0x3f];
    }
    if (i === l + 1) {
      // 1 octet yet to write
      result += base64abc[uint8[i - 2] >> 2];
      result += base64abc[(uint8[i - 2] & 0x03) << 4];
      result += '==';
    }
    if (i === l) {
      // 2 octets yet to write
      result += base64abc[uint8[i - 2] >> 2];
      result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
      result += base64abc[(uint8[i - 1] & 0x0f) << 2];
      result += '=';
    }

    if (into === 'base64') {
      return result;
    }

    return new TextEncoder().encode(result);
  }

  static decode(b64: string, into?: 'utf-8'): string;
  static decode(b64: string, into?: 'binary'): Uint8Array;
  static decode(buf: ArrayBuffer, into?: 'utf-8'): string;
  static decode(
    b64OrBuf: string | ArrayBuffer,
    into: 'utf-8' | 'binary' = 'binary'
  ): string | Uint8Array {
    const binString =
      typeof b64OrBuf === 'string'
        ? atob(b64OrBuf)
        : new TextDecoder().decode(b64OrBuf);
    const size = binString.length;
    const bytes = new Uint8Array(size);

    for (let i = 0; i < size; i++) {
      bytes[i] = binString.charCodeAt(i);
    }

    if (into === 'utf-8') {
      return new TextDecoder().decode(bytes);
    }

    return bytes;
  }

  static generateRandomString(length: number): string {
    return this.encode(
      crypto.getRandomValues(new Uint8Array(length)),
      'base64'
    );
  }

  static cleanBase64String(str: string): string {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
}
