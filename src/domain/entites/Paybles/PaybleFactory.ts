import PaybleDTO from '../../DTO/PaybleDTO';
import CreditPaybles from './CreditPaybles';
import DebitPaybles from './DebitPaybles';
import IPaybleFactory from './IPaybleFactory';
import Payble from './Paybles';

export default class PaybleFactory implements IPaybleFactory {
    factory(type: string, payble: PaybleDTO): Payble {
        if (type === 'credit_card') return CreditPaybles.restore(payble.payble_id, payble.transaction_id, payble.client_id, payble.value, payble.status, payble.type, payble.paymentDate);
        if (type === 'debit_card') return DebitPaybles.restore(payble.payble_id, payble.transaction_id, payble.client_id, payble.value, payble.status, payble.type, payble.paymentDate);
        throw new Error('Invalid payble type.');
    }
}
