export default class Amount {
    private amount: number;

    constructor(amount: number) {
        this.amount = this.setAmount(amount);
    }

    private setAmount(amount: number) {
        if (amount <= 0) throw new Error('Amount is ivalid');
        return amount;
    }

    getAmount(): number {
        return this.amount;
    }
}
