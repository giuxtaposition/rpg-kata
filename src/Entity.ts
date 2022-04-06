export class Entity {
    protected MAX_HEALTH: number
    protected _health: number

    constructor(maxHealth: number) {
        this.MAX_HEALTH = maxHealth
        this._health = this.MAX_HEALTH
    }

    public receivesDamage(damage: number) {
        this._health -= damage

        if (this._health < 0) {
            this._health = 0
        }
    }

    public get health(): number {
        return this._health
    }
}
