import { Character } from '../src/Character'
import CannotAttackSelfError from '../src/exceptions/CannotAttackSelfError'

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
        let character: Character
        let targetCharacter: Character

        beforeEach(() => {
            character = new Character()
            targetCharacter = new Character()
        })

        test('health of target decreases', () => {
            character.attack(targetCharacter, 100)
            expect(targetCharacter.health).toBe(900)
        })

        test('When damage received exceeds current Health, Health becomes 0 and the character dies', () => {
            character.attack(targetCharacter, 2000)
            expect(targetCharacter.health).toBe(0)
            expect(targetCharacter.isAlive()).toBe(false)
        })

        test('A Character cannot Deal Damage to itself.', () => {
            expect(() => {
                character.attack(character, 100)
            }).toThrow(CannotAttackSelfError)
        })

        test('If the target is 5 or more Levels above the attacker, Damage is reduced by 50%', () => {
            character.level = 5
            targetCharacter.level = 10

            character.attack(targetCharacter, 100)
            expect(targetCharacter.health).toBe(950)
        })

        test('If the target is 5 or more levels below the attacker, Damage is increased by 50%', () => {
            character.level = 10
            targetCharacter.level = 5

            character.attack(targetCharacter, 100)
            expect(targetCharacter.health).toBe(850)
        })
    })

    describe('When character heals themselves', () => {
        const character = new Character()

        test('health increases', () => {
            character.receivesDamage(200)
            character.heal(100)
            expect(character.health).toBe(900)
        })

        test('When healing exceeds max health, health becomes max health', () => {
            character.heal(2000)
            expect(character.health).toBe(1000)
        })

        test('Dead characters cannot be healed', () => {
            character.receivesDamage(2000)
            character.heal(100)
            expect(character.health).toBe(0)
            expect(character.isAlive()).toBe(false)
        })
    })
})
