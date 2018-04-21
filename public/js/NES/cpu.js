/*
*  "The CPU core is based on the 6502 processor. It is made by Ricoh and
*  lacks the MOS6502's decimal mode. In the NTSC NES, the RP2A03 chip
*  contains the CPU and APU; in the PAL NES, the CPU and APU are contained
*  within the RP2A07 chip."
*      - https://wiki.nesdev.com/w/index.php/CPU
*/

import clog from '../lib/clog.js'
let logger = new clog()
logger.setPrefix('CPU')

export default class {
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
            ppu: null,
            apu: null
        }

        // The PRG ROM of the game
        this.PRG_ROM = []
    }

    /**
     * Make a direct link between the CPU and another hardware
     *
     * @param {Object} new_links The object containing all the links
     * @param {string} new_links.hardware The hardware to be linked to the CPU
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
     * Feed the PRG ROM into the CPU
     * @param  {string[]} PRG_ROM the PRG ROM to feed
     */
    feed(PRG_ROM) {
        this.PRG_ROM = PRG_ROM
    }

    /**
     * Flush the CPU data
     */
    flush() {
        logger.log('Flushing...')
        this.PC = null
        this.P = null
        this.A = null
        this.X = null
        this.Y = null
        this.S = null
        this.PRG_ROM = []
    }


    start() {
        logger.log(this.PRG_ROM)
    }
}
