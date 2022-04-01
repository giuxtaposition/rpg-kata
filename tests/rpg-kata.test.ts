import { Character } from '../src/Character'

describe('RPG Kata Tests', () => {
    describe('When characters are created ', () => {
        const character = new Character()

        test('Health starts at 1000', () => {
            expect(character.health).toBe(1000)
        })

        test('Level starts at 1', () => {
            expect(character.level).toBe(1)
        })

        test('starting Alive', () => {
            expect(character.isAlive()).toBe(true)
        })
    })

    describe('When characters deal damage to other characters', () => {
        const character = new Character()
        const targetCharacter = new Character()

        test('health of target decreases', () => {
            character.attack(targetCharacter, 100)
            expect(targetCharacter.health).toBe(900)
        })

        test('When damage received exceeds current Health, Health becomes 0 and the character dies', () => {
            character.attack(targetCharacter, 2000)
            expect(targetCharacter.health).toBe(0)
            expect(targetCharacter.isAlive()).toBe(false)
        })
    })

    describe('When characters heal another character', () => {
        const character = new Character()
        const targetCharacter = new Character()

        test('health of target increases', () => {
            character.attack(targetCharacter, 200)
            character.heal(targetCharacter, 100)
            expect(targetCharacter.health).toBe(900)
        })

        test('When healing exceeds max health, health becomes max health', () => {
            character.heal(targetCharacter, 2000)
            expect(targetCharacter.health).toBe(1000)
        })

        test('Dead characters cannot be healed', () => {
            character.attack(targetCharacter, 2000)
            character.heal(targetCharacter, 100)
            expect(targetCharacter.health).toBe(0)
            expect(targetCharacter.isAlive()).toBe(false)
        })
    })
})
