import { useStore } from '@nanostores/react';
import styled from 'styled-components';
import { $userPayouts } from '../../stores/user.store';
import { getPayoutData } from '../../utils/getPayoutStatus';
import { IconChevronRight } from '@salutejs/plasma-icons';
import { Button } from '@salutejs/plasma-web';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { formatCalculatorInput } from '../../utils/formatNumber';
import { Payout } from '../../api/types/common';

const Payouts = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 2rem;
    font-size: 2rem;
`;

const Root = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: var(--backgroundSecondary);
    border-radius: 2.5rem;
    color: white;
    align-items: center;
`;

const Columns = styled.div`
    display: flex;
    width: 100%;
    column-gap: 4rem;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;

    @media only screen and (max-width: 1300px) {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 2rem;
    }

    @media only screen and (max-width: 820px) {
        padding: 1.5rem 2rem;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;

    @media only screen and (max-width: 820px) {
        row-gap: 1rem;
    }
`;

const Status = styled.div<{ color: React.CSSProperties['background'] }>`
    background-color: ${({ color }) => (color ? color : '#27c49a')};
    padding: 0.5rem 1.5rem;
    border-radius: 1.5rem;
    font-size: 1.7rem;
    font-weight: 600;
    width: fit-content;

    @media only screen and (max-width: 820px) {
        font-size: 1.5rem;
    }
`;

const PayoutDate = styled.div`
    opacity: 0.3;
    font-size: 1.6rem;
    font-weight: 600;

    @media only screen and (max-width: 820px) {
        font-size: 1.3rem;
    }
`;

const PayoutId = styled.div`
    color: white;
    font-size: 2rem;
    font-weight: 600;

    @media only screen and (max-width: 820px) {
        font-size: 1.6rem;
    }
`;

const PayoutDescription = styled.div`
    color: white;
    font-weight: 600;
    opacity: 0.8;
    font-size: 1.7rem;
    text-align: center;

    @media only screen and (max-width: 1300px) {
        text-align: start;
    }

    @media only screen and (max-width: 820px) {
        font-size: 1.3rem;
    }
`;

const Direction = styled.div`
    display: flex;
    column-gap: 0.8rem;
    font-size: 1.7rem;
    align-items: center;
    font-weight: 600;
    flex-wrap: wrap;

    @media only screen and (max-width: 820px) {
        font-size: 1.4rem;
    }
`;

const Icon = styled.img`
    width: 3rem;

    @media only screen and (max-width: 820px) {
        width: 2rem;
    }
`;

const StyledButton = styled(Button)`
    font-family: Onest;
    color: var(--backgroundTertiary);
    font-weight: 600;
    font-size: 1.7rem;

    @media only screen and (max-width: 820px) {
        font-size: 1.3rem;
    }
`;

const Plug = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    font-weight: 600;
    justify-content: center;
    color: var(--backgroundTertiary);
`;

export const PayoutsList = () => {
    const payouts = useStore($userPayouts);
    const navigate = useNavigate();

    if (payouts.length === 0) {
        return <Plug>Нет активных заявок</Plug>;
    }

    const handleClickMoreInfo = (payout: Payout) => {
        if (payout.status === 'CREATED' || payout.status === 'WAITING_FOR_REQUISITES') {
            navigate(ROUTES.payment(payout.id));
        } else {
            navigate(ROUTES.payoutStatus(payout.id));
        }
    };

    return (
        <Payouts>
            {payouts.map((payout) => {
                const createdAt = new Date(payout.createdAt + 'Z').toLocaleString();

                return (
                    <Root>
                        <Columns>
                            <Column>
                                <PayoutId>№{payout.id}</PayoutId>
                                <Status color={getPayoutData(payout.status).color}>
                                    {getPayoutData(payout.status).label}
                                </Status>
                                <PayoutDate>{createdAt}</PayoutDate>
                            </Column>

                            <Column>
                                <Direction>
                                    <Icon src={payout.srcCurrency?.paymentSystem.imagePath} />
                                    <div>{formatCalculatorInput(payout.amountFrom)}</div>
                                    <div>{payout.srcCurrency?.currencyCode.code}</div>

                                    <IconChevronRight color="white" size="m" />

                                    <Icon src={payout.targetCurrency?.paymentSystem.imagePath} />
                                    <div>{formatCalculatorInput(payout.amountTo)}</div>
                                    <div>{payout.targetCurrency?.currencyCode.code}</div>
                                </Direction>
                            </Column>

                            <Column>
                                <PayoutDescription>{payout.email}</PayoutDescription>
                                <PayoutDescription>{payout.requisites?.replace(/.{4}\B/g, '$& ')}</PayoutDescription>
                            </Column>

                            <StyledButton view="clear" onClick={() => handleClickMoreInfo(payout)}>
                                Подробнее
                            </StyledButton>
                        </Columns>
                    </Root>
                );
            })}
        </Payouts>
    );
};
