import ServerError from '../../domain/Error/ServerError';
import HttpResponse from '../../domain/HttpServer/HttpResponse';
import DebitPaybles from '../../domain/entites/Paybles/DebitPaybles';
import Transaction from '../../domain/entites/Transaction';
import { badRequest, serverError, success } from '../../domain/helpers/httphelpers';
import PayblesRepository from '../../domain/repository/PayblesRepository';
import TransactionRepository from '../../domain/repository/TransactionRepository';
import UserRepository from '../../domain/repository/UserRepository';
import UseCase from './UseCase';

export default class CreateDebitTransaction implements UseCase {
    private userRepository: UserRepository;
    private transactionRepository: TransactionRepository;
    private payblesRepository: PayblesRepository;
    constructor(userRepository: UserRepository, transactionRepository: TransactionRepository, payblesRepository: PayblesRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.payblesRepository = payblesRepository;
    }
    async execute(data: Input): Promise<HttpResponse> {
        try {
            const client = await this.userRepository.getById(data.id_client);
            if (!client)
                return {
                    statusCode: 404,
                    body: 'Client not found',
                };
            const transaction = Transaction.create(data.id_client, data.description, data.value, 'debit_card', data.card_number, data.name_owner, data.validate_date, data.cvv);
            const debit_payble = DebitPaybles.create(transaction.getId(), data.id_client, data.value);
            await this.transactionRepository.save(transaction);
            await this.payblesRepository.save(debit_payble);
            return success(201, { message: 'Transaction Created', body: { value: data.value, amout: debit_payble.getValue(), type: debit_payble.getType(), status: debit_payble.getStatus(), card_number: transaction.getCardNumber() } });
        } catch (error) {
            if (error instanceof Error) {
                return badRequest(error);
            }
            return serverError(new ServerError('Unexpected Error'));
        }
    }
}

type Input = {
    id_client: string;
    description: string;
    value: number;
    card_number: string;
    name_owner: string;
    validate_date: string;
    cvv: string;
};
