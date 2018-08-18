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
    this.cpu = new CPU()
    this.ppu = new PPU()
    this.cartSlot = new CartSlot()

    logger.log('Core components loaded !')

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

    logger.log('Core components linked !')

    this.powerBtn = <Element> document.querySelector('#powerbtn')
    this.powerIsOn = false
    this.initPowerButton()
  }

  /**
   * @protected
   * Initializes the power button (INTERNAL USE ONLY)
   */
  initPowerButton() {
    this.powerBtn.addEventListener('click', () => {
      if (!this.powerIsOn) {
        if (this.cartSlot.getCart() !== null) {
          this.boot()
        } else {
          alert('Please insert a cartridge first')
        }
      } else {
        this.shutdown()
      }
    })
  }

  /**
   * Set the NES power state on or off
   * @param isOn NES power state
   */
  power(isOn: boolean): void {
    this.powerIsOn = isOn
    this.powerBtn.innerHTML = isOn ? 'Turn off' : 'Turn on'
    this.cartSlot.lock(isOn)
  }

  /**
   * Boot up the NES
   */
  boot(): void {
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

  /**
   * Shut down the NES
   */
  shutdown(): void {
    this.power(false)
    this.cpu.flush()
    this.ppu.flush()
    // this.display.clear()
  }
}
