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

export class NoCardError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NoCardError'
  }
}

export class LinkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LinkError'
  }
}

export class PPUStartupError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PPUStartupError'
  }
}

export class CPUStartupError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CPUStartupError'
  }
}
