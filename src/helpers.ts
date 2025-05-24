export function bytesToHex(bytes: Uint8Array){
    return Array.from(bytes).map(b=>b.toString(16).padStart(2, '0')).join('')
}
export function bytesToBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

export function base64ToBytes(b64: string): Uint8Array {
  return new Uint8Array([...atob(b64)].map(char => char.charCodeAt(0)));
}
export function uuidToBytes(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
// this is for other functions too trust trust (that can't be categorized)
// mostly conversions