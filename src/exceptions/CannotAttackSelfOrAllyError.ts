export default class CannotAttackSelfOrAllyError extends Error {
    constructor() {
        super('Cannot attack self or ally')
    }
}
