/*
 *  "The CPU core is based on the 6502 processor. It is made by Ricoh and
 *  lacks the MOS6502's decimal mode. In the NTSC NES, the RP2A03 chip
 *  contains the CPU and APU; in the PAL NES, the CPU and APU are contained
 *  within the RP2A07 chip."
 *      - https://wiki.nesdev.com/w/index.php/CPU
 */

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
        this.ppu = null
        this.apu = null

        // The PRG ROM of the game
        this.PRG_ROM = []
    }

    /**
     * Make a direct link between the CPU and another hardware
     *
     * @param {string} hardware The hardware to be linked to the CPU
     * @param {hardware} instance The instance of the hardware
     */
    link(hardware, instance) {
        switch(hardware) {
            case 'ppu':
                this.ppu = instance
            break
            case 'apu':
                this.apu = instance
            break
            default:
                console.error('[CPU] attempting to link unknown hardware: '+hardware)
            break
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
        this.PC = null
        this.P = null
        this.A = null
        this.X = null
        this.Y = null
        this.S = null
        this.PRG_ROM = []
    }


    start() {
        console.log(this.PRG_ROM)
    }
}
