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

    constructor(id_client: string, description: string, value: number, method_payment: 'debit_card' | 'credit_card', card_number: string, name_owner: string, validate_date: string, cvv: string) {
        this.id_transaction = crypto.randomUUID();
        this.id_client = id_client;
        this.description = description;
        this.value = new Amount(value);
        this.method_payment = method_payment;
        this.name_owner = name_owner;
        this.card_number = new CardNumber(card_number);
        this.validate_date = new ValidateDate(validate_date);
        this.cvv = new CVV(cvv);
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
