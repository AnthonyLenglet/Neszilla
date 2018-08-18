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
  private cartSlot: CartSlot
  private powerBtn: Element
  private powerIsOn: boolean

  constructor() {
    // Get the NES components
    this.cpu = new CPU()
    this.ppu = new PPU()
    this.cartSlot = new CartSlot()

    logger.log('core components loaded !')

    // Link the NES components
    this.cpu.link({
      cartSlot: this.cartSlot,
      ppu: this.ppu,
      // apu: this.apu
    })
    this.ppu.link({
      cartSlot: this.cartSlot,
      cpu: this.cpu,
      // apu: this.apu
    })

    logger.log('core components linked !')

    this.powerBtn = <Element> document.querySelector('#powerbtn')
    this.powerIsOn = false
    this.initPowerButton()
  }

  initPowerButton() {
    this.powerBtn.addEventListener('click', () => {
      if (!this.powerIsOn) {
        if (this.lookForCartridge()) {
          this.boot()
        } else {
          alert('Please insert a cartridge first')
        }
      } else {
        this.shutdown()
      }
    })
  }

  lookForCartridge(): boolean {
    return this.cartSlot.getCart() !== null
  }

  power(isOn: boolean): void {
    this.powerIsOn = isOn
    this.powerBtn.innerHTML = isOn ? 'Turn off' : 'Turn on'
    this.cartSlot.lock(isOn)
  }

  boot() {
    this.power(true)
    this.cpu.start()
      .catch((error: Error) => {
        console.error(`${error.name}: ${error.message}`)
      })
    this.ppu.start()
      .catch((error: Error) => {
        console.error(`${error.name}: ${error.message}`)
      })
  }

  shutdown() {
    this.power(false)
    this.cpu.flush()
    this.ppu.flush()
    // this.display.clear()
  }
}
