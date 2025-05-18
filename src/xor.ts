

class Xor {
    constructor() { }

    public encode(input: string, key: string): string {
        let output = "";
        for (let i = 0; i < input.length; i++) {
            const keyChar = key[i % key.length];
            const keyCode = keyChar.charCodeAt(0);
            const charCode = input.charCodeAt(i) ^ keyCode;
            output += String.fromCharCode(charCode);
        }
        return encodeURIComponent(output);
    }

    public decode(input: string, key: string): string {
        const decoded = decodeURIComponent(input);
        let output = "";
        for (let i = 0; i < decoded.length; i++) {
            const keyChar = key[i % key.length];
            const keyCode = keyChar.charCodeAt(0);
            const charCode = decoded.charCodeAt(i) ^ keyCode;
            output += String.fromCharCode(charCode);
        }
        return output;
    }
}

export default Xor;
export { Xor };
