export class Character {
    private MAX_HEALTH = 1000
    private _health: number
    private _level: number

    constructor() {
        this._health = this.MAX_HEALTH
        this._level = 1
    }

    public get health() {
        return this._health
    }

    public get level() {
        return this._level
    }

    public attack(target: Character, damage: number) {
        target.receivesDamage(damage)
    }

    public heal(target: Character, healing: number) {
        target.receivesHealing(healing)
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
}
