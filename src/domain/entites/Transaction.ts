import crypto from 'crypto';
import CardNumber from '../value objects/CardNumber';
import Amount from '../value objects/Value';
import ValidateDate from '../value objects/ValidateDate';
import CVV from '../value objects/CVV';

export default class Transaction {
    private id_transaction: string;
    private id_client: string;
    private description: string;
    private value: Amount;
    private method_payment: 'debit_card' | 'credit_card';
    private card_number: CardNumber;
    private name_owner: string;
    private validate_date: ValidateDate;
    private cvv: CVV;

    private constructor(id_transaction: string, id_client: string, description: string, value: Amount, method_payment: 'debit_card' | 'credit_card', card_number: CardNumber, name_owner: string, validate_date: ValidateDate, cvv: CVV) {
        this.id_transaction = id_transaction;
        this.id_client = id_client;
        this.description = description;
        this.value = value;
        this.method_payment = method_payment;
        this.name_owner = name_owner;
        this.card_number = card_number;
        this.validate_date = validate_date;
        this.cvv = cvv;
    }

    static create(id_client: string, description: string, value: number, method_payment: 'debit_card' | 'credit_card', card_number: string, name_owner: string, validate_date: string, cvv: string) {
        const id = crypto.randomUUID();
        return new Transaction(id, id_client, description, new Amount(value), method_payment, new CardNumber(card_number), name_owner, new ValidateDate(validate_date), new CVV(cvv));
    }
    static restore(id_client: string, description: string, value: number, method_payment: 'debit_card' | 'credit_card', card_number: string, name_owner: string, validate_date: string, cvv: string) {
        return new Transaction(id_client, id_client, description, new Amount(value), method_payment, new CardNumber(card_number), name_owner, new ValidateDate(validate_date), new CVV(cvv));
    }
    getId(): string {
        return this.id_transaction;
    }

    getClientId(): string {
        return this.id_client;
    }

    getDescription(): string {
        return this.description;
    }
    getValue(): number {
        return this.value.getAmount();
    }
    getMethodPayment(): 'debit_card' | 'credit_card' {
        return this.method_payment;
    }

    getCardNumber(): string {
        return this.card_number.getCardNumber();
    }

    getNameOwner(): string {
        return this.name_owner;
    }

    getValidateDate(): string {
        return this.validate_date.getValidateDate();
    }

    getCvv(): string {
        return this.cvv.getCVV();
    }
}
