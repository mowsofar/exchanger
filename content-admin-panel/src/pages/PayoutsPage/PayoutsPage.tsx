import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableHeaderCell, TableBody } from '../../components/Table/Table';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { usePayoutsPage } from './PayoutsPage.hooks';
import {
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
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { StyledSelect } from '../../components/StyledSelect/StyledSelect';

export const PayoutsPage: React.FC = () => {
    const { getPayoutsList, getPayoutsByType } = usePayoutsPage();

    const { id = '' } = useParams();

    const navigate = useNavigate();

    const payouts = useStore($payouts);
    const selectedPayout = useStore($selectedPayout);

    const handleClickPayoutType = (value: string) => {
        if (value === '') {
            getPayoutsList();

            return;
        }

        getPayoutsByType(value);
    };

    const handlePayoutClick = (payout: Payout) => {
        navigate(ROUTES.payout(payout?.id));
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
                            onChange={(value) => handleClickPayoutType(value as string)}
                        />
                    </StyledButtons>
                </StyledHeader>

                <TwoColumns>
                    <StyledTableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Заявка</StyledTableHeaderCell>
                        </StyledTableHeader>
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
                    </StyledTableWrapper>

                    {id ? <Outlet /> : <PayoutPlug />}
                </TwoColumns>
            </StyledRoot>
        </>
    );
};
