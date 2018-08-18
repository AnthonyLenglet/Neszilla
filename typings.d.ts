declare namespace Neszilla {
  type CHR_ROM = string[][]
  type PRG_ROM = string[][]

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
    PRG_ROM: Neszilla.PRG_ROM
    CHR_ROM: Neszilla.CHR_ROM
  }

  interface links {
    cartSlot?: Neszilla.CartSlot | null
    cpu?: any // Neszilla.CPU | null
    ppu?: any // Neszilla.PPU | null
    apu?: any // Neszilla.APU | null
  }
}
