export default class Email {
    private email: string;

    constructor(email: string) {
        this.email = this.setEmail(email);
    }
    setEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) throw new Error('Invalid email');
        return email;
    }

    getEmail(): string {
        return this.email;
    }
}
