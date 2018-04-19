import CPU from './cpu.js'
import PPU from './ppu.js'
import CartSlot from './cartSlot.js'

export default class {
    constructor() {
        // Get the NES components

        this.cpu = new CPU()
        this.ppu = new PPU()
        this.cart = new CartSlot()

        console.info('core NES components loaded!')


        this.power_btn = document.querySelector('#powerbtn')
        this.power_is_on = false
        this.initPowerButton()
    }

    
    initPowerButton() {
        this.power_btn.addEventListener('click', () => {
            // boot up the system if the power is
            // turned on and a cartridge is found
            if(!this.power_is_on && this.lookForCartridge()) {
                this.power_is_on = true
                this.power_btn.innerHTML = 'Turn off'
                this.cart.slot.disabled = true

                this.boot()
            }
            // if the power is turned off OR if no cartridges
            // are found, shut down the system
            else {
                this.power_is_on = false
                this.power_btn.innerHTML = 'Turn on'
                this.cart.slot.disabled = false

                this.shutdown()
            }
        })
    }


    lookForCartridge() {
        if (this.cart.slot.files.length) {
            return true
        } else {
            alert('please insert a cartridge first')
        }
    }


    boot() {
        this.cpu.feed(this.cart.PRG_ROM)
        this.cpu.start()

        this.cpu.link('ppu', this.ppu)
        // this.cpu.link('apu', this.apu)

        this.ppu.feed(this.cart.CHR_ROM)
        this.ppu.start()
    }

    shutdown() {
        this.cpu.flush()
        this.ppu.flush()
        //this.display.clear()
    }
}
