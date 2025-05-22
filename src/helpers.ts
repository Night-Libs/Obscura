export function bytesToHex(bytes: Uint8Array){
    return Array.from(bytes).map(b=>b.toString(16).padStart(2, '0')).join('')
}
export function bytesToBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

export function base64ToBytes(b64: string): Uint8Array {
  return new Uint8Array([...atob(b64)].map(char => char.charCodeAt(0)));
}

// this is for other functions too trust trust (that can't be categorized)