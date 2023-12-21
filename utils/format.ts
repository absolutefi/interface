export const shortenAddress = (address?: string, frontLen = 10, backLen = 6) => {
  if (!address) return ''
  return address.slice(0, frontLen) + '...' + address.slice(-backLen)
}

// reg exp : positive number with up to 4 decimal places
export const regExpPositiveNumberWithDecimal = /^([1-9]\d*|0)(\.\d{1,4})?$/
