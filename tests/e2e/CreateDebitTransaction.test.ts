import CreateDebitTransaction from '../../src/application/UseCase/CreateDebitTransaction';
import PayblesRepositoryMemory from '../../src/infra/Repository/PayblesRepositoryMemory';
import TransactionRepositoryMemory from '../../src/infra/Repository/TransactionRepositoryMemory';
import UserRepositoryMemory from '../../src/infra/Repository/UserRepositoryMemory';

test('Deve criar uma transação de débito', async () => {
    const debitTransaction = new CreateDebitTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await debitTransaction.execute(Input);
    expect(output.statusCode).toBe(201);
    expect(output.body.data.amout).toBe(97);
    expect(output.body.data.type).toBe('debit_card');
    expect(output.body.data.status).toBe('paid');
    expect(output.body.data.card_number).toBe('4541');
});

test('Não deve criar uma transação de débito se o usuario não existir', async () => {
    const debitTransaction = new CreateDebitTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '57064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await debitTransaction.execute(Input);
    expect(output.statusCode).toBe(404);
    expect(output.body.error.message).toBe('Client not found');
});
test('Não deve criar uma transação de débito com valor inválido', async () => {
    const debitTransaction = new CreateDebitTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 0,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await debitTransaction.execute(Input);
    expect(output.statusCode).toBe(400);
    expect(output.body.error.message).toBe('Invalid param: The value must be greater than 10');
});
test('Não deve criar uma transação de débito com número de cartão inválido', async () => {
    const debitTransaction = new CreateDebitTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541 1111',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '454',
    };
    const output = await debitTransaction.execute(Input);
    expect(output.statusCode).toBe(400);
    expect(output.body.error.message).toBe('Invalid param: Length Card of Number is invalid');
});
test('Não deve criar uma transação de débito com número data de validade inválida', async () => {
    const debitTransaction = new CreateDebitTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/24',
        cvv: '454',
    };
    const output = await debitTransaction.execute(Input);
    expect(output.statusCode).toBe(400);
    expect(output.body.error.message).toBe('Invalid param: Period of date is invalid');
});
test('Não deve criar uma transação de débito com número CVV inválida', async () => {
    const debitTransaction = new CreateDebitTransaction(new UserRepositoryMemory(), new TransactionRepositoryMemory(), new PayblesRepositoryMemory());
    const Input = {
        id_client: '157064e7-0ec2-40b6-b583-4ba017dfd53c',
        description: 'descricao',
        value: 100,
        card_number: '1234 7894 1448 4541',
        name_owner: 'john doe',
        validate_date: '01/26',
        cvv: '4544',
    };
    const output = await debitTransaction.execute(Input);
    expect(output.statusCode).toBe(400);
    expect(output.body.error.message).toBe('Invalid param: CVV is invalid');
});
