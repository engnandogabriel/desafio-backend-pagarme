import crypto from 'crypto';
export default class User {
    private id: string;
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.id = crypto.randomUUID();
        this.email = email;
        this.name = name;
    }
    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getEmail(): string {
        return this.email;
    }
}
