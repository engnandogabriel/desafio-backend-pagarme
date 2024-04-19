export default class Email {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }
    setEmail(email: string) {
        if (!email.match(/.+@.+.com/)) throw new Error('Invalid email');
        return email;
    }

    getEmail(): string {
        return this.email;
    }
}
