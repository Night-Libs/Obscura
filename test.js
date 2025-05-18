import { Obscura } from "./dist/obscura.js";

const ob = new Obscura();

const k = ob.keyGen(8);

console.log("key:", k);

const data = "https://google.com";

const encrypted = ob.encode(data, k);

console.log("encrypted:", encrypted);

const decrypted = ob.decode(encrypted, k);

console.log("decrypted:", decrypted);
