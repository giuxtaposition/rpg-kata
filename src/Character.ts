import CannotAttackSelfError from './exceptions/CannotAttackSelfError'
import NotInRangeError from './exceptions/NotInRangeError'

export class Character {
    private MAX_HEALTH = 1000
    private _attackRange: number
    private _health: number
    private _level: number
    private _position: number

    constructor(characterClass: characterClass) {
        this._health = this.MAX_HEALTH
        this._level = 1
        this._position = 0

        characterClass === 'ranged'
            ? (this._attackRange = 20)
            : (this._attackRange = 2)
    }

    public get range() {
        return this._attackRange
    }

    public get health() {
        return this._health
    }

    public get position() {
        return this._position
    }

    public set position(position: number) {
        this._position = position
    }

    public get level() {
        return this._level
    }

    public set level(level: number) {
        this._level = level
    }

    public attack(target: Character, damage: number) {
        if (target === this) {
            throw new CannotAttackSelfError()
        }

        if (!this.inRange(target.position)) {
            throw new NotInRangeError()
        }

        const levelsDifference = this.level - target.level

        if (levelsDifference >= 5) {
            damage += damage * 0.5
        }

        if (levelsDifference <= -5) {
            damage -= damage * 0.5
        }

        target.receivesDamage(damage)
    }

    public heal(healing: number) {
        this.receivesHealing(healing)
    }

    public receivesDamage(damage: number) {
        this._health -= damage

        if (this._health < 0) {
            this._health = 0
        }
    }

    public receivesHealing(healing: number) {
        if (!this.isAlive()) return

        this._health += healing
        if (this._health > this.MAX_HEALTH) {
            this._health = this.MAX_HEALTH
        }
    }

    public isAlive() {
        return this.health > 0
    }

    private inRange(targetPosition: number) {
        return Math.abs(this._position - targetPosition) <= this._attackRange
    }
}

type characterClass = 'melee' | 'ranged'
