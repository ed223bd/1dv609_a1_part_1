
// Select one of the Password versions to test

// import { Password } from '../src/BugDoesNotHash' //✅
// import { Password } from '../src/BugDoesNotTrim' //✅
// import { Password } from '../src/BugisPasswordAlwaysSame' //✅
// import { Password } from '../src/BugMissingNumberCheck' //✅
// import { Password } from '../src/BugMissingPasswordCheck'// ✅
// import { Password } from '../src/BugNeverContainsNumbers' //✅
// import { Password } from '../src/BugToShortPassword' //✅
// import { Password } from '../src/BugVeryShort' //✅
// import { Password } from '../src/BugWrongHashingAlgorithm' //✅
// import { Password } from '../src/BugWrongMessage' //✅
import { Password } from '../src/Correct'

describe('BugToShortPassword, 11 characters', () => {
    const password11 = 'Hej12345678';

    test('should throw error when less than 12 characters', () => {
        // En funktion, men ANONYM. En ANONYM funktion
        // skulle returnera resultatet av funktionen, inte 
        // funktionen i sig.
        expect(() => new Password(password11)).toThrow(Error);
    });

})

describe('BugVeryShort, 6 characters', () => {
    const password = 'Hej123'

    test('should throw error when less than 6 characters', () => {
        expect(() => new Password(password)).toThrow(Error)
    })
})

describe('BugNeverContainsNumbers', () => {
    const password = 'hejsansvejsan12'

    test('should not throw error if password has numbers', () => {
        expect(() => new Password(password)).not.toThrow(Error)
    })
})

describe('BugMissingPasswordCheck', () => {
    const password = 'hej1'

    test('should throw error when password is less than 12 characters', () => {
        expect(() => new Password(password)).toThrow(Error)
    })
})

describe('BugMissingNumberCheck', () => {
    const password = 'hejsansvejsan'

    test('should throw error if there are no numbers', () => {
        expect(() => new Password(password)).toThrow(Error)
    })
})

describe('BugDoesNotTrim', () => {
    const password = ' Hej1234567 '

    test('should throw error when password with whitespaces', () => {
        expect(() => new Password(password)).toThrow(Error)
    })
})

describe('BugDoesNotHash', () => {
    const password = 'hej123456789'
    const passwordObject = new Password(password)
    const hash = passwordObject.getPasswordHash()

    test('should have a hash value of type number', () => {
        expect(hash).not.toBe(password)
    })
})

describe('BugWrongHashingAlgorithm', () => {
    const password1 = 'Hej123456789'
    const password2 = 'Hej987654321'

    const passwordObject1 = new Password(password1)
    const passwordObject2 = new Password(password2)

    const hash1 = passwordObject1.getPasswordHash()
    const hash2 = passwordObject2.getPasswordHash()

    test('should create different hashes for different passwords', () => {
        expect(hash1).not.toBe(hash2)
    })
})

describe('BugisPasswordAlwaysSame', () => {
    const password1 = 'Hej123456789'
    const password2 = 'Hej987654321'

    const passwordObject1 = new Password(password1)
    const passwordObject2 = new Password(password2)

    const same = passwordObject1.isPasswordSame(passwordObject2)

    test('should return false if passwords are different', () => {
        expect(same).toBeFalsy()
    })
})

describe('BugWrongMessage', () => {
    const password = 'Hej123'

    test('should throw "Too short password" if password is less than 12 characters', () => {
        expect(() => new Password(password)).toThrow('Too short password')
    })
})
