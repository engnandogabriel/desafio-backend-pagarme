import GetAmountPaid from '../../src/application/UseCase/GetAmountPaid';
import PayblesRepositoryMemory from '../../src/infra/Repository/PayblesRepositoryMemory';
import UserRepositoryMemory from '../../src/infra/Repository/UserRepositoryMemory';

test('Deve retorna o saldo já recebido', async () => {
    const getAmountPaid = new GetAmountPaid(new UserRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        client_id: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
    };
    const output = await getAmountPaid.execute(Input);
    expect(output.statusCode).toBe(200);
    expect(output.body.data.status).toBe('paid');
});
