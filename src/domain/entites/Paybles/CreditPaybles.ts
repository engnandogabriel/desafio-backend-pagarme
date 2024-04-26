import crypto from 'crypto';
import Payble from './Paybles';

export default class CreditPaybles extends Payble {
    private fee = 0.05;
    private daysToAdd = 30;
    private constructor(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string, paymentDate: Date) {
        super(payble_id, transaction_id, client_id, value, status, type, paymentDate);
    }

    static create(transaction_id: string, client_id: string, value: number): Payble {
        const id = crypto.randomUUID();
        const creditPaybles = new CreditPaybles(id, transaction_id, client_id, value, 'waiting_funds', 'credit_card', new Date());
        creditPaybles.setPaymentDate();
        creditPaybles.feeCalculator();
        return creditPaybles;
    }
    static restore(payble_id: string, transaction_id: string, client_id: string, value: number, status: string, type: string, paymentDate: string): Payble {
        return new CreditPaybles(payble_id, transaction_id, client_id, value, status, type, new Date(paymentDate));
    }
    protected setPaymentDate(): void {
        const today = new Date();
        const futureDate = new Date(today.getTime() + this.daysToAdd * 24 * 60 * 60 * 1000);
        this.paymentDate = futureDate;
    }
    protected feeCalculator(): void {
        this.value -= this.value * this.fee;
    }
}
