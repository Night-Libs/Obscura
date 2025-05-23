import { Obscura } from "./dist/obscura.js"; // import obscura client

(async () => {

  const passphrase = Obscura.genPassphrase(8);
  console.log("Generated passphrase:", passphrase);

  const ob = new Obscura(passphrase);
  console.log("Created new Obscura instance");

  // should we stick to ts init or should we make it more manual but customizable where the user has to manually run these functions? (this could make it so that the user could further encrypt/shuffle a random amount of times.. tho will need sm1's opinion on ts)
  console.log("Initializing (key derivation + map build) …");
  await ob.init();
  console.log("Initialization complete");

  const input = "this is an encoded uuid";
  console.log("Encoding input:", input);
  const uuid = await ob.encode(input);
  console.log("Encoded UUID:", uuid);

  console.log("Decoding back …");
  const result = await ob.decode(uuid);
  console.log("Decoded:", result);
})();
