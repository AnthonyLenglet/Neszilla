import { getRange, toBinary } from '../utilities.js'

export default class {
    constructor() {
        this.cart_reader = new FileReader()
        this.initCartReader()

        this.slot = document.querySelector('#cartridge')
        this.initSlot()

        this.cart_data = []
        this.CHR_ROM = []
        this.PRG_ROM = []

        console.log('Cart slot launched!')
    }


    // Init
    initCartReader() {
        this.cart_reader.addEventListener('load', () => {
            // interpret file as binary, convert to hexadecimal
            // and insert array in cart_data
            new Uint8Array(this.cart_reader.result).map(
                elem => { this.cart_data.push(elem.toString(16).padStart(2, '0')) }
            )

            this.checkROM(this.cart_data)
        })
    }

    initSlot() {
        this.slot.addEventListener('change', () => {
            // check if a cartridge has been inserted,
            // if there's a cartridge, start fetching the data
            // otherwise, flush any data that is present
            cartridge.files.length ? this.getFile(this.slot) : this.flush()
        })
    }

    // Methods
    getFile(cartridge) {
        this.cart_reader.readAsArrayBuffer(cartridge.files[0])
    }

    flush() {
        this.cart_data = []
        this.CHR_ROM = []
        this.PRG_ROM = []
    }

    checkROM(rom) {
        let first_line = getRange(rom, 0x00, 0x0F)

        // Check the rom for NES followed by the magic number
        // and return 0 if it is not present
        if (first_line.slice(0x00, 0x04).toString() !== "4e,45,53,1a")
            return 0

        // set the PRG ROM based on the amount of pages in the rom
        this.CHR_ROM = getRange(rom, 0x10, 0x4000*parseInt(first_line[0x04], 16))

        // set the CHR ROM based on the amount of pages in the rom
        this.PRG_ROM = getRange(rom, 0x10, 0x2000*parseInt(first_line[0x05], 16))
    }
}
