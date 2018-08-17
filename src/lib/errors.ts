export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class InstructionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InstructionError'
  }
}
