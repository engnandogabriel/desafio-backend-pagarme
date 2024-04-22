import PaybleDTO from '../../DTO/PaybleDTO';
import Payble from './Paybles';

export default interface IPaybleFactory {
    factory(type: string, payble: PaybleDTO): Payble;
}
