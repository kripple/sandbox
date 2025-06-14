export const sortByAlphabet = (array: string[]): string[] =>
  array.sort((a, b) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  });
