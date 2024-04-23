import CreateUser from './application/UseCase/CreateUser';
import GetAllUser from './application/UseCase/GetAllUser';
import UserController from './infra/Controller/UserController';
import UserRepositoryMemory from './infra/Repository/UserRepositoryMemory';
import AxiosAdpter from './infra/http/AxiosAdpter';

const userRepositoryMemory = new UserRepositoryMemory();
const createUser = new CreateUser(userRepositoryMemory);
const getAllUser = new GetAllUser(userRepositoryMemory);

const axiosAdpter = new AxiosAdpter();
new UserController(axiosAdpter, createUser, getAllUser);
axiosAdpter.listen(8080);
