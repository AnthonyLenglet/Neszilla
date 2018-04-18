/*
 *  "The CPU core is based on the 6502 processor. It is made by Ricoh and
 *  lacks the MOS6502's decimal mode. In the NTSC NES, the RP2A03 chip
 *  contains the CPU and APU; in the PAL NES, the CPU and APU are contained
 *  within the RP2A07 chip."
 *      - https://wiki.nesdev.com/w/index.php/CPU
 */

export default class {
    constructor() {
        this.data = []
    }

    feed(data) {
        this.data = data
    }

    flush() {
        this.data = []
    }


    start() {
        console.log(this.data)
    }
}
