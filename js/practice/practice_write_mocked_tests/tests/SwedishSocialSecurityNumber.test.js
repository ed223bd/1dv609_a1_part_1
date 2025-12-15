
import { expect, jest, test } from '@jest/globals'

import { SwedishSocialSecurityNumber } from '../src/correct/SwedishSocialSecurityNumber';
// import { SwedishSocialSecurityNumber } from '../src/bugs/MyCustomBug';  
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoLenCheck'; //✅
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberNoLuhn'; //✅
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecurityNumberNoTrim'; //✅
// import { SwedishSocialSecurityNumber } from '../src/bugs/BuggySwedishSocialSecutityNumberWrongYear'; //✅


//NOTE THESE TESTS SHOULD NOT BE DEPENDENT ON SSNHelper BUT USE MOCKING
describe('SwedishSocialSecurityNumber Tests', () => {
  const correctSsn = '990131-3149'
  const correctSsnWithWhitespaces = ' 990131-3149 '
  const shortSsn = '90131-3149'
  const incorrectLuhn = '990131-3148'
  const incorrectMonth = '990031-3149'
  const incorrectDay = '990132-3148'

  // BuggySwedishSocialSecurityNumberNoLenCheck
  test('constructor should throw error for too short ssn', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(false),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    expect(() => { new SwedishSocialSecurityNumber(shortSsn, mockObject)}).toThrow('To short, must be 11 characters')
  });

  // Additional
  test('constructor should throw error for incorrect format', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(false),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    expect(() => new SwedishSocialSecurityNumber(shortSsn, mockObject)).toThrow('Incorrect format, must be: YYMMDD-XXXX')
  })

  // Additional
  test('constructor should throw error for incorrect month', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(false),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    expect(() => new SwedishSocialSecurityNumber(incorrectMonth, mockObject)).toThrow('Invalid month in SSN')
  })

  // Additional 
  test('constructor should throw error for incorrect day', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(false),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    expect(() => new SwedishSocialSecurityNumber(incorrectDay, mockObject)).toThrow('Invalid day in SSN')
  })

  // BuggySwedishSocialSecutityNumberNoLuhn
  test('constructor should throw error for incorrect luhn', () => {
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
  test('constructor should call isCorrectFormat with trimmed ssn', () => {
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
  // Testar också happy path, att ssn skapades som medlemsvariabel
  test('getYear should return digits 1 and 2 for a correct ssn', () => {
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

  // Additional (for BUG)
  test('getSerialNumber should return digits 3 and 4 for a correct ssn', () => {
    const mockObject = {
      isCorrectLength: jest.fn().mockReturnValue(true),
      isCorrectFormat: jest.fn().mockReturnValue(true),
      isValidMonth: jest.fn().mockReturnValue(true),
      isValidDay: jest.fn().mockReturnValue(true),
      luhnisCorrect: jest.fn().mockReturnValue(true)
    }

    const ssn = new SwedishSocialSecurityNumber(correctSsn, mockObject)
    expect(ssn.getSerialNumber()).toBe('3149')
  })
});
