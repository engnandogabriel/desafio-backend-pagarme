import CreateCreditTransaction from '../../src/application/UseCase/CreateCreditTransaction';
import PayblesRepositoryMemory from '../../src/infra/Repository/PayblesRepositoryMemory';
import TransactionRepositoryMemory from '../../src/infra/Repository/TransactionRepositoryMemory';
import UserRepositoryMemory from '../../src/infra/Repository/UserRepositoryMemory';

test('Deve criar uma transação de crédito', async () => {
    const creditTransaction = new CreateCreditTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await creditTransaction.execute(Input);
    expect(output.statusCode).toBe(201);
    expect(output.body.amout).toBe(95);
    expect(output.body.type).toBe('credit_card');
    expect(output.body.status).toBe('waiting_funds');
    expect(output.body.card_number).toBe('4541');
});

test('Não deve criar uma transação de crédito se o usuario não existir', async () => {
    const creditTransaction = new CreateCreditTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '57064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await creditTransaction.execute(Input);
    expect(output.statusCode).toBe(404);
    expect(output.body).toBe('Client not found');
});
test('Não deve criar uma transação de crédito com valor inválido', async () => {
    const creditTransaction = new CreateCreditTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 0,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await creditTransaction.execute(Input);
    expect(output.statusCode).toBe(422);
    expect(output.body).toBe('Amount is ivalid');
});
test('Não deve criar uma transação de crédito com número de cartão inválido', async () => {
    const creditTransaction = new CreateCreditTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541 1111',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await creditTransaction.execute(Input);
    expect(output.statusCode).toBe(422);
    expect(output.body).toBe('Length Card of Number is invalid');
});
test('Não deve criar uma transação de crédito com número data de validade inválida', async () => {
    const creditTransaction = new CreateCreditTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/24',
        cvv: '454',
    };
    const output = await creditTransaction.execute(Input);
    expect(output.statusCode).toBe(422);
    expect(output.body).toBe('Date is invalid');
});
test('Não deve criar uma transação de crédito com número CVV inválida', async () => {
    const creditTransaction = new CreateCreditTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '4544',
    };
    const output = await creditTransaction.execute(Input);
    expect(output.statusCode).toBe(422);
    expect(output.body).toBe('CVV is invalid');
});
