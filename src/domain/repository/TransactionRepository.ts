import Transaction from '../entites/Transaction';

export default interface TransactionRepository {
    save(data: Transaction): Promise<void>;
    getById(transaction_id: string): Promise<Transaction | void>;
    getAll(): Promise<Array<Transaction>>;
    getByClient(client_id: string): Promise<Array<Transaction>>;
}
