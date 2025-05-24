import "./style.css";
import { Obscura } from "@nightnetwork/obscura";

document.querySelector("#app").innerHTML = `
  <div class="container">
    <h1>Obscura Testing</h1>
    <label for="passphrase">Passphrase</label>
    <input id="passphrase" type="text" placeholder="Enter passphrase or leave blank to generate" />
    <button id="gen-pass">Generate Passphrase</button>

    <label for="input">Input Text</label>
    <textarea id="input" rows="3" placeholder="Text to encode..."></textarea>
    <button id="encode">Encode</button>

    <label for="uuid">Encoded UUID</label>
    <input id="uuid" type="text" placeholder="Encoded UUID will appear here" readonly />
    <button id="decode">Decode</button>

    <div class="result" id="result"></div>
  </div>
`;

const passInput = document.getElementById("passphrase");
const genPassBtn = document.getElementById("gen-pass");
const input = document.getElementById("input");
const encodeBtn = document.getElementById("encode");
const uuidInput = document.getElementById("uuid");
const decodeBtn = document.getElementById("decode");
const result = document.getElementById("result");

genPassBtn.onclick = () => {
  const pass = Obscura.genPassphrase(12);
  passInput.value = pass;
};

encodeBtn.onclick = async () => {
  result.textContent = "";
  const pass = passInput.value || Obscura.genPassphrase(12);
  passInput.value = pass;
  const obscura = new Obscura(pass);
  await obscura.init();
  const text = input.value;
  if (!text) {
    result.textContent = "Please enter text to encode.";
    return;
  }
  try {
    const uuid = await obscura.encode(text);
    uuidInput.value = uuid;
    result.textContent = "Encoded UUID: " + uuid;
  } catch (e) {
    result.textContent = "Error encoding: " + e;
  }
};

decodeBtn.onclick = async () => {
  result.textContent = "";
  const pass = passInput.value;
  const uuid = uuidInput.value;
  if (!pass || !uuid) {
    result.textContent = "Please provide both passphrase and encoded UUID.";
    return;
  }
  const obscura = new Obscura(pass);
  await obscura.init();
  try {
    const decoded = await obscura.decode(uuid);
    result.textContent = "Decoded: " + decoded;
  } catch (e) {
    result.textContent = "Error decoding: " + e;
  }
};
