

import { SSNHelper } from '../src/correct/SSNHelper'; //✅
// import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowDayUpTo30'; //✅
// import { SSNHelper } from '../src/bugs/BuggySSNHelperAllowMonth0'; //✅
// import { SSNHelper } from '../src/bugs/BuggySSNHelperIncorrectFormat'; //✅
// import { SSNHelper } from '../src/bugs/BuggySSNHelperMessyLuhn'; //✅
// import { SSNHelper } from '../src/bugs/BuggySSNHelperWrongLength'; //✅



describe('SSNHelper Tests', () => {
  const correctSsn = '990131-3149'
  const shortSsn = '90131-3149'
  const longSsn = '990131-31491'
  const correctDay = '31'
  const correctMonth = '03'
  const incorrectMonth = '00'

  const helper = new SSNHelper()

  // BuggySSNHelperAllowDayUpTo30
  test('isValidDay should return true if day is correct', () => {
    const isValidDay = helper.isValidDay(correctDay)

    expect(isValidDay).toBeTruthy()
  })

  // Additional, for branch coverage
  test('isValidMonth should return true if month is correct', () => {
    const isValidMonth = helper.isValidMonth(correctMonth)

    expect(isValidMonth).toBeTruthy()
  })

  // BuggySSNHelperAllowMonth0
  test('isValidMonth should return false if month is incorrect', () => {
    const isValidMonth = helper.isValidMonth(incorrectMonth)

    expect(isValidMonth).toBeFalsy()
  })

  // BuggySSNHelperIncorrectFormat
  test('isCorrectFormat should return false if format is incorrect', () => {
    const isCorrectFormat = helper.isCorrectFormat(shortSsn)

    expect(isCorrectFormat).toBeFalsy()
  })

  // BuggySSNHelperMessyLuhn
  test('luhnisCorrect should return true for a correct and formated SSN', () => {
    const luhnisCorrect = helper.luhnisCorrect(correctSsn)

    expect(luhnisCorrect).toBeTruthy()
  })

  // BuggySSNHelperWrongLength
  test('isCorrectLength should return false for a SSN longer than 11 characters', () => {
    const isCorrectLength = helper.isCorrectLength(longSsn)

    expect(isCorrectLength).toBeFalsy()
  })
})
