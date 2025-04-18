import { Headline3, Spinner } from '@salutejs/plasma-web';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { useProcessPayoutsPage } from './ProcessPayoutsPage.hooks';
import {
    PayoutsList,
    SpinnerWrapper,
    StyledButton,
    StyledFooter,
    StyledHeader,
    StyledRoot,
} from './ProcessPayoutsPage.styled';
import { useStore } from '@nanostores/react';
import { $payouts, $payoutsTotal } from '../../stores/payout.store';
import { PayoutCard } from '../../components/PayoutCard/PayoutCard';
import { PayoutPlug } from '../../components/PayoutPlug/PayoutPlug';
import { Paging } from '../../components/Paging/Paging';
import { PAYOUTS_PER_PAGE } from '../../api/types/common';

export const ProcessPayoutsPage: React.FC = () => {
    const { page, handleClickPage, isLoading, editPayoutStatus, setPayoutRequisites, verifyRequisites } =
        useProcessPayoutsPage();

    const payouts = useStore($payouts);
    const payoutsTotal = useStore($payoutsTotal);

    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <>
            <head>
                <title>Заявки в обработке</title>
            </head>

            <StyledRoot>
                <StyledHeader>
                    <Headline3>Заявки в обработке</Headline3>

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
