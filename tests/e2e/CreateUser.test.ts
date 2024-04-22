import CreateUser from '../../src/application/UseCase/CreateUser';
import UserRepositoryMemory from '../../src/infra/Repository/UserRepositoryMemory';

test('Deve criar um usuário no banco em memória', async () => {
    const userRepositoryMemory = new UserRepositoryMemory();
    const createUser = new CreateUser(userRepositoryMemory);
    const input = { name: 'name', email: 'email@email.com' };
    const output = await createUser.execute(input);
    expect(output.statusCode).toBe(201);
    expect(output.body).toBe('User created');
});

test('Não deve criar um usuário com email existente', async () => {
    const userRepositoryMemory = new UserRepositoryMemory();
    const createUser = new CreateUser(userRepositoryMemory);
    const input = { name: 'john doe', email: 'john.doe@gmail.com' };
    const output = await createUser.execute(input);
    expect(output.statusCode).toBe(422);
    expect(output.body).toBe('User already exists.');
});
