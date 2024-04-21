import crypto from 'crypto';
import Payble from './Paybles';

export default class DebitPaybles extends Payble {
    private fee = 0.03;
    private constructor(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string) {
        super(payble_id, transaction_id, client_id, value, status, type);
        this.setPaymentDate();
        this.feeCalculator();
    }

    static create(transaction_id: string, client_id: string, value: number): Payble {
        const id = crypto.randomUUID();
        return new DebitPaybles(id, transaction_id, client_id, value, 'paid', 'debit_card');
    }
    static restory(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string): Payble {
        return new DebitPaybles(payble_id, transaction_id, client_id, value, status, type);
    }
    protected setPaymentDate(): void {
        this.paymentDate = new Date();
    }
    protected feeCalculator(): void {
        this.value -= this.value * this.fee;
    }
}
