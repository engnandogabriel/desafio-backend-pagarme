import Transaction from '../../src/domain/entites/Transaction';

test('Deve criar uma transação', () => {
    const transaction = Transaction.create('1234', 'Capa de celular', 30, 'debit_card', '1234 5678 7894 1234', 'John Doe', '01/26', '422');
    expect(transaction.getId()).toBeDefined();
    expect(transaction.getClientId()).toBe('1234');
    expect(transaction.getCardNumber()).toBe('1234');
    expect(transaction.getValue()).toBe(30);
    expect(transaction.getValidateDate()).toBe('01/26');
    expect(transaction.getCvv()).toBe('422');
});

test('Não deve criar uma transação com valor invalido', () => {
    expect(() => Transaction.create('1234', 'Capa de celular', 0, 'debit_card', '1234 5678 7894 1234', 'John Doe', '01/24', '422')).toThrow(new Error('Amount is ivalid'));
});
test('Não deve criar uma transação com numero do cartão inválido', () => {
    expect(() => Transaction.create('1234', 'Capa de celular', 30, 'debit_card', '1234 5678 7894 123445', 'John Doe', '01/24', '422')).toThrow(new Error('Length Card of Number is invalid'));
});
test('Não deve criar uma transação com data de validade do cartão invalido', () => {
    expect(() => Transaction.create('1234', 'Capa de celular', 30, 'debit_card', '1234 5678 7894 1234', 'John Doe', '01/24', '422')).toThrow(new Error('Date is invalid'));
});
test('Não deve criar uma transação com data CVV invalido', () => {
    expect(() => Transaction.create('1234', 'Capa de celular', 30, 'debit_card', '1234 5678 7894 1234', 'John Doe', '01/26', '42A')).toThrow(new Error('CVV is invalid'));
});
