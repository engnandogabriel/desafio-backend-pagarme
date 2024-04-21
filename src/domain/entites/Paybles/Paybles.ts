export default abstract class Payble {
    protected payble_id: string;
    protected transaction_id: string;
    protected client_id: string;
    protected value: number;
    protected status: string;
    protected type: string;
    protected paymentDate: Date = new Date();

    constructor(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string) {
        this.payble_id = payble_id;
        this.transaction_id = transaction_id;
        this.client_id = client_id;
        this.value = value;
        this.status = status;
        this.type = type;
    }
    protected abstract setPaymentDate(): void;
    protected abstract feeCalculator(): void;

    getPaybleId(): string {
        return this.payble_id;
    }

    getTransactionId(): string {
        return this.transaction_id;
    }

    getClientId(): string {
        return this.client_id;
    }

    getValue(): number {
        return this.value;
    }

    getStatus(): string {
        return this.status;
    }

    getType(): string {
        return this.type;
    }
    getPaymentDate(): Date {
        return this.paymentDate;
    }
}
