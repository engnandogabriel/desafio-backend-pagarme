import User from '../../src/domain/entites/User';

test('Deve criar um usuário', () => {
    const user = User.create('john doe', 'john.doe@gmail.com');
    expect(user.getId()).toBeDefined();
    expect(user.getEmail()).toBe('john.doe@gmail.com');
});

test('Não deve criar um usuário com email inválido', () => {
    expect(() => User.create('john doe', 'john.doegmail.com')).toThrow(new Error('Invalid email'));
});
