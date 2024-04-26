import crypto from 'crypto';
import Payble from './Paybles';

export default class DebitPaybles extends Payble {
    private fee = 0.03;
    private constructor(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string, paymentDate: Date) {
        super(payble_id, transaction_id, client_id, value, status, type, paymentDate);
    }

    static create(transaction_id: string, client_id: string, value: number): Payble {
        const id = crypto.randomUUID();
        const debitPayble = new DebitPaybles(id, transaction_id, client_id, value, 'paid', 'debit_card', new Date());
        debitPayble.setPaymentDate();
        debitPayble.feeCalculator();
        return debitPayble;
    }
    static restore(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string, paymentDate: string): Payble {
        return new DebitPaybles(payble_id, transaction_id, client_id, value, status, type, new Date(paymentDate));
    }
    protected setPaymentDate(): void {
        this.paymentDate = new Date();
    }
    protected feeCalculator(): void {
        this.value -= this.value * this.fee;
    }
}
