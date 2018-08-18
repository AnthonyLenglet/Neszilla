declare namespace Neszilla {
  interface CPU {
    PC: any
    P: any
    A: any
    X: any
    Y: any
    S: any
    links: Neszilla.links
    PRG_ROM: string[][]
  }

  interface PPU {
    links: Neszilla.links
    CHR_ROM: string[][]
  }

  // interface APU {
  //
  // }

  interface CartSlot {
    cartReader: FileReader
    cartData: string[]
    slot: HTMLInputElement
  }

  interface Cart {
    PRG_ROM: string[][]
    CHR_ROM: string[][]
  }

  interface links {
    cpu?: any // Neszilla.CPU
    ppu?: any // Neszilla.PPU
    apu?: any // Neszilla.APU
  }
}
