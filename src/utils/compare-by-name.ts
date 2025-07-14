export default function compareByName<T extends { index: number }>(a: T, b: T) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }

  return 0;
}
