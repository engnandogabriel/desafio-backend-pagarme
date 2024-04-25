import NotFoundError from '../../domain/Error/NotFoundError';
import ServerError from '../../domain/Error/ServerError';
import HttpResponse from '../../domain/HttpServer/HttpResponse';
import { badRequest, notFound, serverError, success } from '../../domain/helpers/httphelpers';
import PayblesRepository from '../../domain/repository/PayblesRepository';
import UserRepository from '../../domain/repository/UserRepository';
import UseCase from './UseCase';

export default class GetAmountWaitngPayment implements UseCase {
    private userRepository: UserRepository;
    private payblesRepository: PayblesRepository;
    constructor(userRepository: UserRepository, payblesRepository: PayblesRepository) {
        this.userRepository = userRepository;
        this.payblesRepository = payblesRepository;
    }
    async execute(data: Input): Promise<HttpResponse> {
        try {
            const client = await this.userRepository.getById(data.client_id);
            if (!client) return notFound(new NotFoundError('Client not found'));
            const paybles = await this.payblesRepository.getByMethodAndClient('waiting_funds', data.client_id);
            let value = 0;
            for (const payble of paybles) {
                value += payble.getValue();
            }
            return success(200, {
                message: 'Waiting Payments',
                data: {
                    status: 'waiting',
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
