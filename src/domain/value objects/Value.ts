import InvalidParamError from '../Error/InvalidParamError';

export default class Amount {
    private amount: number;

    constructor(amount: number) {
        this.amount = this.setAmount(amount);
    }

    private setAmount(amount: number) {
        if (amount <= 0) throw new InvalidParamError('The value must be greater than 10');
        return amount;
    }

    getAmount(): number {
        return this.amount;
    }
}
