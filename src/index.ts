import CryptoUtils from "./uuids";
import Xor from "./xor";

class Obscura {
  xor: Xor = new Xor();

  constructor() {}

  keyGen(length = 32): string {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (b) => String.fromCharCode(48 + (b % 75))).join("");
  }

  encode(input: string, key: string): string {
    const xorEncoded = this.xor.encode(input, key);
    const base64Encoded = btoa(xorEncoded);
    const uuids = CryptoUtils.encodeToUUIDs(base64Encoded);
    return uuids.join("+");
  }

  decode(input: string, key: string): string {
    const uuids = input.split("+");
    const base64Encoded = CryptoUtils.decodeFromUUIDs(uuids);
    const xorDecoded = atob(base64Encoded);
    return this.xor.decode(xorDecoded, key);
  }
}

export default Obscura;
export { Obscura };
