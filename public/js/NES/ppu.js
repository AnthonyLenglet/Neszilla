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

import clog from '../lib/clog.js'
let logger = new clog()
logger.setPrefix('PPU')

export default class {
    constructor() {
        // Direct link to the other NES hardware,
        // in order to avoid constantly jumping through hoops
        this.links = {
            cpu: null,
            apu: null
        }

        // The CHR ROM of the game
        this.CHR_ROM = []
    }

    /**
     * Make a direct link between the PPU and another hardware
     *
     * @param {Object} new_links The object containing all the links
     * @param {string} new_links.hardware The hardware to be linked to the PPU
     * @param {hardware} new_links.instance The instance of the hardware
     */
    link(new_links) {
        for(let hardware in new_links)
            if(!this.links.hasOwnProperty(hardware))
                logger.log('Linking unknown hardware: '+hardware)

        this.new_links = {
            ...this.links,
            new_links
        }
    }

    /**
     * Feed the CHR ROM into the PPU
     * @param  {array} CHR_ROM the CHR ROM to feed
     */
    feed(CHR_ROM) {
        this.CHR_ROM = CHR_ROM
    }

    flush() {
        logger.log('Flushing...')
        this.CHR_ROM = []
    }


    start() {
        logger.log(this.CHR_ROM)
    }
}
