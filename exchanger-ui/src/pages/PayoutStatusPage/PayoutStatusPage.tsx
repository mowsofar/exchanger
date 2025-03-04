import { OperationInfo } from '../../components/OperationInfo/OperationInfo';
import { PayoutStatus } from '../../components/PayoutStatus/PayoutStatus';
import { StyledLayout } from './PayoutStatusPage.styled';
import { usePayoutStatusPage } from './PayoutStatusPage.hooks';

export const PayoutStatusPage: React.FC = () => {
    usePayoutStatusPage();

    return (
        <StyledLayout>
            <OperationInfo />
            <PayoutStatus />
        </StyledLayout>
    );
};
