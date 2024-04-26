import InvalidParamError from '../Error/InvalidParamError';

export default class ValidateDate {
    private validate_date: string;
    constructor(validate_date: string) {
        this.validate_date = this.setValidateDate(validate_date);
    }

    private setValidateDate(date: string) {
        const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!dateRegex.test(date)) throw new InvalidParamError('The date is invalid');
        const [month, year] = date.split('/').map(Number);
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear() % 100;

        if (year < currentYear || (year === currentYear && month < currentMonth) || month < 1 || month > 12) throw new Error('Period of date is invalid');

        return date;
    }

    getValidateDate(): string {
        return this.validate_date;
    }
}
