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

export default class {
    constructor() {
        // Direct link to the other NES hardware,
        // in order to avoid constantly jumping through hoops
        this.cpu = null
        this.apu = null

        // The CHR ROM of the game
        this.CHR_ROM = []
    }

    /**
     * Make a direct link between the PPU and another hardware
     *
     * @param {string} hardware The hardware to be linked to the PPU
     * @param {hardware} instance The instance of the hardware
     */
    link(hardware, instance) {
        switch(hardware) {
            case 'cpu':
                this.cpu = instance
            break
            case 'apu':
                this.apu = instance
            break
            default:
                console.error('[PPU] attempting to link unknown hardware: '+hardware)
            break
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
        this.CHR_ROM = []
    }


    start() {
        console.log(this.CHR_ROM)
    }
}
