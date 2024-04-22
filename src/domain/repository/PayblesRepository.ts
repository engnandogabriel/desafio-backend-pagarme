import Paybles from '../entites/Paybles/Paybles';

export default interface PayblesRepository {
    save(payble: Paybles): Promise<void>;
    getById(paybleId: string): Promise<Paybles | void>;
    getAll(): Promise<Array<Paybles>>;
    getByMethodAndClient(method: string, client_id: string): Promise<Array<Paybles>>;
    getByClient(client_id: string): Promise<Array<Paybles>>;
}
