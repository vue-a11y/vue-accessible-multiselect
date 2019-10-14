import _ from 'lodash'

export async function open(wrapper) {
  wrapper.setData({ open: true })

  await wrapper.vm.$nextTick()

  return wrapper
}

export function getAllTypes({ except, only } = {}) {
  let types = [1, 'foo', true, {}, [], () => {}, undefined, null]

  if (except !== undefined) {
    if (Array.isArray(except)) {
      types = types.filter(type => {
        return except.every(e => !_[`is${getLodashSuffix(e)}`](type))
      })
    } else {
      throw new TypeError('Type of `options.except` should be Array')
    }
  }

  if (only !== undefined) {
    if (Array.isArray(only)) {
      types = types.filter(type => {
        return only.some(s => _[`is${getLodashSuffix(s)}`](type))
      })
    } else {
      throw new TypeError('Type of `options.only` should be Array')
    }
  }

  return types
}

function getLodashSuffix(type) {
  return type && type.name ? type.name : _.capitalize(String(type))
}
