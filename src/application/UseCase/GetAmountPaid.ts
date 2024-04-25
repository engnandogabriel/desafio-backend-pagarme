import ServerError from '../../domain/Error/ServerError';
import HttpResponse from '../../domain/HttpServer/HttpResponse';
import { badRequest, serverError, success } from '../../domain/helpers/httphelpers';
import PayblesRepository from '../../domain/repository/PayblesRepository';
import UserRepository from '../../domain/repository/UserRepository';
import UseCase from './UseCase';

export default class GetAmountPaid implements UseCase {
    private userRepository: UserRepository;
    private payblesRepository: PayblesRepository;
    constructor(userRepository: UserRepository, payblesRepository: PayblesRepository) {
        this.userRepository = userRepository;
        this.payblesRepository = payblesRepository;
    }
    async execute(data: Input): Promise<HttpResponse> {
        try {
            const client = await this.userRepository.getById(data.client_id);
            if (!client) return { statusCode: 404, body: 'Client not found' };
            const paybles = await this.payblesRepository.getByMethodAndClient('paid', data.client_id);
            let value = 0;
            for (const payble of paybles) {
                value += payble.getValue();
            }
            return success(200, {
                message: 'Paid',
                data: {
                    status: 'paid',
                    amount: value,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                return badRequest(error);
            }
            return serverError(new ServerError('Unexpected Error'));
        }
    }
}
type Input = {
    client_id: string;
};
