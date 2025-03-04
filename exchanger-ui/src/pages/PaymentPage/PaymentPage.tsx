import { OperationInfo } from '../../components/OperationInfo/OperationInfo';
import { PayoutPayment } from '../../components/PayoutPayment/PayoutPayment';
import { StyledLayout } from './PaymentPage.styled';

export const PaymentPage: React.FC = () => {
    return (
        <StyledLayout>
            <OperationInfo />
            <PayoutPayment />
        </StyledLayout>
    );
};
