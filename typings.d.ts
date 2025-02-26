declare namespace Neszilla {
  type CHR_ROM = string[][]
  type PRG_ROM = string[][]
  type ROM_PAGE = string[]

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
    cartSlot?: Neszilla.CartSlot
    cpu?: unknown // Neszilla.CPU
    ppu?: unknown // Neszilla.PPU
    apu?: unknown // Neszilla.APU
  }
}
