import { clog, clogDevMode } from '../lib/clog'
clogDevMode(true)
const logger = new clog()
logger.setPrefix('NES')

import { CPU } from './cpu'
import { PPU } from './ppu'
import { CartSlot } from './cartSlot'

export class NES {
  private cpu: CPU
  private ppu: PPU
  private cart: CartSlot
  private powerBtn: Element
  private powerIsOn: boolean

  constructor() {
    // Get the NES components
    this.cpu = new CPU()
    this.ppu = new PPU()
    this.cart = new CartSlot()

    logger.log('core components loaded!')

    this.powerBtn = <Element> document.querySelector('#powerbtn')
    this.powerIsOn = false
    this.initPowerButton()
  }

  initPowerButton() {
    this.powerBtn.addEventListener('click', () => {
      // boot up the system if the power is
      // turned on and a cartridge is found
      if (!this.powerIsOn && this.lookForCartridge()) {
        this.powerIsOn = true
        this.powerBtn.innerHTML = 'Turn off'
        this.cart.slot.disabled = true

        this.boot()
      } else {
        // if the power is turned off OR if no cartridges
        // are found, shut down the system
        this.powerIsOn = false
        this.powerBtn.innerHTML = 'Turn on'
        this.cart.slot.disabled = false

        this.shutdown()
      }
    })
  }

  lookForCartridge(): boolean {
    let isPresent: boolean

    if (!this.cart.slot.files) {
      alert('Please insert a cartridge first')
      isPresent = false
    } else {
      isPresent = true
    }

    return isPresent
  }

  boot() {
    this.cpu.link({
      ppu: this.ppu,
      // apu: this.apu
    })
    this.cpu.feed(this.cart.PRG_ROM)
    this.cpu.start()

    this.ppu.link({
      cpu: this.cpu,
      // apu: this.apu
    })
    this.ppu.feed(this.cart.CHR_ROM)
    this.ppu.start()
  }

  shutdown() {
    this.cpu.flush()
    this.ppu.flush()
    // this.display.clear()
  }
}
