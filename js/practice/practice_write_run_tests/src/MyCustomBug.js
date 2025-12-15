class Password {
  #passwordHash

  constructor(pw) {
    const trimmedPW = pw.trim() // Ta bort mellanslag i början och slutet

    if (this.#isTooShort(trimmedPW)) {
      throw new Error('Too short password')
    }

    if (!this.#containsNumber(trimmedPW)) {
      throw new Error('No number found')
    }

    this.#passwordHash = this.#simpleHash(trimmedPW)
  }

  #simpleHash(input) {
    let hash = 7
    for (let i = 0; i < input.length; i++) {
      hash = hash * 31 + input.charCodeAt(i)
    }
    return hash
  }

  #isTooShort(pw) {
    return pw.length < 12
  }

  #containsNumber(text) {
    return /\d/.test(text)
  }

  getPasswordHash() {
    return this.#passwordHash
  }

  isPasswordSame(other) {
    if (!(other instanceof Password)) {
      throw new Error('Invalid argument')
    }
    return false // BUG.
  }
}

export { Password }
