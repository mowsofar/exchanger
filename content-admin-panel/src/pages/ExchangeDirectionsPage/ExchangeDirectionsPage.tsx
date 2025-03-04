import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    CurrenciesExchangeDirection,
    Currency,
    Icon,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './ExchangeDirectionsPage.styled';
import { IconArrowRight, IconChevronRight, IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { Button } from '../../components/Button/Button.styled';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { useExchangeDirectionsPage } from './ExchangeDirectionsPage.hooks';
import { AddExchangeDirectionModal } from '../../components/AddExchangeDirectionModal/AddExchangeDirectionModal';
import { $exchangeDirectionsList } from '../../stores/exchangeDirections.store';

export const ExchangeDirectionsPage: React.FC = () => {
    const { createExchangeDirectionItem } = useExchangeDirectionsPage();

    const [isAddExchangeDirectionModalOpen, setAddExchangeDirectionModalOpen] = React.useState(false);

    const exchangeDirectionsList = useStore($exchangeDirectionsList);

    return (
        <StyledRoot>
            <Headline3>Направления обмена</Headline3>
            <Button
                text="Добавить направление"
                view="accent"
                size="s"
                contentLeft={<IconPlus color="white" />}
                onClick={() => setAddExchangeDirectionModalOpen(true)}
            />
            <TableWrapper>
                <StyledTableHeader>
                    <StyledTableHeaderCell>Направление</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Мин. сумма обмена</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Макс. сумма обмена</StyledTableHeaderCell>
                    <StyledTableHeaderCell />
                    <StyledTableHeaderCell />
                </StyledTableHeader>
                <TableBody>
                    {exchangeDirectionsList.map((item) => {
                        return (
                            <StyledTableRow key={item.id}>
                                <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                    <CurrenciesExchangeDirection>
                                        <Currency>
                                            <Icon src={item.sourceCurrency.paymentSystem.imagePath} />{' '}
                                            {item.sourceCurrency.paymentSystem.name}{' '}
                                            {item.sourceCurrency.currencyCode.code}
                                        </Currency>
                                        <IconChevronRight size="xs" color={accent} />
                                        <Currency>
                                            <Icon src={item.targetCurrency.paymentSystem.imagePath} />{' '}
                                            {item.targetCurrency.paymentSystem.name}{' '}
                                            {item.targetCurrency.currencyCode.code}
                                        </Currency>
                                    </CurrenciesExchangeDirection>
                                </StyledTableCellName>
                                <StyledTableCellName>
                                    {item.minSourceAmount.toLocaleString().replace(/,/g, ' ')}{' '}
                                    {item.sourceCurrency.currencyCode.code}
                                </StyledTableCellName>
                                <StyledTableCellName>
                                    {item.maxSourceAmount.toLocaleString().replace(/,/g, ' ')}{' '}
                                    {item.sourceCurrency.currencyCode.code}
                                </StyledTableCellName>
                                <StyledTableCellName>
                                    <Button view="clear">
                                        <IconEdit />
                                    </Button>
                                </StyledTableCellName>
                                <StyledTableCellName>
                                    <Button view="clear">
                                        <IconTrash />
                                    </Button>
                                </StyledTableCellName>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </TableWrapper>

            <AddExchangeDirectionModal
                opened={isAddExchangeDirectionModalOpen}
                onClose={() => setAddExchangeDirectionModalOpen(false)}
                createExchangeDirection={createExchangeDirectionItem}
            />
        </StyledRoot>
    );
};
