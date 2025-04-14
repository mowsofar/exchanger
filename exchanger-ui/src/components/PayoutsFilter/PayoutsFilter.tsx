import { Checkbox } from '@salutejs/plasma-web';
import styled from 'styled-components';
import { PayoutStatus } from '../../api/types/common';
import { getFilteredPayouts, getPayouts } from '../../api/handlers';
import { $userPayouts } from '../../stores/user.store';
import { useSearchParams } from 'react-router-dom';
import React from 'react';

export const PayoutStatusValues = [
    { value: '', label: 'Все' },
    { value: 'CREATED', label: 'Создана' },
    { value: 'WAITING_FOR_CLIENT_PAYMENT', label: 'Проверка оплаты' },
    { value: 'PAYMENT_RECEIVED', label: 'Оплата подтверждена' },
    { value: 'CANCELLED', label: 'Отклонена' },
    { value: 'ERROR', label: 'Ошибка' },
    { value: 'COMPLETED', label: 'Завершена' },
];

const Root = styled.div`
    width: 30rem;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    font-size: 1.6rem;
    color: white;
`;

const Header = styled.div`
    font-size: 1.8rem;
    font-weight: 600;
`;

const StyledCheckbox = styled(Checkbox)`
    width: 30rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    & label > div:first-child > div {
        background: none !important;
        border-color: var(--accent) !important;
        width: 1.8rem;
        height: 1.8rem;
    }

    & span {
        color: white;
    }

    & svg > path {
        fill: var(--accent) !important;
    }
`;

export const PayoutsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialType = new URLSearchParams(window.location.search).get('type');

    const [typeFilter, setTypeFilter] = React.useState(initialType || '');

    const handleClickFilter = async (status?: PayoutStatus) => {
        try {
            const newSearchParams = new URLSearchParams(searchParams);

            if (!status) {
                newSearchParams.delete('type');
                setTypeFilter('');
                const payouts = await getPayouts();
                $userPayouts.set(payouts);
            } else {
                newSearchParams.set('type', status);
                setTypeFilter(status);
                const payouts = await getFilteredPayouts(status);
                $userPayouts.set(payouts);
            }
            setSearchParams(newSearchParams);
        } catch (error) {}
    };

    return (
        <Root>
            <Header>Отфильтровать заявки по статусу:</Header>
            {PayoutStatusValues.map((payout) => (
                <StyledCheckbox
                    label={payout.label}
                    checked={payout.value === typeFilter}
                    onClick={() => {
                        if (payout.value === typeFilter) {
                            setTypeFilter('');
                            handleClickFilter();
                        } else {
                            handleClickFilter(payout?.value as PayoutStatus);
                        }
                    }}
                />
            ))}
        </Root>
    );
};
