export const options = val => {
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      const option = val[i]

      if (typeof option === 'object' && option !== null) {
        if ('value' in option && 'label' in option) {
          continue
        } else {
          return false
        }
      } else {
        return false
      }
    }

    return true
  } else {
    return false
  }
}

export const value = val =>
  val === undefined || val === null || Array.isArray(val)

export const transition = val => {
  return val === null || (typeof val === 'object' && 'name' in val)
}
