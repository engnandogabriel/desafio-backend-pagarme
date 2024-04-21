import Paybles from '../entites/Paybles/Paybles';

export default interface PayblesRepository {
    save(payble: Paybles): Promise<void>;
    getById(paybleId: string): Promise<Paybles | void>;
    getAll(): Promise<Array<Paybles>>;
    getByStatus(method: string): Promise<Array<Paybles>>;
}
