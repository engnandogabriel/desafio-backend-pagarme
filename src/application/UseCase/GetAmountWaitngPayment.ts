import HttpResponse from '../../domain/HttpServer/HttpResponse';
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
            if (!client) return { statusCode: 404, body: 'Client not found' };
            const paybles = await this.payblesRepository.getByMethodAndClient('waiting_funds', data.client_id);
            console.log(paybles);
            let value = 0;
            for (const payble of paybles) {
                value += payble.getValue();
            }
            return {
                statusCode: 200,
                body: {
                    status: 'waiting_funds',
                    amount: value,
                },
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
type Input = {
    client_id: string;
};
