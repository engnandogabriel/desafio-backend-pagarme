import HttpResponse from '../../domain/HttpServer/HttpResponse';
import User from '../../domain/entites/User';
import UserRepository from '../../domain/repository/UserRepository';
import UseCase from './UseCase';

export default class CreateUser implements UseCase {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(): Promise<HttpResponse> {
        try {
            const users = await this.userRepository.getAll();
            const output: Array<Output> = [];
            if (users) {
                for (const user of users) {
                    output.push({ id: user.getId(), name: user.getName(), email: user.getEmail() });
                }
            }
            return {
                statusCode: 200,
                body: output,
            };
        } catch (error) {
            if (error instanceof Error) {
                return {
                    statusCode: 422,
                    body: error.message,
                };
            }
            return {
                statusCode: 500,
                body: 'Unexpected Error',
            };
        }
    }
}

type Output = {
    id: string;
    name: string;
    email: string;
};
