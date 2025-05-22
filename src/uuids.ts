/* class CryptoUtils {
  constructor() {}

  static encodeToUUIDs(input: string): string[] {
    const length = input.length;
    const lengthHex = length.toString(16).padStart(4, "0");
    const inputHex = Array.from(input)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");

    const fullHex = lengthHex + inputHex;
    const chunks = fullHex.match(/.{1,32}/g) || [];

    return chunks.map((chunk) => {
      const padded = chunk.padEnd(32, "0");
      return [
        padded.slice(0, 8),
        padded.slice(8, 12),
        padded.slice(12, 16),
        padded.slice(16, 20),
        padded.slice(20, 32),
      ].join("-");
    });
  }

  static decodeFromUUIDs(uuids: string[]): string {
    try {
      const hexChunks = uuids.map((uuid) => uuid.replace(/-/g, "").toLowerCase());
      const fullHex = hexChunks.join("");

      const lengthHex = fullHex.slice(0, 4);
      const dataLength = parseInt(lengthHex, 16);
      const hexData = fullHex.slice(4, 4 + dataLength * 2);

      let result = "";
      for (let i = 0; i < hexData.length; i += 2) {
        const hexPair = hexData.slice(i, i + 2);
        const charCode = parseInt(hexPair, 16);
        result += String.fromCharCode(charCode);
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to decode UUIDs: ${error}`);
    }
  }
}

export default CryptoUtils;
export { CryptoUtils };
*/
// the links will get way too long way too fast!! reimplemented below
import { v4 as uuidv4 } from "uuid";
import { v5 as uuidv5 } from "uuid";
import { sha256 } from "./hash";

// Type definition shim for environments lacking `localStorage`
let localStorage: Storage;

if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
  
  const { LocalStorage } = await import("node-localstorage");
  localStorage = new LocalStorage("./scratch");
} else {
  
  localStorage = window.localStorage;
}

export function initMaster(): string {
  const existing = localStorage.getItem("masterUUID");
  if (existing) return existing;

  const newUUID = uuidv4();
  localStorage.setItem("masterUUID", newUUID);
  return newUUID;
}

export async function namespace(initialKeyHash: Uint8Array, master: string): Promise<Uint8Array> {
  const masterBytes = new TextEncoder().encode(master);
  const combined = new Uint8Array(initialKeyHash.length + masterBytes.length);
  combined.set(initialKeyHash);
  combined.set(masterBytes, initialKeyHash.length);


  const hash = await sha256(combined);
  return hash.slice(0, 16); 
}

export function convertFinal(xor: string, NAMESPACE: Uint8Array<ArrayBufferLike>): string {
  return uuidv5(xor, NAMESPACE);
}
