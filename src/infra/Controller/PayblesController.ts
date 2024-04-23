import GetAmountPaid from '../../application/UseCase/GetAmountPaid';
import GetAmountWaitngPayment from '../../application/UseCase/GetAmountWaitngPayment';
import HttpServer from '../http/HttpServer';

export default class PayblesController {
    private httpServer: HttpServer;
    private getAmountPaid: GetAmountPaid;
    private getAmonutWaitngPayment: GetAmountWaitngPayment;
    constructor(httpServer: HttpServer, getAmountPaid: GetAmountPaid, getAmonutWaitngPayment: GetAmountWaitngPayment) {
        this.httpServer = httpServer;
        this.getAmountPaid = getAmountPaid;
        this.getAmonutWaitngPayment = getAmonutWaitngPayment;

        this.httpServer.on('get', '/paybles/:client_id/paid', async (req: any) => {
            const output = await this.getAmountPaid.execute({ client_id: req.params.client_id });
            return output;
        });
        this.httpServer.on('get', '/paybles/:client_id/waitng', async (req: any) => {
            const output = await this.getAmonutWaitngPayment.execute({ client_id: req.params.client_id });
            return output;
        });
    }
}
