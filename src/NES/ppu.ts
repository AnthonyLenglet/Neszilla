/*
*  "The PPU generates a composite video signal with 240 lines of pixels
*
*  It has its own address space, which typically contains 10 kilobytes of
*  memory: 8 kilobytes of ROM or RAM on the Game Pak (possibly more with
*  one of the common mappers) to store the shapes of background and sprite
*  tiles, plus 2 kilobytes of RAM in the console to store a map or two.
*  Two separate, smaller address spaces hold a palette, which controls
*  which colors are associated to various indices, and OAM
*  (Object Attribute Memory), which stores the position, orientation,
*  shape, and color of the sprites, or independent moving objects.
*  These are internal to the PPU itself, and while the palette is made of
*  static memory, OAM uses dynamic memory (which will slowly decay if the
*  PPU is not rendering data)"
*      - https://wiki.nesdev.com/w/index.php/PPU
*/

import { clog } from '../lib/clog'
const logger = new clog()
logger.setPrefix('PPU')

export class PPU {
  private links: Neszilla.links

  constructor() {
    // Direct link to the other NES hardware,
    // in order to avoid constantly jumping through hoops
    this.links = {
      cartSlot: null,
      cpu: null,
      apu: null,
    }
  }

  /**
   * Make a direct link between the PPU and another hardware
   *
   * @param {Object} new_links The object containing all the links
   * @param {string} new_links.hardware The hardware to be linked to the PPU
   * @param {hardware} new_links.instance The instance of the hardware
   */
  link(newLinks: Neszilla.links): void {
    for (const hardware in newLinks) {
      if (!this.links.hasOwnProperty(hardware)) {
        logger.log('Linking unknown hardware: ' + hardware)
      } else {
        logger.log('Linking hardware: ' + hardware)
      }
    }

    this.links = {
      ...this.links,
      ...newLinks,
    }
  }

  flush(): void {
    logger.log('Flushing...')
  }

  start(): void {
    let CHR_ROM: string[][] = []
    if (this.links.cartSlot) {
      const cart = this.links.cartSlot.getCart()
      if (cart) {
        CHR_ROM = cart.CHR_ROM
      }
    }
    logger.log(CHR_ROM)
  }
}
