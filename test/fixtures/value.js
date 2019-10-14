import options from './options'

export default function value(count = options.length) {
  if (count > options.length) {
    console.warn('Provided count is greater then options length')
    count = options.length
  }

  return options.slice(0, count).map(option => option.value)
}
