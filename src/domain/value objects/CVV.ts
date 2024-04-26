import InvalidParamError from '../Error/InvalidParamError';

export default class CVV {
    private cvv: string;

    constructor(cvv: string) {
        this.cvv = this.setCVV(cvv);
    }

    private setCVV(cvv: string) {
        const regexCVV = /^\d{3}$/;
        if (!regexCVV.test(cvv)) {
            throw new InvalidParamError('CVV is invalid');
        }
        return cvv;
    }
    getCVV(): string {
        return this.cvv;
    }
}
