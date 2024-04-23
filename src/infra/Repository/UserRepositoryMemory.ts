import User from '../../domain/entites/User';
import UserRepository from '../../domain/repository/UserRepository';
export default class UserRepositoryMemory implements UserRepository {
    users: Array<User>;
    constructor() {
        this.users = [User.restore('157064e7-0ec2-40b6-b583-4ba017dfd53c', 'John Doe', 'john.doe@gmail.com'), User.restore('642485af-9f85-4930-9ab9-f4c2d006d3c9', 'Fulano de Tal', 'fulano.de.tal@gmail.com')];
    }
    async save(data: User): Promise<void> {
        this.users.push(data);
    }
    async getById(user_id: string): Promise<void | User> {
        const user = this.users.find((user) => user.getId() === user_id);
        if (user) return user;
    }
    async getByEmail(email: string): Promise<void | User> {
        const user = this.users.find((user) => user.getEmail() === email);
        if (user) return user;
    }
    async getAll(): Promise<User[]> {
        return this.users;
    }
}
