export default class CanOnlyHealSelfOrAllyError extends Error {
    constructor() {
        super('Can only heal self or ally')
    }
}
