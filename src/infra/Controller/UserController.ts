import CreateUser from '../../application/UseCase/CreateUser';
import GetAllUser from '../../application/UseCase/GetAllUser';
import HttpServer from '../http/HttpServer';

export default class UserController {
    private httpServer: HttpServer;
    private createUser: CreateUser;
    private getAllUser: GetAllUser;
    constructor(httpServer: HttpServer, createUser: CreateUser, getAllUser: GetAllUser) {
        this.httpServer = httpServer;
        this.createUser = createUser;
        this.getAllUser = getAllUser;

        this.httpServer.on('post', '/user', async (req: any) => {
            const output = await this.createUser.execute({ name: req.body.name, email: req.body.email });
            return output;
        });
    }
}
