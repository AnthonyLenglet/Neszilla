let isGlobalDevMode: boolean = true

export function clogDevMode(isGlobalDev: boolean): void {
  isGlobalDevMode = isGlobalDev
}

export class clog {
  private isdevmode: boolean
  private prefix: string

  constructor() {
    this.isdevmode = false
    this.prefix = ''
  }

  /**
   * Set the prefix of the messages
   * @param {string} newPrefix of the messages
   */
  setPrefix(newPrefix: string): void {
    this.prefix = `[${newPrefix}]`
  }

  /**
   * Set Dev mode for this log to true or false
   * @param {Boolean} isDev [description]
   */
  setDevMode(isDev: boolean): void {
    this.isdevmode = isDev
  }

  /**
   * Log a message to the console
   * @param {?} message the message to be outputted to the console
   */
  log(message: any): void {
    if (isGlobalDevMode || this.isdevmode) {
      this.prefix ? console.log(this.prefix, message) : console.log(message)
    }
  }
}
