class CryptoUtils {
  constructor() {}

  static encodeToUUIDs(input: string): string[] {
    const length = input.length;
    const lengthHex = length.toString(16).padStart(4, "0");
    const inputHex = Array.from(input)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");

    const fullHex = lengthHex + inputHex;
    const chunks = fullHex.match(/.{1,32}/g) || [];

    return chunks.map((chunk) => {
      const padded = chunk.padEnd(32, "0");
      return [
        padded.slice(0, 8),
        padded.slice(8, 12),
        padded.slice(12, 16),
        padded.slice(16, 20),
        padded.slice(20, 32),
      ].join("-");
    });
  }

  static decodeFromUUIDs(uuids: string[]): string {
    try {
      const hexChunks = uuids.map((uuid) => uuid.replace(/-/g, "").toLowerCase());
      const fullHex = hexChunks.join("");

      const lengthHex = fullHex.slice(0, 4);
      const dataLength = parseInt(lengthHex, 16);
      const hexData = fullHex.slice(4, 4 + dataLength * 2);

      let result = "";
      for (let i = 0; i < hexData.length; i += 2) {
        const hexPair = hexData.slice(i, i + 2);
        const charCode = parseInt(hexPair, 16);
        result += String.fromCharCode(charCode);
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to decode UUIDs: ${error}`);
    }
  }
}

export default CryptoUtils;
export { CryptoUtils };
