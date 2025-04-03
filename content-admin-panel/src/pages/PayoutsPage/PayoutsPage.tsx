import { Headline3, Spinner } from '@salutejs/plasma-web';
import { StyledTableHeaderCell, TableBody } from '../../components/Table/Table';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { usePayoutsPage } from './PayoutsPage.hooks';
import {
    Plug,
    SpinnerWrapper,
    StyledButton,
    StyledButtons,
    StyledHeader,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
    StyledTableWrapper,
    TwoColumns,
} from './PayoutsPage.styled';
import { Payout, PayoutSelectStatusValues } from '../../api/types/common';
import { useStore } from '@nanostores/react';
import { $payouts, $selectedPayout } from '../../stores/payout.store';
import { PayoutCard } from '../../components/PayoutCard/PayoutCard';
import { PayoutPlug } from '../../components/PayoutPlug/PayoutPlug';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { StyledSelect } from '../../components/StyledSelect/StyledSelect';

export const PayoutsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { getPayoutsList, getPayoutsByType, isLoading } = usePayoutsPage();

    const initialType = new URLSearchParams(window.location.search).get('type');

    const { id = '' } = useParams();

    const navigate = useNavigate();

    const payouts = useStore($payouts);
    const selectedPayout = useStore($selectedPayout);

    const handleClickPayoutType = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (value === '') {
            newSearchParams.delete('type');
            getPayoutsList();
        } else {
            newSearchParams.set('type', value);
            getPayoutsByType(value);
        }

        setSearchParams(newSearchParams);
    };

    const handlePayoutClick = (payout: Payout) => {
        navigate(`/content-admin/payouts/${payout.id}?${searchParams.toString()}`);
    };

    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <>
            <head>
                <title>Заявки</title>
            </head>

            <StyledRoot>
                <StyledHeader>
                    <Headline3>Заявки</Headline3>
                    <StyledButtons>
                        <StyledButton
                            view="secondary"
                            text="Обновить список"
                            contentLeft={<IconRotateCcw />}
                            onClick={handleReloadPage}
                        />
                        <StyledSelect
                            placeholder="Тип заявки"
                            items={PayoutSelectStatusValues}
                            value={initialType}
                            onChange={(value) => handleClickPayoutType(value as string)}
                        />
                    </StyledButtons>
                </StyledHeader>

                <TwoColumns>
                    <StyledTableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Заявка</StyledTableHeaderCell>
                        </StyledTableHeader>

                        {Boolean(isLoading) && (
                            <SpinnerWrapper>
                                <Spinner size={32} />
                            </SpinnerWrapper>
                        )}

                        {!Boolean(payouts.length) && !Boolean(isLoading) && <Plug>Нет доступных заявок</Plug>}

                        {Boolean(payouts.length) && !Boolean(isLoading) && (
                            <TableBody>
                                {payouts.map((item) => {
                                    const isSelected = item?.id === selectedPayout?.id;

                                    return (
                                        <StyledTableRow key={item.id} onClick={() => handlePayoutClick(item)}>
                                            <PayoutCard payout={item} isSelected={isSelected} />
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        )}
                    </StyledTableWrapper>

                    {id ? <Outlet /> : <PayoutPlug />}
                </TwoColumns>
            </StyledRoot>
        </>
    );
};
