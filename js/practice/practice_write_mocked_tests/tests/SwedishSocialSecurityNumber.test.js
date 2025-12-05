
import { jest, test } from '@jest/globals'

import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber'; 
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck'; //✅
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberNoLuhn'; //✅
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoTrim'; //❌
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberWrongYear'; //✅


//NOTE THESE TESTS SHOULD NOT BE DEPENDENT ON SSNHelper BUT USE MOCKING
describe('SwedishSocialSecurityNumber Tests', () => {
  const correctSsn = '990131-3149'
  const correctSsnWithWhitespaces = ' 990131-3149 '
  const shortSsn = '90131-3149'
  const incorrectLuhn = '990131-3148'

  // BuggySwedishSocialSecurityNumberNoLenCheck
  test('should throw error if ssn is too short', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(false),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    expect(() => { new SwedishSocialSecurityNumber(shortSsn, mockObject)}).toThrow('To short, must be 11 characters')
  });

  // BuggySwedishSocialSecutityNumberNoLuhn
  test('should throw error if luhn is incorrect', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(false)
    }

    expect(() => { new SwedishSocialSecurityNumber(incorrectLuhn, mockObject)}).toThrow('Invalid SSN according to Luhn\'s algorithm')
  })

  // BuggySwedishSocialSecurityNumberNoTrim
  test('should call isCorrectFormat with trimmed ssn', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    // Not used, but object needs to be created
    const ssn = new SwedishSocialSecurityNumber(correctSsnWithWhitespaces, mockObject)

    expect(mockObject.isCorrectFormat).toHaveBeenCalledWith(correctSsn)
  })


  // BuggySwedishSocialSecutityNumberWrongYear
  test('should throw error if ssn day is creates incorrect format', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }
    const ssn = new SwedishSocialSecurityNumber(correctSsn, mockObject)

    expect(ssn.getYear()).toBe('99')
  })
});