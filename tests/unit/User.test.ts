import User from '../../src/domain/entites/User';

test('Deve criar um usuário', () => {
    const user = new User('john doe', 'john.doe@gmail.com');
    expect(user.getId()).toBeDefined();
});
