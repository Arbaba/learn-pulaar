function pickRandom<T>(array: T[]): T {
  if (array.length == 0) {
    throw new Error("Empty array");
  }
  return array[Math.floor(Math.random() * array.length)];
}

export function pickNRandom<T>(
  array: T[],
  n: number,
  equals: (arg1: T, arg2: T) => boolean
): T[] {
  const picked: T[] = [];
  for (let index = 0; index < n; index++) {
    const candidates = array.filter((x) => !picked.find((y) => equals(x, y)));
    const randomWord = pickRandom(candidates);
    picked.push(randomWord);
  }
  return picked;
}

export function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
