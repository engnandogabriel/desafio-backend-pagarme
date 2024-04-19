export default class CardNumber {
    private card_number: string;
    constructor(card_number: string) {
        this.card_number = this.setCardNumber(card_number);
    }
    private setCardNumber(card_number: string): string {
        const numberWithoutSpace = card_number.replace(/\s/g, '');
        if (numberWithoutSpace.length != 16) throw new Error('Length Card of Number is invalid');
        const lastDigit = numberWithoutSpace.slice(-4);
        return lastDigit;
    }
    getCardNumber(): string {
        return this.card_number;
    }
}
