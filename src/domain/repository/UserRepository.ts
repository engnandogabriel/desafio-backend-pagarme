import User from '../entites/User';

export default interface UserRepository {
    save(data: User): Promise<void>;
    getById(user_id: string): Promise<User | void>;
    getByEmail(email: string): Promise<User | void>;
    getAll(): Promise<Array<User>>;
}
