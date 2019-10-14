export function getItemsByRange(array, from, to) {
  if (to < from) {
    to = [from, (from = to)][0]
  }

  return array.slice(from, to + 1)
}