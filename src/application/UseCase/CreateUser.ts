import ServerError from '../../domain/Error/ServerError';
import UnauthorizedError from '../../domain/Error/UnauthorizedError';
import HttpResponse from '../../domain/HttpServer/HttpResponse';
import User from '../../domain/entites/User';
import { badRequest, serverError, success } from '../../domain/helpers/httphelpers';
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
            if (userExist) return badRequest(new UnauthorizedError('User Exist'));
            const user = User.create(data.name, data.email);
            await this.userRepository.save(user);
            return success(201, { message: 'User created' });
        } catch (error) {
            if (error instanceof Error) {
                return badRequest(error);
            }
            return serverError(new ServerError('Unexpected Error'));
        }
    }
}

type Input = {
    name: string;
    email: string;
};
