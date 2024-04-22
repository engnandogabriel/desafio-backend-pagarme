import PaybleFactory from '../../domain/entites/Paybles/PaybleFactory';
import Paybles from '../../domain/entites/Paybles/Paybles';
import PayblesRepository from '../../domain/repository/PayblesRepository';

export default class PayblesTransactionMemory implements PayblesRepository {
    paybles: Array<Paybles>;
    constructor() {
        this.paybles = [
            new PaybleFactory().factory('debit_card', { payble_id: '74c56ab-0f3c-4aa8-9fd5-098107bcb8cb', transaction_id: '92b80286-c56c-48c2-975d-e5ad817089fc', client_id: '157064e7-0ec2-40b6-b583-4ba017dfd53c', status: 'paid', type: 'debit_card', value: 24.75 }),
            new PaybleFactory().factory('credit_card', { payble_id: '0e70ca3d-8324-42d6-8f08-2d64b6c39c67', transaction_id: 'e513f051-2ce7-4cc4-ae7e-a1bdd699bbbc', client_id: '642485af-9f85-4930-9ab9-f4c2d006d3c9', status: 'waiting_funds', type: 'credit_card', value: 95 }),
        ];
    }
    async save(payble: Paybles): Promise<void> {
        this.paybles.push(payble);
    }
    async getById(paybleId: string): Promise<void | Paybles> {
        const payble = this.paybles.find((payble) => payble.getPaybleId() === paybleId);
        if (payble) return payble;
    }
    async getAll(): Promise<Paybles[]> {
        return this.paybles;
    }
    async getByStatus(method: string): Promise<Paybles[]> {
        const paybles = this.paybles.filter((payble) => payble.getStatus() === method);
        return paybles;
    }
}
