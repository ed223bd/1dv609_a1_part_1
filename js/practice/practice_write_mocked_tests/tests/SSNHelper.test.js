

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
  const correctDayString = '31'
  const incorrectMonthString = '00'

  const helper = new SSNHelper()

  // BuggySSNHelperAllowDayUpTo30
  test('should return true if day is 31', () => {
    const isValidDay = helper.isValidDay(correctDayString)

    expect(isValidDay).toBeTruthy()
  })

  // BuggySSNHelperAllowMonth0
  test('should return false if month is 0', () => {
    const isValidMonth = helper.isValidMonth(incorrectMonthString)

    expect(isValidMonth).toBeFalsy()
  })

  // BuggySSNHelperIncorrectFormat
  test('should return false if format is incorrect', () => {
    const isCorrectFormat = helper.isCorrectFormat(shortSsn)

    expect(isCorrectFormat).toBeFalsy()
  })

  // BuggySSNHelperMessyLuhn
  test('should return true for a correct and formated SSN', () => {
    const luhnisCorrect = helper.luhnisCorrect(correctSsn)

    expect(luhnisCorrect).toBeTruthy()
  })

  // BuggySSNHelperWrongLength
  test('should return false for a SSN longer than 11 characters', () => {
    const isCorrectLength = helper.isCorrectLength(longSsn)

    expect(isCorrectLength).toBeFalsy()
  })
})
