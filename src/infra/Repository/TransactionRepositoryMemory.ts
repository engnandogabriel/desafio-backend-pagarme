import Transaction from '../../domain/entites/Transaction';
import TransactionRepository from '../../domain/repository/TransactionRepository';

export default class TransactionRepositoryMemory implements TransactionRepository {
    transactions: Array<Transaction>;
    constructor() {
        this.transactions = [
            Transaction.restore('92b80286-c56c-48c2-975d-e5ad817089fc', '157064e7-0ec2-40b6-b583-4ba017dfd53c', 'capa de celular', 25, 'debit_card', '1234 5678 7894 1234', 'john doe', '01/26', '442'),
            Transaction.restore('e513f051-2ce7-4cc4-ae7e-a1bdd699bbbc', '642485af-9f85-4930-9ab9-f4c2d006d3c9', 'Fone', 100, 'credit_card', '1234 5678 7894 1541', 'Fulano', '06/30', '584'),
        ];
    }

    async save(data: Transaction): Promise<void> {
        this.transactions.push(data);
    }
    async getById(transaction_id: string): Promise<void | Transaction> {
        const transaction = this.transactions.find((transaction) => transaction.getId() === transaction_id);
        if (transaction) return transaction;
    }
    async getAll(): Promise<Transaction[]> {
        return this.transactions;
    }
    async getByClient(client_id: string): Promise<Transaction[]> {
        const transactions = [];
        for (const transaction of this.transactions) {
            if (transaction.getClientId() === client_id) transactions.push(transaction);
        }
        return transactions;
    }
}
