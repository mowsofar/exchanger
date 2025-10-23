import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Row,
    SpinnerWrapper,
    StyledButton,
    StyledButtonBack,
    StyledContent,
    StyledDescription,
    StyledHeader,
    StyledIconStatus,
    StyledLayout,
    StyledSpinner,
} from './PayoutStatus.styled';
import { useStore } from '@nanostores/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft } from '@salutejs/plasma-icons';
import { $payout } from '../../stores/payout.store';

import { getPayoutStatus, getPayoutStatusDescription } from '../../utils/getPayoutStatus';
import { Spinner } from '@salutejs/plasma-web';

export const PayoutStatus: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const payout = useStore($payout);
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate(ROUTES.payment(payout?.id));
    };

    const goToMainPage = () => {
        navigate(ROUTES.root);
    };

    React.useEffect(() => {
        const handlePopState = () => {
            const fromPage = location?.state?.from;

            if (fromPage === ROUTES.payment(payout?.id)) {
                navigate(ROUTES.root);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [location?.state?.from, navigate, payout?.id]);

    if (Boolean(isLoading)) {
        return (
            <StyledLayout>
                <StyledContent>
                    <Row>
                        <StyledButtonBack view="clear" onClick={handleBack}>
                            <IconChevronLeft size="s" color="var(--accentText)" />
                        </StyledButtonBack>

                        <Breadcrumbs
                            path={[
                                { number: 1, name: 'Ввод реквизитов', isActive: false },
                                { number: 2, name: 'Оплата заявки', isActive: false },
                                { number: 3, name: 'Завершение', isActive: true },
                            ]}
                        />
                    </Row>

                    <SpinnerWrapper>
                        <Spinner size="5rem" color="var(--accent)" />
                    </SpinnerWrapper>
                </StyledContent>
            </StyledLayout>
        );
    }

    return (
        <StyledLayout>
            <StyledContent>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="var(--accentText)" />
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

                {(payout?.status === 'CANCELLED' || payout?.status === 'ERROR') && (
                    <StyledIconStatus src="/images/error.png" />
                )}

                {(payout?.status === 'CREATED' ||
                    payout?.status === 'WAITING_FOR_CLIENT_PAYMENT' ||
                    payout?.status === 'WAITING_FOR_REQUISITES') && (
                    <SpinnerWrapper>
                        <StyledSpinner size="8rem" />
                    </SpinnerWrapper>
                )}

                {(payout?.status === 'PAYMENT_RECEIVED' ||
                    payout?.status === 'REFERRAL_PAY' ||
                    payout?.status === 'WAITING_FOR_OPERATOR_PROCESSING') && (
                    <SpinnerWrapper>
                        <StyledSpinner size="8rem" color="#26c499" />
                    </SpinnerWrapper>
                )}

                {payout?.status === 'COMPLETED' && <StyledIconStatus src="/images/success.png" />}

                {getPayoutStatusDescription(payout) && (
                    <StyledDescription>{getPayoutStatusDescription(payout)}</StyledDescription>
                )}

                {(payout?.status === 'COMPLETED' || payout?.status === 'CANCELLED' || payout?.status === 'ERROR') && (
                    <StyledButton onClick={goToMainPage}>На главную</StyledButton>
                )}
            </StyledContent>
        </StyledLayout>
    );
};
