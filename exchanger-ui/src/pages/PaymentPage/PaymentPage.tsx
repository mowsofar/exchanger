import { OperationInfo } from '../../components/OperationInfo/OperationInfo';
import { PayoutPayment } from '../../components/PayoutPayment/PayoutPayment';
import { usePaymentPage } from './PaymentPage.hooks';
import { Root, StyledLayout } from './PaymentPage.styled';

export const PaymentPage: React.FC = () => {
    const { isLoading } = usePaymentPage();

    return (
        <>
            <head>
                <title>Оплата заявки</title>
            </head>

            <Root>
                <StyledLayout>
                    <OperationInfo />
                    <PayoutPayment isLoading={isLoading} />
                </StyledLayout>
            </Root>
        </>
    );
};
