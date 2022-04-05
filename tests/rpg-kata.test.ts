import { Character } from '../src/Character'
import CannotAttackSelfError from '../src/exceptions/CannotAttackSelfError'
import NotInRangeError from '../src/exceptions/NotInRangeError'

describe('RPG Kata Tests', () => {
    describe('When characters are created ', () => {
        const character = new Character('melee')

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
            character = new Character('melee')
            targetCharacter = new Character('ranged')
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

        describe('Characters have an attack Max Range', () => {
            test('Melee fighters have a range of 2 meters', () => {
                const meleeCharacter = new Character('melee')
                expect(meleeCharacter.range).toBe(2)
            })

            test('Ranged fighters have a range of 20 meters', () => {
                const rangedCharacter = new Character('ranged')
                expect(rangedCharacter.range).toBe(20)
            })

            test('Characters must be in range to deal damage to a target', () => {
                targetCharacter.position = 20
                expect(() => {
                    character.attack(targetCharacter, 100)
                }).toThrow(NotInRangeError)
            })
        })
    })

    describe('When character heals themselves', () => {
        const character = new Character('ranged')

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
