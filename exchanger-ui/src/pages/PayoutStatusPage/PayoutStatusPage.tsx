import { OperationInfo } from '../../components/OperationInfo/OperationInfo';
import { PayoutStatus } from '../../components/PayoutStatus/PayoutStatus';
import { Root, StyledLayout } from './PayoutStatusPage.styled';
import { usePayoutStatusPage } from './PayoutStatusPage.hooks';

export const PayoutStatusPage: React.FC = () => {
    const { isLoading } = usePayoutStatusPage();

    return (
        <>
            <head>
                <title>Завершение операции</title>
            </head>

            <Root>
                <StyledLayout>
                    <OperationInfo />
                    <PayoutStatus isLoading={isLoading} />
                </StyledLayout>
            </Root>
        </>
    );
};
