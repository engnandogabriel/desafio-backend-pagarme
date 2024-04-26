import GetAmountWaitngPayment from '../../src/application/UseCase/GetAmountWaitngPayment';
import PayblesRepositoryMemory from '../../src/infra/Repository/PayblesRepositoryMemory';
import UserRepositoryMemory from '../../src/infra/Repository/UserRepositoryMemory';

test('Deve retorna o saldo já recebido', async () => {
    const getAmountWaitngPayment = new GetAmountWaitngPayment(new UserRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        client_id: '642485af-9f85-4930-9ab9-f4c2d006d3c9',
    };
    const output = await getAmountWaitngPayment.execute(Input);
    expect(output.statusCode).toBe(200);
    expect(output.body.data.status).toBe('waiting');
});
