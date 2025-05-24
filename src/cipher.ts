export function shuffle(seedBytes: Uint8Array): string {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  let seed =
    ((seedBytes[0] << 24) |
      (seedBytes[1] << 16) |
      (seedBytes[2] << 8) |
      seedBytes[3]) >>>
    0;

  function rand() {
    seed = (seed * 0x6d2b79f5 + 1) >>> 0;
    return seed;
  }

  for (let x = letters.length - 1; x > 0; x--) {
    const i = Math.floor((rand() / 0xffffffff) * (x + 1));
    [letters[x], letters[i]] = [letters[i], letters[x]];
  }

  return letters.join("");
}

export function apply(txt: string, map: string) {
  return txt
    .toLowerCase()
    .split("")
    .map((ch) => {
      const idx = ch.charCodeAt(0) - 97;
      return idx >= 0 && idx < 26 ? map[idx] : ch;
    })
    .join("");
}
