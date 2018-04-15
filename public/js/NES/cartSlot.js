export default class {
    constructor() {
        this.cart_reader = new FileReader()
        this.initCartReader()

        this.slot = document.querySelector('#cartridge')
        this.initSlot()

        this.cart_data = []

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
        })
    }

    initSlot() {
        this.slot.addEventListener('change', () => {
            // check if a cartridge has been inserted,
            // if there's a cartridge, start fetching the data
            // otherwise, make sure that the data array is empty
            cartridge.files.length ? this.getFile(this.slot) : this.cart_data = []
        })
    }

    // Methods
    getFile(cartridge) {
        this.cart_reader.readAsArrayBuffer(cartridge.files[0])
    }
}
