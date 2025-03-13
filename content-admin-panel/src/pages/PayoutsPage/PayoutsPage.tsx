import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableHeaderCell, TableBody } from '../../components/Table/Table';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { usePayoutsPage } from './PayoutsPage.hooks';
import {
    StyledButton,
    StyledButtons,
    StyledRoot,
    StyledSelect,
    StyledTableHeader,
    StyledTableRow,
    StyledTableWrapper,
    TwoColumns,
} from './PayoutsPage.styled';
import { Payout, PayoutSelectStatusValues } from '../../api/types/common';
import { useStore } from '@nanostores/react';
import { $payouts, $selectedPayout } from '../../stores/payout.store';
import { PayoutCard } from '../../components/PayoutCard/PayoutCard';
import { PayoutPage } from '../PayoutPage/PayoutPage';
import { PayoutPlug } from '../../components/PayoutPlug/PayoutPlug';

export const PayoutsPage: React.FC = () => {
    const { getPayoutsList, getPayoutsByType } = usePayoutsPage();

    const selectedPayout = useStore($selectedPayout);

    const payouts = useStore($payouts);

    const handleClickPayoutType = (value: string) => {
        if (value === '') {
            getPayoutsList();

            return;
        }
        getPayoutsByType(value);
    };

    const handleClickRow = (payout: Payout) => {
        $selectedPayout.set(payout);
    };

    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <>
            <head>
                <title>Заявки</title>
            </head>

            <TwoColumns>
                <StyledRoot>
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

                    <StyledTableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Заявка</StyledTableHeaderCell>
                        </StyledTableHeader>
                        <TableBody>
                            {payouts.map((item) => {
                                return (
                                    <StyledTableRow key={item.id} onClick={() => handleClickRow(item)}>
                                        <PayoutCard payout={item} />
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTableWrapper>
                </StyledRoot>
                {selectedPayout ? <PayoutPage /> : <PayoutPlug />}
            </TwoColumns>
        </>
    );
};
