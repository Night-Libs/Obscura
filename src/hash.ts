// web crypto api is needed for execution
export async function sha256(bytes: Uint8Array) {
  const hashbuffer = await crypto.subtle.digest("SHA-256", bytes);
  return new Uint8Array(hashbuffer);
}
export async function deriveKey(input: string) {
  const data = new TextEncoder().encode(input);
  return sha256(data);
}
export async function rehashb64(b64input: string) {
  return sha256(new TextEncoder().encode(b64input));
}
