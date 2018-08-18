/*
*  "The CPU core is based on the 6502 processor. It is made by Ricoh and
*  lacks the MOS6502's decimal mode. In the NTSC NES, the RP2A03 chip
*  contains the CPU and APU; in the PAL NES, the CPU and APU are contained
*  within the RP2A07 chip."
*      - https://wiki.nesdev.com/w/index.php/CPU
*/

import { clog } from '../lib/clog'
const logger = new clog()
logger.setPrefix('CPU')

export class CPU {
  private PC: any
  private P: any
  private A: any
  private X: any
  private Y: any
  private S: any

  private links: Neszilla.links

  constructor() {
    // Registers
    this.PC = null
    this.P = null
    this.A = null
    this.X = null
    this.Y = null
    this.S = null

    // Direct link to the other NES hardware,
    // in order to avoid constantly jumping through hoops
    this.links = {
      cartSlot: null,
      ppu: null,
      apu: null,
    }
  }

  /**
   * Make a direct link between the CPU and another hardware
   *
   * @param {Object} newLinks The object containing all the links
   * @param {string} newLinks.hardware The hardware to be linked to the CPU
   * @param {hardware} newLinks.instance The instance of the hardware
   */
  link(newLinks: Neszilla.links): void {
    for (const hardware in newLinks) {
      if (!this.links.hasOwnProperty(hardware)) {
        logger.log(`Linking unknown hardware: ${hardware}`)
      } else {
        logger.log('Linking hardware: ' + hardware)
      }
    }

    this.links = {
      ...this.links,
      ...newLinks,
    }
  }

  /**
   * Flush the CPU data
   */
  flush(): void {
    logger.log('Flushing...')
    this.PC = null
    this.P = null
    this.A = null
    this.X = null
    this.Y = null
    this.S = null
  }

  start(): void {
    let PRG_ROM: string[][] = []
    if (this.links.cartSlot) {
      const cart = this.links.cartSlot.getCart()
      if (cart) {
        PRG_ROM = cart.PRG_ROM
      }
    }
    logger.log(PRG_ROM)
  }
}
