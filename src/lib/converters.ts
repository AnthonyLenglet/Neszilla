export const HexToBinary = (hex: string): string => (
  parseInt(hex, 16).toString(2)
)

export const HexToInt = (hex: string): number => (
  parseInt(hex, 16)
)

export const Uarr8BitToInt = (u8Bit: number[]): number => (
  parseInt(u8Bit.join(''), 2)
)

export const IntToUarr8Bit = (int: number): number[] => {
  let uInt10 = int
  if (int > 255 || int < -255) {
    uInt10 = 255
  }

  return Array.from(
    (Math.abs(uInt10) >> 0).toString(2).padStart(8, '0'),
  ).map((character: string) => {
    return parseInt(character, 10)
  })
}

export const Arr8BitToInt = (arr8Bit: number[]): number => {
  const int10 = parseInt(arr8Bit.join(''), 2)
  return (int10 > 127) ? (int10 - 256) : (int10)
}

export const IntToArr8Bit = (int: number): number[] => {
  let int10 = int
  if (int10 > 127) { int10 = 127 }
  else if (int10 < -128) { int10 = -128 }

  if (int10 < 0) { int10 += 256 }

  return IntToUarr8Bit(int10)
}
