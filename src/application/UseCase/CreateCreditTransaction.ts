import NotFoundError from '../../domain/Error/NotFoundError';
import ServerError from '../../domain/Error/ServerError';
import HttpResponse from '../../domain/HttpServer/HttpResponse';
import CreditPaybles from '../../domain/entites/Paybles/CreditPaybles';
import Transaction from '../../domain/entites/Transaction';
import { badRequest, notFound, serverError, success } from '../../domain/helpers/httphelpers';
import PayblesRepository from '../../domain/repository/PayblesRepository';
import TransactionRepository from '../../domain/repository/TransactionRepository';
import UserRepository from '../../domain/repository/UserRepository';
import UseCase from './UseCase';

export default class CreateCreditTransaction implements UseCase {
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
            if (!client) return notFound(new NotFoundError('Client not found'));
            const transaction = Transaction.create(data.id_client, data.description, data.value, 'credit_card', data.card_number, data.name_owner, data.validate_date, data.cvv);
            const credit_payble = CreditPaybles.create(transaction.getId(), data.id_client, data.value);
            await this.transactionRepository.save(transaction);
            await this.payblesRepository.save(credit_payble);
            return success(201, { message: 'Transaction Created', data: { value: data.value, amout: credit_payble.getValue(), type: credit_payble.getType(), status: credit_payble.getStatus(), card_number: transaction.getCardNumber() } });
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
