import crypto from 'crypto';
import Email from '../value objects/Email';
export default class User {
    private id: string;
    private name: string;
    private email: Email;

    private constructor(id: string, name: string, email: Email) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
    static create(name: string, email: string) {
        const id = crypto.randomUUID();
        return new User(id, name, new Email(email));
    }
    static restore(id: string, name: string, email: string) {
        return new User(id, name, new Email(email));
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
