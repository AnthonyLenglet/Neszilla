import { toInt } from '../utilities'

export class Cart implements Neszilla.Cart {
  private readonly RECIEVED_DATA: string[]
  private readonly firstLine: string[]
  public readonly CHR_ROM: string[][]
  public readonly PRG_ROM: string[][]

  constructor(data: string[]) {
    this.RECIEVED_DATA = data

    this.firstLine = this.RECIEVED_DATA.splice(0x00, 0x10)

    // dispatch the rest of the data into the PRG and CHR ROM
    // based on the amount of pages allocated to them
    // 1 PRG ROM page = 16384 bytes (0x4000)
    // 1 CHR ROM page = 8192 bytes (0x2000)

    this.PRG_ROM = []
    for (let i = 0; i < toInt(this.firstLine[0x04]); i += 1) {
      this.PRG_ROM.push(this.RECIEVED_DATA.splice(0x00, 0x4000))
    }

    this.CHR_ROM = []
    for (let i = 0; i < toInt(this.firstLine[0x05]); i += 1) {
      this.CHR_ROM.push(this.RECIEVED_DATA.splice(0x00, 0x2000))
    }
  }

  /**
   * Check the first line for "NES" followed by
   * the magic number and return true if it is present
   * @return true if the cart is valid, false otherwise
   */
  isValid(): boolean {
    return this.firstLine.slice(0x00, 0x04).toString() === '4e,45,53,1a'
  }

  toString(): string {
    return this.RECIEVED_DATA.join(' ')
  }
}
