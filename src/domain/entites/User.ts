import crypto from 'crypto';
import Email from '../value objects/Email';
export default class User {
    private id: string;
    private name: string;
    private email: Email;

    constructor(name: string, email: string) {
        this.id = crypto.randomUUID();
        this.email = new Email(email);
        this.name = name;
    }
    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getEmail(): string {
        return this.email.getEmail();
    }
}
