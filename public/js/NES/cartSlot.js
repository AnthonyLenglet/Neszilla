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


    // ----
    // Init
    // ----


    initCartReader() {
        this.cart_reader.addEventListener('load', () => {
            // interpret file as binary, convert to hexadecimal
            // and insert array in cart_data
            new Uint8Array(this.cart_reader.result).map(
                elem => { this.cart_data.push(elem.toString(16).padStart(2, '0')) }
            )

            // Dispatch the data from the rom into the CHR ROM,
            // the PRG ROM and the first "settings" line
            if(this.dispatchROM(this.cart_data) == 0)
                alert('This cartridge is not valid!')
        })
    }

    initSlot() {
        this.slot.addEventListener('change', () => {
            // check if a cartridge has been inserted,
            // if there's a cartridge, fetch the data from said cartridge
            // otherwise, flush any data that may be present
            this.slot.files.length ? this.getFile(this.slot) : this.cart_data = []
        })
    }


    // -------
    // Methods
    // -------

    getFile(cartridge) {
        this.cart_reader.readAsArrayBuffer(cartridge.files[0])
    }

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

        for(let i=0; i<first_line[0x04]; i++)
            this.PRG_ROM.push(new Array(rom.splice(0x00, 0x4000)))

        for(let i=0; i<first_line[0x05]; i++)
            this.CHR_ROM.push(new Array(rom.splice(0x00, 0x2000)))
    }
}
