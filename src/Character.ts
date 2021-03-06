import { Entity } from './Entity'
import CannotAttackSelfOrAllyError from './exceptions/CannotAttackSelfOrAllyError'
import CanOnlyHealSelfOrAllyError from './exceptions/CanOnlyHealSelfOrAllyError'
import NotInRangeError from './exceptions/NotInRangeError'

export class Character extends Entity {
    private _attackRange: number
    private _level: number
    private _position: number
    private _factions: string[]

    constructor(characterClass: characterClass, maxHealth = 1000) {
        super(maxHealth)
        this._level = 1
        this._position = 0
        this._factions = []

        characterClass === 'ranged'
            ? (this._attackRange = 20)
            : (this._attackRange = 2)
    }

    public attack(target: Entity, damage: number) {
        if (target instanceof Character) {
            if (target === this || this.isAlly(target)) {
                throw new CannotAttackSelfOrAllyError()
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
        }

        target.receivesDamage(damage)
    }

    public heal(target: Character, healing: number) {
        if (target !== this && !this.isAlly(target)) {
            throw new CanOnlyHealSelfOrAllyError()
        }
        target.receivesHealing(healing)
    }

    public leaveFaction(faction: string) {
        this._factions = this._factions.filter(f => f !== faction)
    }
    public joinFaction(faction: string) {
        if (!this._factions.find(f => f === faction))
            this._factions.push(faction)
    }

    public isAlly(targetCharacter: Character): boolean {
        return this.factions.some(f => targetCharacter.factions.includes(f))
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

    public get range() {
        return this._attackRange
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

    public get factions() {
        return this._factions
    }

    private inRange(targetPosition: number) {
        return Math.abs(this._position - targetPosition) <= this._attackRange
    }
}

type characterClass = 'melee' | 'ranged'
