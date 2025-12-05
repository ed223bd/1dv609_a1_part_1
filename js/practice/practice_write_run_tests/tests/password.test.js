
// Select one of the Password versions to test

// import { Password } from '../src/Correct' //✅
// import { Password } from '../src/BugDoesNotHash' //✅
import { Password } from '../src/BugDoesNotTrim' //✅
// import { Password } from '../src/BugisPasswordAlwaysSame' //✅
// import { Password } from '../src/BugMissingNumberCheck' //✅
// import { Password } from '../src/BugMissingPasswordCheck'// ✅
// import { Password } from '../src/BugNeverContainsNumbers' //✅
// import { Password } from '../src/BugToShortPassword' //✅
// import { Password } from '../src/BugVeryShort' //✅
// import { Password } from '../src/BugWrongHashingAlgorithm' //✅
// import { Password } from '../src/BugWrongMessage' //✅

describe('Password class, test suite', () => {
  const shortPw = 'hej12345678';
  const veryShortPw = 'hej123'
  const correctPw = 'hej123456789'
  const correctBackwardsPw = 'hej987654321'
  
  const noNumbersPw = 'hejsansvejsan'
  const withWhitespacesPw = ' hej1234567 '

  // BugToShortPassword
  test('should throw error when less than 12 characters', () => {
    // En funktion, men ANONYM. En ANONYM funktion
    // skulle returnera resultatet av funktionen, inte 
    // funktionen i sig.
    expect(() => new Password(shortPw)).toThrow(Error);
  });

  // BugVeryShort
  test('should throw error when less than 6 characters', () => {
    expect(() => new Password(veryShortPw)).toThrow(Error)
  })

  // BugNeverContainsNumbers
  test('should not throw error if password has numbers', () => {
    expect(() => new Password(correctPw)).not.toThrow(Error)
  })

  // BugMissingPasswordCheck
  test('should throw error when password is less than 12 characters', () => {
    expect(() => new Password(shortPw)).toThrow(Error)
  })

  // BugMissingNumberCheck
  test('should throw error if there are no numbers', () => {
    expect(() => new Password(noNumbersPw)).toThrow(Error)
  })

  //BugDoesNotTrim
  test('should throw error when password with whitespaces', () => {
    expect(() => new Password(withWhitespacesPw)).toThrow(Error)
  })
    
  // BugDoesNotHash
  test('should have a hash value of type number', () => {
    const passwordObject = new Password(correctPw)
    const hash = passwordObject.getPasswordHash()

    expect(hash).not.toBe(correctPw)
  })
    
  // BugWrongHashingAlgorithm
  test('should create different hashes for different passwords', () => {
    const passwordObject1 = new Password(correctPw)
    const passwordObject2 = new Password(correctBackwardsPw)

    const hash1 = passwordObject1.getPasswordHash()
    const hash2 = passwordObject2.getPasswordHash()

    expect(hash1).not.toBe(hash2)
  })

  // BugisPasswordAlwaysSame
  test('should return false if passwords are different', () => {
    const passwordObject1 = new Password(correctPw)
    const passwordObject2 = new Password(correctBackwardsPw)

    const same = passwordObject1.isPasswordSame(passwordObject2)

    expect(same).toBeFalsy()
  })

  // BugWrongMessage
  test('should throw "Too short password" if password is less than 12 characters', () => {
      expect(() => new Password(veryShortPw)).toThrow('Too short password')
  })
})
