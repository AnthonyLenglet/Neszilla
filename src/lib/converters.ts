export const HexToBinary = (hex: string): string => (
  parseInt(hex, 16).toString(2)
)

export const HexToInt = (hex: string): number => (
  parseInt(hex, 16)
)
