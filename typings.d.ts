declare namespace Neszilla {
  // interface CPU {
  //
  // }

  // interface PPU {
  //
  // }

  // interface APU {
  //
  // }

  interface CartSlot {
    getCart: () => Neszilla.Cart | null
  }

  interface Cart {
    PRG_ROM: string[][]
    CHR_ROM: string[][]
  }

  interface links {
    cartSlot?: Neszilla.CartSlot | null
    cpu?: any // Neszilla.CPU | null
    ppu?: any // Neszilla.PPU | null
    apu?: any // Neszilla.APU | null
  }
}
