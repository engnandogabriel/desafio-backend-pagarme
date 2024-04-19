import Transaction from '../../src/domain/entites/Transaction';

test('Deve criar uma transação', () => {
    const transaction = new Transaction('1234', 'Capa de celular', 30, 'debit_card', '1234 5678 7894 1234', 'John Doe', '01/26', '422');
    expect(transaction.getId()).toBeDefined();
    expect(transaction.getClientId()).toBe('1234');
    expect(transaction.getCardNumber()).toBe('1234');
});
