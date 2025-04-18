import { Headline3, Spinner } from '@salutejs/plasma-web';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { usePreliminaryPayoutsPage } from './PreliminaryPayoutsPage.hooks';
import {
    PayoutsList,
    SpinnerWrapper,
    StyledButton,
    StyledFooter,
    StyledHeader,
    StyledRoot,
} from './PreliminaryPayoutsPage.styled';
import { useStore } from '@nanostores/react';
import { $payouts, $payoutsTotal } from '../../stores/payout.store';
import { PayoutCard } from '../../components/PayoutCard/PayoutCard';
import { PayoutPlug } from '../../components/PayoutPlug/PayoutPlug';
import { Paging } from '../../components/Paging/Paging';
import { PAYOUTS_PER_PAGE } from '../../api/types/common';

export const PreliminaryPayoutsPage: React.FC = () => {
    const { page, handleClickPage, isLoading, editPayoutStatus, setPayoutRequisites, verifyRequisites } =
        usePreliminaryPayoutsPage();

    const payouts = useStore($payouts);
    const payoutsTotal = useStore($payoutsTotal);

    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <>
            <head>
                <title>Предварительные заявки</title>
            </head>

            <StyledRoot>
                <StyledHeader>
                    <Headline3>Предварительные заявки</Headline3>

                    <StyledButton
                        view="secondary"
                        text="Обновить список"
                        contentLeft={<IconRotateCcw />}
                        onClick={handleReloadPage}
                    />
                </StyledHeader>

                {Boolean(isLoading) && (
                    <SpinnerWrapper>
                        <Spinner size={32} color="grey" />
                    </SpinnerWrapper>
                )}

                {!Boolean(payouts.length) && Boolean(!isLoading) && <PayoutPlug />}

                {Boolean(payouts.length) && !Boolean(isLoading) && (
                    <PayoutsList>
                        {payouts.map((item) => {
                            return (
                                <PayoutCard
                                    payout={item}
                                    setPayoutRequisites={setPayoutRequisites}
                                    editPayoutStatus={editPayoutStatus}
                                    verifyRequisites={verifyRequisites}
                                />
                            );
                        })}
                    </PayoutsList>
                )}

                <StyledFooter>
                    {payoutsTotal > PAYOUTS_PER_PAGE && (
                        <Paging
                            currentPage={page}
                            recordsOnPage={PAYOUTS_PER_PAGE}
                            recordsTotal={payoutsTotal}
                            onClick={handleClickPage}
                        />
                    )}
                </StyledFooter>
            </StyledRoot>
        </>
    );
};
