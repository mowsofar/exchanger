import { OperationInfo } from '../../components/OperationInfo/OperationInfo';
import { PayoutPayment } from '../../components/PayoutPayment/PayoutPayment';
import { usePaymentPage } from './PaymentPage.hooks';
import { StyledLayout } from './PaymentPage.styled';

export const PaymentPage: React.FC = () => {
    usePaymentPage();

    return (
        <>
            <head>
                <title>Оплата заявки</title>
            </head>

            <StyledLayout>
                <OperationInfo />
                <PayoutPayment />
            </StyledLayout>
        </>
    );
};
