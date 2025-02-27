/*
*  "The CPU core is based on the 6502 processor. It is made by Ricoh and
*  lacks the MOS6502's decimal mode. In the NTSC NES, the RP2A03 chip
*  contains the CPU and APU; in the PAL NES, the CPU and APU are contained
*  within the RP2A07 chip."
*      - https://wiki.nesdev.com/w/index.php/CPU
*/

import {
  NoCardError,
  LinkError,
  CPUStartupError,
} from '../lib/errors'

import {
  IntToUarr8Bit,
  IntToArr8Bit,
} from '../lib/converters'

import { readModule } from './readModule'

import { clog } from '../lib/clog'
import { type NES } from './nes'
const logger = new clog()
logger.setPrefix('CPU')

export class CPU {
  private readonly NES: NES

  private PC: number
  private P: number[]
  private A: number
  private X: number
  private Y: number
  private S: number

  private links: Neszilla.links
  private rom: number[]
  private reader: readModule

  constructor(NESInstance: NES) {
    this.NES = NESInstance
    // Registers
    this.PC = 0b00000000
    this.P = IntToUarr8Bit(0b00000000)
    this.A = 0b00000000
    this.X = 0b00000000
    this.Y = 0b00000000
    this.S = 0b00000000

    this.links = {}
    this.rom = Array<number>(0xffff).fill(0x00, 0x0000, 0xffff)
    this.reader = new readModule()
  }

  /**
   * extracts the PRG ROM from the cartridge
   * @return the cartridge's PRG ROM
   */
  async extractPRG(): Promise<Neszilla.PRG_ROM> {
    if (this.links.cartSlot) {
      const cart = this.links.cartSlot.getCart()
      if (cart) {
        return cart.PRG_ROM
      }
      throw new NoCardError('No cart found')
    }
    throw new LinkError('the cart slot object is not linked to the PPU')
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
      if (!Object.prototype.hasOwnProperty.call(this.links, hardware)) {
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
    this.PC = 0b00000000
    this.P = IntToUarr8Bit(0b00100010)
    this.A = 0b00000000
    this.X = 0b00000000
    this.Y = 0b00000000
    this.S = 0b00000000
  }

  /**
   * Start the CPU
   */
  async start(): Promise<void> {
    const PRG_ROM: Neszilla.PRG_ROM = await this.extractPRG()
      .catch((error: Error) => {
        logger.error(`${error.name}: ${error.message}`)
        throw new CPUStartupError('Failed to extract PRG ROM')
      })

    logger.log('Successfully extracted PRG ROM')

    this.reader.strap(PRG_ROM[0])

    while (true) {
      await this.read()
    }
  }

  /**
   * Read the content of the PRG ROM and execute the instructions
   */
  read(): Promise<void> {
    // Instructions: https://www.masswerk.at/6502/6502_instruction_set.html
    const NewInstruction = this.reader.readOne()
    console.log(NewInstruction)
    switch (NewInstruction) {
      case '00' :   // BRK
        this.P[5] = 1
        break
      case '01' :   // ORA Accumulator
        this.A |= parseInt(this.reader.readOne(), 16)
        this.P[0] = IntToArr8Bit(this.A)[0]
        if (this.A === 0) { this.P[6] = 1 }
        break
      case '05' :   // ORA Zero Page
        this.PC += 1
        this.A |= this.rom[this.PC]
        this.P[0] = IntToArr8Bit(this.A)[0]
        if (this.A === 0) { this.P[6] = 1 }
        break
      case '06' :
        break
      case '08' :
        break
    }

    return new Promise((resolve) => {
      setTimeout(() => { resolve() }, 1000)
    })
  }
}
