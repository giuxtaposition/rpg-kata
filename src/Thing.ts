import { Entity } from './Entity'

export class Thing extends Entity {
    constructor(health: number) {
        super(health)
    }

    public isDestroyed(): boolean {
        return this._health <= 0
    }
}
