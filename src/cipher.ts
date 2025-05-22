export function shuffle(keyBytes: Uint8Array){
    if (keyBytes){
        if (!(keyBytes instanceof Uint8Array)) {
        throw new TypeError(`Expected keyBytes to be a Uint8Array. keyBytes type: ${typeof keyBytes}. keyBytes value: ${keyBytes}`);
    }
    console.log(typeof keyBytes)
    console.log("KEYBYTES VALUE:", keyBytes)
    const letters = "abcdefghijklmnopqrstuvwxyz".split('')
    var seed = keyBytes.reduce((seed: number,byte: number)=>seed^byte, 0)
    function rand(){
        seed = (seed * 0x6D2b79F5 + 1) >>> 0; 
        return seed
    }
    for (let x=letters.length-1; x>0; x--){
        const i = Math.floor(rand() * (x+1));
        [letters[x],letters[i]] = [letters[i],letters[x]]
    
    }
    return letters.join('')
    } else {
        throw new SyntaxError("You need to provide a keyBytes value when calling shuffle.")
    }
    
}
export function apply(txt: string, map: string){
    return txt.toLowerCase().split('').map(ch=>{
        const idx = ch.charCodeAt(0) - 97;
        return idx>=0 && idx<26 ? map[idx] : ch;
    }).join('');
}