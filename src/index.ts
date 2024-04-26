import CreateCreditTransaction from './application/UseCase/CreateCreditTransaction';
import CreateDebitTransaction from './application/UseCase/CreateDebitTransaction';
import CreateUser from './application/UseCase/CreateUser';
import GetAllUser from './application/UseCase/GetAllUser';
import GetAmountPaid from './application/UseCase/GetAmountPaid';
import GetAmountWaitngPayment from './application/UseCase/GetAmountWaitngPayment';
import PayblesController from './infra/Controller/PayblesController';
import TransactionController from './infra/Controller/TransactionController';
import UserController from './infra/Controller/UserController';
import PayblesRepositoryMemory from './infra/Repository/PayblesRepositoryMemory';
import TransactionRepositoryMemory from './infra/Repository/TransactionRepositoryMemory';
import UserRepositoryMemory from './infra/Repository/UserRepositoryMemory';
import AxiosAdpter from './infra/http/ExpressAdpter';

const userRepositoryMemory = new UserRepositoryMemory();
const transactionRepositoryMemory = new TransactionRepositoryMemory();
const payblesRepositoryMemory = new PayblesRepositoryMemory();

const createUser = new CreateUser(userRepositoryMemory);
const getAllUser = new GetAllUser(userRepositoryMemory);

const createCreditTransaction = new CreateCreditTransaction(userRepositoryMemory, transactionRepositoryMemory, payblesRepositoryMemory);
const createDebitTransaction = new CreateDebitTransaction(userRepositoryMemory, transactionRepositoryMemory, payblesRepositoryMemory);

const getAmountPaid = new GetAmountPaid(userRepositoryMemory, payblesRepositoryMemory);
const getAmountWaitngPayment = new GetAmountWaitngPayment(userRepositoryMemory, payblesRepositoryMemory);

const axiosAdpter = new AxiosAdpter();
new UserController(axiosAdpter, createUser, getAllUser);
new TransactionController(axiosAdpter, createCreditTransaction, createDebitTransaction);
new PayblesController(axiosAdpter, getAmountPaid, getAmountWaitngPayment);
axiosAdpter.listen(8080);
