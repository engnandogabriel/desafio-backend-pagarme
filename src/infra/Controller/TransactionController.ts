import CreateCreditTransaction from '../../application/UseCase/CreateCreditTransaction';
import CreateDebitTransaction from '../../application/UseCase/CreateDebitTransaction';
import HttpServer from '../http/HttpServer';

export default class TransactionController {
    private httpServer: HttpServer;
    private createCreditTransaction: CreateCreditTransaction;
    private createDebitTransaction: CreateDebitTransaction;
    constructor(httpServer: HttpServer, createCreditTransaction: CreateCreditTransaction, createDebitTransaction: CreateDebitTransaction) {
        this.httpServer = httpServer;
        this.createCreditTransaction = createCreditTransaction;
        this.createDebitTransaction = createDebitTransaction;

        this.httpServer.on('post', '/transaction/credit_card', async (req: any) => {
            const output = await this.createCreditTransaction.execute(req.body);
            return output;
        });

        this.httpServer.on('post', '/transaction/debit_card', async (req: any) => {
            const output = await this.createDebitTransaction.execute(req.body);
            return output;
        });
    }
}
