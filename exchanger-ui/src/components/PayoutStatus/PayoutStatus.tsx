import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Row,
    StyledButton,
    StyledButtonBack,
    StyledContent,
    StyledHeader,
    StyledIconStatus,
    StyledLayout,
    StyledSpinner,
} from './PayoutStatus.styled';
import { useStore } from '@nanostores/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft } from '@salutejs/plasma-icons';
import { $payout } from '../../stores/payout.store';

import { getPayoutStatus } from '../../utils/getPayoutStatus';
import { Spinner } from '@salutejs/plasma-web';

export const PayoutStatus: React.FC = () => {
    const payout = useStore($payout);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(ROUTES.payment(payout?.id));
    };

    const goToMainPage = () => {
        navigate(ROUTES.root);
    };

    return (
        <StyledLayout>
            <StyledContent>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="white" />
                    </StyledButtonBack>

                    <Breadcrumbs
                        path={[
                            { number: 1, name: 'Ввод реквизитов', isActive: false },
                            { number: 2, name: 'Оплата заявки', isActive: false },
                            { number: 3, name: 'Завершение', isActive: true },
                        ]}
                    />
                </Row>

                <StyledHeader>{getPayoutStatus(payout)}</StyledHeader>

                {payout?.status === 'ERROR' && <StyledIconStatus src="/images/error.png" />}

                {(payout?.status === 'CREATED' ||
                    payout?.status === 'WAITING_FOR_CLIENT_PAYMENT' ||
                    payout?.status === 'WAITING_FOR_OPERATOR_PROCESSING') && (
                    <StyledSpinner>
                        <Spinner size="8rem" color="white" />
                    </StyledSpinner>
                )}

                {payout?.status === 'COMPLETED' && <StyledIconStatus src="/images/success.png" />}

                {(payout?.status === 'COMPLETED' || payout?.status === 'CANCELLED' || payout?.status === 'ERROR') && (
                    <StyledButton onClick={goToMainPage}>На главную</StyledButton>
                )}
            </StyledContent>
        </StyledLayout>
    );
};
