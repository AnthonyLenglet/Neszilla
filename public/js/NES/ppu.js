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
        this.data = []
        console.log('PPU launched!')
    }

    feed(data) {
        this.data = data
    }


    start() {
        console.log(this.data)
    }
}
