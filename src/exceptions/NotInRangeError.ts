export default class NotInRangeError extends Error {
    constructor() {
        super('Target is not in range')
    }
}
