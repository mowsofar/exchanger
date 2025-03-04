import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableHeaderCell, TableBody } from '../../components/Table/Table';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { usePayoutsPage } from './PayoutsPage.hooks';
import {
    StyledButton,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
    StyledTableWrapper,
    TwoColumns,
} from './PayoutsPage.styled';
import { Payout } from '../../api/types/common';
import { useStore } from '@nanostores/react';
import { $payouts, $selectedPayout } from '../../stores/payout.store';
import { PayoutCard } from '../../components/PayoutCard/PayoutCard';
import { PayoutPage } from '../PayoutPage/PayoutPage';

export const PayoutsPage: React.FC = () => {
    usePayoutsPage();

    const selectedPayout = useStore($selectedPayout);

    console.log(selectedPayout);

    const payouts = useStore($payouts);

    const handleClickRow = (payout: Payout) => {
        $selectedPayout.set(payout);
    };

    return (
        <TwoColumns>
            <StyledRoot>
                <Headline3>Заявки</Headline3>
                <StyledButton view="secondary" text="Обновить список" contentLeft={<IconRotateCcw />} />

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
            {selectedPayout && <PayoutPage />}
        </TwoColumns>
    );
};
