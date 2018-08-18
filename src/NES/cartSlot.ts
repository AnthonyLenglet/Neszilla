import { Cart } from './cart'

export class CartSlot implements Neszilla.CartSlot {
  private cartReader: FileReader
  private cart: Cart | null
  private slot: HTMLInputElement

  constructor() {
    this.cartReader = new FileReader()
    this.initCartReader()

    this.slot = <HTMLInputElement>document.querySelector('#cartridge')
    this.initSlot()

    this.cart = null
  }

  /**
   * @protected
   * Initializes the cart reader (INTERNAL USE ONLY)
   */
  initCartReader(): void {
    this.cartReader.addEventListener('load', () => {
      const transcribedData: string[] = []
      // interpret file as binary, convert to hexadecimal
      // and insert array in cartData
      new Uint8Array(<ArrayBuffer>this.cartReader.result).forEach(
        (byte: number) => {
          transcribedData.push(byte.toString(16).padStart(2, '0'))
        },
      )

      this.cart = new Cart(transcribedData)
    })
  }

  /**
   * @protected
   * Initializes the cart slot (INTERNAL USE ONLY)
   */
  initSlot(): void {
    this.slot.addEventListener('change', () => {
      if (this.slot.files) {
        this.fetchData(this.slot.files[0])
      } else {
        this.cart = null
      }
    })
  }

  /**
   * Fetch the data from the inserted cartridge
   * @param  {Object} cartridge the inserted cartridge
   */
  fetchData(cartridge: Object): void {
    this.cartReader.readAsArrayBuffer(<Blob>cartridge)
  }

  /**
   * Lock the slot, preventing the user from removing the cartridge
   * @param isLocked state of the slot
   */
  lock(isLocked: boolean): void {
    this.slot.disabled = isLocked
  }

  /**
   * Returns the cart
   * @return the cartridge or null if no cartridge is inserted
   */
  getCart(): Cart | null {
    return this.cart
  }
}
