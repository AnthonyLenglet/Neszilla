export class readModule {
  private strappedRom: Neszilla.ROM_PAGE
  private position: number

  constructor() {
    this.strappedRom = []
    this.position = 0x0000
  }

  /**
   * Strap the rom to the read module in order to read its content
   * @param rom The rom to read
   */
  strap(rom: Neszilla.ROM_PAGE): void {
    this.strappedRom = rom
  }

  /**
   * Returns the next desired amount of bytes in the strapped ROM
   * @param  amount Amount of bytes to read, only reads 1 if none is provided
   * @return        An array of bytes
   */
  readNext(amount: number = 1): string[] {
    const data: string[] = []

    for (let i = data.length; i < amount; i += 1) {
      data.push(this.strappedRom[this.position])
      this.position += 0x0001
    }

    return data
  }

  /**
   * Returns the next byte in the strapped ROM
   * @return The next byte in the ROM
   */
  readOne(): string {
    const byte = this.strappedRom[this.position]
    this.position += 0x0001
    return byte
  }
}
