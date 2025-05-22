import { shuffle } from "./cipher";
import { deriveKey, sha256 } from "./hash";
import { convertFinal, initMaster } from "./uuids";
import { namespace } from "./uuids";
import { apply } from "./cipher"

import { xorEncode } from "./xor";
class Obscura {
  constructor(
    
  ) 
  {

  }
  genPassphrase(length = 32): string {
        const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (b) => String.fromCharCode(48 + (b % 75))).join("");
  }
  async keyGen(passphrase: string): Promise<Uint8Array<ArrayBufferLike>> {
    return await deriveKey(passphrase)
  }
  ob_shuffle(keyHash: Uint8Array): string{
    return shuffle(keyHash)
  }
  setMaster(){
    initMaster()
  }
  async encode(input: string, key: Uint8Array, map: string, master: string, passphrase: string): Promise<string> {
    input = encodeURIComponent(input)
    const ciphered = apply(input, map)
    const b64 = btoa(ciphered)
    const rehash = await sha256(new TextEncoder().encode(b64))
    // convert rehash bytes to string to encode with xor
    const rehashStr = Array.from(rehash).map(byte => String.fromCharCode(byte)).join('')
    const xor = xorEncode(new TextEncoder().encode(rehashStr), passphrase)
    const NAMESPACE = await namespace(key, master)
    console.log(`namespace: ${NAMESPACE}. type of for namespace ${typeof NAMESPACE}`)
    const final = convertFinal(xor, NAMESPACE)
    return final
  }

  decode(input: string, key: string): string {
   console.log(input)
   console.log(key)
   return input
  }
}

export default Obscura;
export { Obscura };
