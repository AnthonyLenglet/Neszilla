import { toBinary, toInt } from '../utilities'

export class CartSlot {
  private cartReader: FileReader
  private cartData: string[]
  public slot: HTMLInputElement
  public CHR_ROM: string[][]
  public PRG_ROM: string[][]

  constructor() {
    this.cartReader = new FileReader()
    this.initCartReader()

    this.slot = <HTMLInputElement> document.querySelector('#cartridge')
    this.initSlot()

    this.cartData = []
    this.CHR_ROM = []
    this.PRG_ROM = []
  }

  initCartReader() {
    this.cartReader.addEventListener('load', () => {
      // interpret file as binary, convert to hexadecimal
      // and insert array in cartData
      new Uint8Array(<ArrayBuffer> this.cartReader.result).forEach(
        (elem) => { this.cartData.push(elem.toString(16).padStart(2, '0')) },
      )

      if (this.dispatchROM(this.cartData) === 0) {
        alert('This cartridge is not valid!')
      }
    })
  }

  initSlot() {
    this.slot.addEventListener('change', () => {
      const files: FileList = <FileList> this.slot.files
      files.length ? this.fetchData(files[0]) : this.cartData = []
    })
  }

  /**
   * Fetch the data from the inserted cartridge
   * @param  {Object} cartridge the inserted cartridge
   */
  fetchData(cartridge: Object): void {
    this.cartReader.readAsArrayBuffer(<Blob> cartridge)
  }

  /**
   * Dispatch the data from the rom into the CHR ROM, the PRG ROM and the first "settings" line
   * @param  {string[]} rom the hex dump of the rom
   * @return {int}
   */
  dispatchROM(rom: string[]): number | void {
    const firstLine = rom.splice(0x00, 0x10)

    // Check the rom for NES followed by the magic number
    // and return 0 if it is not present

    if (firstLine.slice(0x00, 0x04).toString() !== '4e,45,53,1a') {
      return 0
    }

    // dispatch the rest of the rom into the PRG and CHR ROM
    // based on the amount of pages allocated to them
    // 1 PRG ROM page = 16384 bytes (0x4000)
    // 1 CHR ROM page = 8192 bytes (0x2000)

    this.PRG_ROM = []
    for (let i = 0; i < toInt(firstLine[0x04]); i += 1) {
      this.PRG_ROM.push(rom.splice(0x00, 0x4000))
    }

    this.CHR_ROM = []
    for (let i = 0; i < toInt(firstLine[0x05]); i += 1) {
      this.CHR_ROM.push(rom.splice(0x00, 0x2000))
    }
  }
}
