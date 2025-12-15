
// Select one of the Password versions to test

import { Password } from '../src/Correct' //✅
// import { Password } from '../src/MyCustomBug' //✅
// import { Password } from '../src/BugVeryShort' //✅
// import { Password } from '../src/BugToShortPassword' //✅
// import { Password } from '../src/BugMissingPasswordCheck'// ✅
// import { Password } from '../src/BugWrongMessage' //✅
// import { Password } from '../src/BugNeverContainsNumbers' //✅
// import { Password } from '../src/BugMissingNumberCheck' //✅
// import { Password } from '../src/BugDoesNotTrim' //✅
// import { Password } from '../src/BugDoesNotHash' //✅
// import { Password } from '../src/BugWrongHashingAlgorithm' //✅
// import { Password } from '../src/BugisPasswordAlwaysSame' //✅


describe('Password class, test suite', () => {
  const shortPw = 'hej12345678';
  const veryShortPw = 'hej123'
  const correctPw = 'hej123456789'
  const correctBackwardsPw = 'hej987654321'
  
  const noNumbersPw = 'hejsansvejsan'
  const withWhitespacesPw = ' hej1234567 '

  // BugVeryShort
  test('constructor should throw error for very short password', () => {
    expect(() => new Password(veryShortPw)).toThrow(Error)
  })

  // BugToShortPassword & BugMissingPasswordCheck &BugWrongMessage
  test('constructor should throw error message "Too short password" for short password', () => {
    // Anonym funktion
    expect(() => new Password(shortPw)).toThrow('Too short password')
  })

  // BugNeverContainsNumbers
  test('constructor should not throw error for password with numbers', () => {
    expect(() => new Password(correctPw)).not.toThrow(Error)
  })

  // BugMissingNumberCheck
  test('constructor should throw error for password without numbers', () => {
    expect(() => new Password(noNumbersPw)).toThrow(Error)
  })

  //BugDoesNotTrim
  test('constructor should throw error for trimmed short password', () => {
    expect(() => new Password(withWhitespacesPw)).toThrow(Error)
  })

  // BugDoesNotHash
  test('getPasswordHash should not return the password for valid password', () => {
    const passwordObject = new Password(correctPw)
    const hash = passwordObject.getPasswordHash()

    expect(hash).not.toBe(correctPw)
  })
    
  // BugWrongHashingAlgorithm
  test('getPasswordHash should get different hashes for different passwords', () => {
    const passwordObject1 = new Password(correctPw)
    const passwordObject2 = new Password(correctBackwardsPw)

    const hash1 = passwordObject1.getPasswordHash()
    const hash2 = passwordObject2.getPasswordHash()

    expect(hash1).not.toBe(hash2)
  })

  // BugisPasswordAlwaysSame
  test('isPasswordSame should return false if passwords are different', () => {
    const passwordObject1 = new Password(correctPw)
    const passwordObject2 = new Password(correctBackwardsPw)

    const same = passwordObject1.isPasswordSame(passwordObject2)

    expect(same).toBeFalsy()
  })

  // Additional, for error branch coverage
  test('isPasswordSame should throw error for non-password argument', () => {
    const passwordObject = new Password(correctPw)
    const notAPassword = 1234567891011

    expect(() => passwordObject.isPasswordSame(notAPassword)).toThrow('Invalid argument')
  })
})
