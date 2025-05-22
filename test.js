import { Obscura } from "./dist/obscura.js"; // import obscura client

const ob = new Obscura(); // create new obscura instance
console.log("Created new Obscura")
// this is usage pay fucking attention
// so i wanted to make this super customizable so theres a bunch of stuff we have to do before using
// if need be we can generate a passphrase, or use our own
const passphrase_ = ob.genPassphrase(8) // parameter is the length of the passphrase
console.log("Created new passphase")
// or
// const passphrase_ = i_love_kids
// then, create a key/hash using the passphrase
const key = await ob.keyGen(passphrase_)
console.log("created new key hash")
// next, create the cipher
console.log("creating cipher.. this will take a while.")
const shuffle = ob.ob_shuffle(key)
console.log("created cipher")
// yes
// after this, we create our master
const master = ob.setMaster()
console.log("Master is set")
// then we can encode
const string = 'this is an encoded uuid (i love touching kids)'
const encoded = await ob.encode(string, key, shuffle, master, passphrase_)
console.log("Encoded")
console.log(encoded)