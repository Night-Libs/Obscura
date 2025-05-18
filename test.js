import { Obscura } from "./dist/obscura.js";

const ob = new Obscura();

const k = ob.keyGen(8);

console.log("key:", k);

const message = "Hello, world!";

const encoded = ob.xor.encode(message, k);
const decoded = ob.xor.decode(encoded, k);

console.log("encoded:", encoded);  // ✅ "Hello, world!"
console.log("decoded:", decoded);  // ✅ "Hello, world!"

console.log("XOR OK?", decoded === message);  // ✅ true


const data = "Hello, world!";

const encrypted = ob.encode(data, k);

console.log("encrypted:", encrypted);

const decrypted = ob.decode(encrypted, k);

console.log("decrypted:", decrypted);
