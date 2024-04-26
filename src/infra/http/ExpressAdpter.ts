import HttpServer from './HttpServer';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSON from '../../../swagger.json';
export default class ExpressAdpter implements HttpServer {
    app: any;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerJSON));
    }
    async on(method: string, url: string, callback: Function) {
        this.app[method](url, async function (req: Request, res: Response) {
            const output = await callback(req);
            return res.status(output.statusCode).json(output.body);
        });
    }
    listen(port: number): void {
        this.app.listen(port, () => console.log('Server running in port: ', port));
    }
}
