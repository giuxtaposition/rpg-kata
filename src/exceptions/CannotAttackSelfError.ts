export default class CannotAttackSelfError extends Error {
    constructor() {
        super('Cannot attack self')
    }
}
