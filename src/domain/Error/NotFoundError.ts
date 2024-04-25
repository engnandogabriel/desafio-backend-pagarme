export default class NotFoundError extends Error {
    constructor(message?: string) {
        super('NotFound');
        this.name = 'NotFoundError';
        this.message = message || 'Not found';
    }
}
