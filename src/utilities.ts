const toBinary = (hex: string): string => (
  parseInt(hex, 16).toString(2)
)

const toInt = (hex: string): number => (
  parseInt(hex, 16)
)

export { toBinary, toInt }
