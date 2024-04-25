import HttpResponse from '../../domain/HttpServer/HttpResponse';
import User from '../../domain/entites/User';
import { success } from '../../domain/helpers/httphelpers';
import UserRepository from '../../domain/repository/UserRepository';
import UseCase from './UseCase';

export default class CreateUser implements UseCase {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(data: Input): Promise<HttpResponse> {
        try {
            const userExist = await this.userRepository.getByEmail(data.email);
            if (userExist) return { statusCode: 422, body: 'User already exists.' };
            const user = User.create(data.name, data.email);
            await this.userRepository.save(user);
            return success(201, { message: 'User created' });
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

type Input = {
    name: string;
    email: string;
};
