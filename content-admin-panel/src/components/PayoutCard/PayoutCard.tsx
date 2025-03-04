import React from 'react';
import { blackSecondary, surfaceSolid02, surfaceSolid03 } from '@salutejs/plasma-tokens';
import styled from 'styled-components';
import { Payout } from '../../api/types/common';
import { Badge } from '@salutejs/plasma-web';
import { getPayoutData } from '../../utils/getPayoutData';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { IconArrowRight } from '@salutejs/plasma-icons';

const StyledRoot = styled.div`
    width: 300px;
    height: fit-content;
    margin: auto;
    background-color: ${surfaceSolid02};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 20px 20px;

    &:hover {
        background-color: ${surfaceSolid03};
    }
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${blackSecondary};
`;

const StyledBadge = styled(Badge)`
    border-radius: 15px;
    height: 35px;
    font-weight: 600;
    padding: 10px 15px;
`;

const Direction = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;
    font-weight: 600;
    flex-wrap: wrap;
`;

const Icon = styled.img`
    width: 20px;
`;

const Email = styled.div`
    display: flex;
    justify-content: space-between;
    color: ${blackSecondary};
    font-weight: 600;
`;

interface Props {
    payout: Payout;
}

export const PayoutCard: React.FC<Props> = ({ payout }) => {
    const createdAt = new Date(payout.createdAt).toLocaleString();

    const currencies = useStore($currencyList);

    const sourceCurrency = currencies.find((currency) => currency.id === payout?.srcCurrency);
    const targetCurrency = currencies.find((currency) => currency.id === payout?.targetCurrency);

    return (
        <StyledRoot>
            <Title>
                Заявка №{payout.id} от {createdAt}
            </Title>
            <StyledBadge text={getPayoutData(payout.status).label} view={getPayoutData(payout.status).view} />
            <Direction>
                <Icon src={sourceCurrency?.paymentSystem.imagePath} />
                <div>{payout.amountFrom}</div>
                <div>{sourceCurrency?.currencyCode.code}</div>

                <IconArrowRight />

                <Icon src={targetCurrency?.paymentSystem.imagePath} />
                <div>{payout.amountTo}</div>
                <div>{targetCurrency?.currencyCode.code}</div>
            </Direction>
            <Email>
                <div>Заказчик:</div>
                <div>{payout.email}</div>
            </Email>
        </StyledRoot>
    );
};
