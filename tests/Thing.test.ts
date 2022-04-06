import { Character } from '../src/Character'
import { Thing } from '../src/Thing'

describe('Thing Test', () => {
    test('Has health', () => {
        const tree = new Thing(2000)
        expect(tree.health).toBe(2000)
    })

    test('Can be damaged', () => {
        const character = new Character('melee')
        const tree = new Thing(2000)
        character.attack(tree, 2000)
        expect(tree.isDestroyed()).toBe(true)
    })
})
