import InvalidParamError from '../Error/InvalidParamError';

export default class Email {
    private email: string;

    constructor(email: string) {
        this.email = this.setEmail(email);
    }
    private setEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) throw new InvalidParamError('Email');
        return email;
    }

    getEmail(): string {
        return this.email;
    }
}
