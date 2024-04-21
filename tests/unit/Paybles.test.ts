import CreditPaybles from '../../src/domain/entites/Paybles/CreditPaybles';
import DebitPaybles from '../../src/domain/entites/Paybles/DebitPaybles';

test('Deve criar um payble do tipo credit_card', () => {
    const creditPayble = CreditPaybles.create('transaction_id', 'client_id', 100);
    expect(creditPayble.getPaybleId()).toBeDefined();
    expect(creditPayble.getType()).toBe('credit_card');
    expect(creditPayble.getStatus()).toBe('waiting_funds');
    // amount = value - 5%
    expect(creditPayble.getValue()).toBe(95);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const expectedPaymentDate = new Date(currentDate);
    expectedPaymentDate.setDate(currentDate.getDate() + 30);

    const paymentDate = creditPayble.getPaymentDate();
    paymentDate.setHours(0, 0, 0, 0);

    expect(paymentDate).toEqual(expectedPaymentDate);
});

test('Deve criar um payble do tipo debit_card', () => {
    const debitPayment = DebitPaybles.create('transaction_id', 'client_id', 100);
    expect(debitPayment.getPaybleId()).toBeDefined();
    expect(debitPayment.getType()).toBe('debit_card');
    expect(debitPayment.getStatus()).toBe('paid');
    // amount = value - 3%
    expect(debitPayment.getValue()).toBe(97);
});
