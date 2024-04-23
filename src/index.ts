import CreateUser from './application/UseCase/CreateUser';
import GetAllUser from './application/UseCase/GetAllUser';
import GetAmountPaid from './application/UseCase/GetAmountPaid';
import GetAmountWaitngPayment from './application/UseCase/GetAmountWaitngPayment';
import PayblesController from './infra/Controller/PayblesController';
import UserController from './infra/Controller/UserController';
import PayblesRepositoryMemory from './infra/Repository/PayblesRepositoryMemory';
import UserRepositoryMemory from './infra/Repository/UserRepositoryMemory';
import AxiosAdpter from './infra/http/AxiosAdpter';

const userRepositoryMemory = new UserRepositoryMemory();
const payblesRepositoryMemory = new PayblesRepositoryMemory();

const createUser = new CreateUser(userRepositoryMemory);
const getAllUser = new GetAllUser(userRepositoryMemory);

const getAmountPaid = new GetAmountPaid(userRepositoryMemory, payblesRepositoryMemory);
const getAmountWaitngPayment = new GetAmountWaitngPayment(userRepositoryMemory, payblesRepositoryMemory);

const axiosAdpter = new AxiosAdpter();
new PayblesController(axiosAdpter, getAmountPaid, getAmountWaitngPayment);
new UserController(axiosAdpter, createUser, getAllUser);
axiosAdpter.listen(8080);
