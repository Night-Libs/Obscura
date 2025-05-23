
import { shuffle, apply } from "./cipher";
import { deriveKey, sha256 } from "./hash";
import { uuidToBytes } from "./helpers";
import { namespace, initMaster, convertFinal } from "./uuids";
import { xorEncode, xorDecode } from "./xor";

let localStorage: Storage;
if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
  const { LocalStorage } = await import("node-localstorage");
  localStorage = new LocalStorage("./scratch");
} else {
  localStorage = window.localStorage;
}



class Obscura {
  private keyHash!: Uint8Array;
  private map!: string;
  private inverseMap!: Record<string, string>;
  private master!: string;
  private passphrase!: string;

  constructor(passphrase: string) {
    this.passphrase = passphrase;
    console.log("[DEBUG] constructor  passphrase:", this.passphrase);
  }

  async init(): Promise<void> {
    console.log("[DEBUG:init] deriving keyHash");
    this.keyHash = await deriveKey(this.passphrase);
    console.log("[DEBUG:init] keyHash bytes:", this.keyHash);

    console.log("[DEBUG:init] generating substitution map");
    this.map = shuffle(this.keyHash);
    console.log("[DEBUG:init] map.length =", this.map.length, " map:", this.map);
    if (this.map.length !== 26) {
      throw new Error(`[DEBUG:init] invalid map length ${this.map.length}, expected 26`);
    }

    console.log("[DEBUG:init] building inverseMap");
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    this.inverseMap = {};
    for (let i = 0; i < 26; i++) {
      this.inverseMap[this.map[i]] = alphabet[i];
    }
    console.log("[DEBUG:init] inverseMap:", this.inverseMap);

    console.log("[DEBUG:init] initMaster() ");
    this.master = initMaster();
    console.log("[DEBUG:init] master UUID:", this.master);
    console.log("[DEBUG:init] init complete.");
  }

  static genPassphrase(len = 32): string {
    const bytes = crypto.getRandomValues(new Uint8Array(len));
    const pass = Array.from(bytes, b => String.fromCharCode(48 + (b % 75))).join("");
    console.log("[DEBUG] genPassphrase:", pass);
    return pass;
  }

  async encode(input: string): Promise<string> {
    console.log("\n[DEBUG:encode] input:", input);
    const pct = encodeURIComponent(input);
    console.log("[DEBUG:encode] URI-encoded:", pct);

    const sub = apply(pct, this.map);
    console.log("[DEBUG:encode] after substitution:", sub);

    const b64 = btoa(sub);
    console.log("[DEBUG:encode] base64:", b64);

    const hashBytes = await sha256(new TextEncoder().encode(b64));
    console.log("[DEBUG:encode] hashBytes:", hashBytes);

    const hashStr = Array.from(hashBytes).map(b => String.fromCharCode(b)).join("");
    console.log("[DEBUG:encode] hashStr:", JSON.stringify(hashStr));

    const xorBlob = xorEncode(new TextEncoder().encode(hashStr), this.passphrase);
    console.log("[DEBUG:encode] xorBlob:", xorBlob);

    const nsBytes = await namespace(this.keyHash, this.master);
    console.log("[DEBUG:encode] nsBytes:", nsBytes);

    const finalUuid = convertFinal(xorBlob, nsBytes);
    console.log("[DEBUG:encode] finalUuid:", finalUuid);

    try {
      localStorage.setItem(finalUuid, b64);
      console.log("[DEBUG:encode] stored b64 under key");
    } catch (e) {
      console.warn("[DEBUG:encode] failed to store b64:", e);
    }

    return finalUuid;
  }

  async decode(finalUuid: string): Promise<string> {
    console.log("\n[DEBUG:decode] finalUuid:", finalUuid);

    const stored = localStorage.getItem(finalUuid);
    console.log("[DEBUG:decode] localStorage.getItem:", stored);
    if (stored) {
      console.log("[DEBUG:decode] fast-path using stored base64");
      const sub = atob(stored);
      console.log("[DEBUG:decode] atob ", sub);
      const pct = sub.split("").map(ch => this.inverseMap[ch] ?? ch).join("");
      console.log("[DEBUG:decode] after inverseMap ", pct);
      const original = decodeURIComponent(pct);
      console.log("[DEBUG:decode] decodeURIComponent ", original);
      return original;
    }

    console.log("[DEBUG:decode] no stored base64, doing UUIDXOR inversion");
    const nsBytes = await namespace(this.keyHash, this.master);
    console.log("[DEBUG:decode] nsBytes:", nsBytes);

    const uuidBytes = uuidToBytes(finalUuid);
    console.log("[DEBUG:decode] UUID bytes:", uuidBytes);

    const blobBytes = new Uint8Array(uuidBytes.length);
    for (let i = 0; i < uuidBytes.length; i++) {
      blobBytes[i] = uuidBytes[i] ^ nsBytes[i];
    }
    console.log("[DEBUG:decode] blobBytes:", blobBytes);

    const blobStr = new TextDecoder().decode(blobBytes);
    console.log("[DEBUG:decode] blobStr:", JSON.stringify(blobStr));

    const rehashStr = xorDecode(blobStr, this.passphrase);
    console.log("[DEBUG:decode] rehashStr:", JSON.stringify(rehashStr));

    const rehashBytes = new Uint8Array(Array.from(rehashStr).map(ch => ch.charCodeAt(0)));
    console.log("[DEBUG:decode] rehashBytes:", rehashBytes);

    const b64 = new TextDecoder().decode(rehashBytes);
    console.log("[DEBUG:decode] recovered base64:", b64);

    const sub = atob(b64);
    console.log("[DEBUG:decode] atob ", sub);

    const pct = sub.split("").map(ch => this.inverseMap[ch] ?? ch).join("");
    console.log("[DEBUG:decode] after inverseMap ", pct);

    const original = decodeURIComponent(pct);
    console.log("[DEBUG:decode] decodeURIComponent ", original);

    return original;
  }
}
export default Obscura
export { Obscura }