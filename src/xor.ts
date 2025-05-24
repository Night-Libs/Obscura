// unneeded. just export the functions

/* class Xor {
    constructor() { }

    public encode(input: string, key: string): string {
        let output = "";
        for (let i = 0; i < input.length; i++) {
            const keyChar = key[i % key.length];
            const keyCode = keyChar.charCodeAt(0);
            const charCode = input.charCodeAt(i) ^ keyCode;
            output += String.fromCharCode(charCode);
        }
        return encodeURIComponent(output);
    }

    public decode(input: string, key: string): string {
        const decoded = decodeURIComponent(input);
        let output = "";
        for (let i = 0; i < decoded.length; i++) {
            const keyChar = key[i % key.length];
            const keyCode = keyChar.charCodeAt(0);
            const charCode = decoded.charCodeAt(i) ^ keyCode;
            output += String.fromCharCode(charCode);
        }
        return output;
    }
}

export default Xor;
export { Xor };
*/

export function xorEncode(input: string, key: string): string;
export function xorEncode(input: Uint8Array, key: string): string;

export function xorEncode(input: string | Uint8Array, key: string): string {
  const data: Uint8Array =
    typeof input === "string"
      ? new TextEncoder().encode(input) // String → UTF-8 bytes :contentReference[oaicite:5]{index=5}
      : input; // Already bytes

  const keyBytes = Array.from(key).map((ch) => ch.charCodeAt(0));

  let output = "";
  for (let i = 0; i < data.length; i++) {
    const xorByte = data[i] ^ keyBytes[i % keyBytes.length];
    output += String.fromCharCode(xorByte);
  }

  return encodeURIComponent(output);
}

export function xorDecode(input: string, key: string): string;
export function xorDecode(input: Uint8Array, key: string): string;

export function xorDecode(input: string | Uint8Array, key: string): string {
  const rawStr: string =
    typeof input === "string"
      ? decodeURIComponent(input)
      : Array.from(input)
          .map((b) => String.fromCharCode(b))
          .join("");

  const keyBytes = Array.from(key).map((ch) => ch.charCodeAt(0));

  let decoded = "";
  for (let i = 0; i < rawStr.length; i++) {
    const origByte = rawStr.charCodeAt(i) ^ keyBytes[i % keyBytes.length];
    decoded += String.fromCharCode(origByte);
  }

  return decoded;
}
