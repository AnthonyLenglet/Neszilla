import { toBinary } from '../utilities.js'

export default class {
    constructor() {
        this.cart_reader = new FileReader()
        this.initCartReader()

        this.slot = document.querySelector('#cartridge')
        this.initSlot()

        this.cart_data = []
        this.CHR_ROM = []
        this.PRG_ROM = []
    }


    initCartReader() {
        this.cart_reader.addEventListener('load', () => {
            // interpret file as binary, convert to hexadecimal
            // and insert array in cart_data
            new Uint8Array(this.cart_reader.result).map(
                elem => { this.cart_data.push(elem.toString(16).padStart(2, '0')) }
            )

            if(this.dispatchROM(this.cart_data) == 0)
                alert('This cartridge is not valid!')
        })
    }

    initSlot() {
        this.slot.addEventListener('change', () => {
            this.slot.files.length ? this.fetchData(this.slot.files[0]) : this.cart_data = []
        })
    }

    /**
     * Fetch the data from the inserted cartridge
     * @param  {Object} cartridge the inserted cartridge
     */
    fetchData(cartridge) {
        this.cart_reader.readAsArrayBuffer(cartridge)
    }

    /**
     * Dispatch the data from the rom into the CHR ROM, the PRG ROM and the first "settings" line
     * @param  {string[]} rom the hex dump of the rom
     * @return {int}
     */
    dispatchROM(rom) {
        let first_line = rom.splice(0x00, 0x10)

        // Check the rom for NES followed by the magic number
        // and return 0 if it is not present

        if (first_line.slice(0x00, 0x04).toString() !== "4e,45,53,1a")
            return 0

        // dispatch the rest of the rom into the PRG and CHR ROM
        // based on the amount of pages allocated to them
        // 1 PRG ROM page = 16384 bytes (0x4000)
        // 1 CHR ROM page = 8192 bytes (0x2000)

        this.PRG_ROM= []
        for(let i=0; i<first_line[0x04]; i++)
            this.PRG_ROM.push(new Array(rom.splice(0x00, 0x4000)))

        this.CHR_ROM= []
        for(let i=0; i<first_line[0x05]; i++)
            this.CHR_ROM.push(new Array(rom.splice(0x00, 0x2000)))
    }
}
