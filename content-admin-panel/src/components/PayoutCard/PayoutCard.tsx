import React from 'react';
import { accent, blackSecondary, surfaceSolid02, surfaceSolid03 } from '@salutejs/plasma-tokens';
import styled from 'styled-components';
import { Payout } from '../../api/types/common';
import { Badge } from '@salutejs/plasma-web';
import { getPayoutData } from '../../utils/getPayoutData';
import { IconArrowRight } from '@salutejs/plasma-icons';

const StyledRoot = styled.div`
    width: 360px;
    height: fit-content;
    background-color: ${surfaceSolid02};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    margin: auto;
    row-gap: 10px;
    padding: 20px 20px;

    &:hover {
        background-color: ${surfaceSolid03};
    }
`;

const Title = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: ${blackSecondary};

    & span {
        color: ${accent};
    }
`;

const StyledBadge = styled(Badge)`
    border-radius: 15px;
    height: 30px;
    font-weight: 600;
    font-size: 14px !important;
    padding: 0px 15px;
`;

const Direction = styled.div`
    display: flex;
    column-gap: 5px;
    font-size: 15px;
    align-items: center;
    font-weight: 600;
    flex-wrap: wrap;
`;

const Icon = styled.img`
    width: 15px;
`;

const Email = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 15px;

    & div:nth-child(1) {
        color: ${blackSecondary};
    }
`;

interface Props {
    payout: Payout;
}

export const PayoutCard: React.FC<Props> = ({ payout }) => {
    const createdAt = new Date(payout.createdAt).toLocaleString();

    return (
        <StyledRoot>
            <Title>
                <span>Заявка №{payout.id} </span> от {createdAt}
            </Title>
            <StyledBadge text={getPayoutData(payout.status).label} view={getPayoutData(payout.status).view} />
            <Direction>
                <Icon src={payout.srcCurrency?.paymentSystem.imagePath} />
                <div>{payout.amountFrom}</div>
                <div>{payout.srcCurrency?.currencyCode.code}</div>

                <IconArrowRight />

                <Icon src={payout.targetCurrency?.paymentSystem.imagePath} />
                <div>{payout.amountTo}</div>
                <div>{payout.targetCurrency?.currencyCode.code}</div>
            </Direction>
            <Email>
                <div>Заказчик:</div>
                <div>{payout.email}</div>
            </Email>
        </StyledRoot>
    );
};
