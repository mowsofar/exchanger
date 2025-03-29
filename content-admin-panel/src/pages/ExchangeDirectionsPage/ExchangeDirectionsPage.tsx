import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    CurrenciesExchangeDirection,
    Currency,
    Icon,
    StyledContent,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './ExchangeDirectionsPage.styled';
import { IconChevronRight, IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { Button } from '../../components/Button/Button.styled';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { useExchangeDirectionsPage } from './ExchangeDirectionsPage.hooks';
import { AddExchangeDirectionModal } from '../../components/ExchangeDirectionModals/AddExchangeDirectionModal';
import { $exchangeDirectionsList } from '../../stores/exchangeDirections.store';
import { ExchangeDirection } from '../../api/types/common';
import { EditExchangeDirectionModal } from '../../components/ExchangeDirectionModals/EditExchangeDirectionModal';

export const ExchangeDirectionsPage: React.FC = () => {
    const { createExchangeDirectionItem, editExchangeDirectionItem, deleteExchangeDirectionItem } =
        useExchangeDirectionsPage();

    const [isAddExchangeDirectionModalOpen, setAddExchangeDirectionModalOpen] = React.useState(false);
    const [isEditExchangeDirectionModalOpen, setEditExchangeDirectionModalOpen] = React.useState(false);
    const [selectedExchangeDirection, setSelectedExchangeDirection] = React.useState<ExchangeDirection>();

    const exchangeDirectionsList = useStore($exchangeDirectionsList);

    return (
        <>
            <head>
                <title>Направления обмена</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Направления обмена</Headline3>
                    <Button
                        text="Добавить направление"
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
                                            {item.minSourceAmount} {item.sourceCurrency.currencyCode.code}
                                        </StyledTableCellName>
                                        <StyledTableCellName>
                                            {item.maxSourceAmount} {item.sourceCurrency.currencyCode.code}
                                        </StyledTableCellName>
                                        <StyledTableCellName>
                                            <Button
                                                view="clear"
                                                onClick={() => {
                                                    setSelectedExchangeDirection(item);
                                                    setEditExchangeDirectionModalOpen(true);
                                                }}
                                            >
                                                <IconEdit />
                                            </Button>
                                        </StyledTableCellName>
                                        <StyledTableCellName>
                                            <Button view="clear" onClick={() => deleteExchangeDirectionItem(item.id)}>
                                                <IconTrash />
                                            </Button>
                                        </StyledTableCellName>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </TableWrapper>
                </StyledContent>

                <AddExchangeDirectionModal
                    opened={isAddExchangeDirectionModalOpen}
                    onClose={() => setAddExchangeDirectionModalOpen(false)}
                    createExchangeDirection={createExchangeDirectionItem}
                />

                {selectedExchangeDirection && (
                    <EditExchangeDirectionModal
                        exchangeDirection={selectedExchangeDirection}
                        opened={isEditExchangeDirectionModalOpen}
                        onClose={() => {
                            setEditExchangeDirectionModalOpen(false);
                            setSelectedExchangeDirection(undefined);
                        }}
                        editExchangeDirectionItem={editExchangeDirectionItem}
                    />
                )}
            </StyledRoot>
        </>
    );
};
