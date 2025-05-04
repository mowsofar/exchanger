import { Headline3, Spinner } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    CurrenciesExchangeDirection,
    Currency,
    Icon,
    Plug,
    StyledBadge,
    StyledButton,
    StyledContent,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './AutobrokerPage.styled';
import { IconChevronRight, IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { $autobrokers } from '../../stores/currency.store';
import { Autobroker } from '../../api/types/common';
import { useAutobrokerPage } from './AutobrokerPage.hooks';
import { Button } from '@salutejs/plasma-ui';
import { AddAutobrokerModal } from '../../components/AutobrokerModals/AddAutobrokerModal';
import { $exchangeDirections } from '../../stores/exchangeDirections.store';
import { EditAutobrokerModal } from '../../components/AutobrokerModals/EditAutobrokerModal';

export const AutobrokerPage: React.FC = () => {
    const { createAutobrokerItem, editAutobrokerItem, deleteAutobrokerItem, isLoading } = useAutobrokerPage();

    const [isAddAutobrokerModalOpen, setAddAutobrokerModalOpen] = React.useState(false);
    const [isEditAutobrokerModalOpen, setEditAutobrokerModalOpen] = React.useState(false);
    const [selectedAutobroker, setSelectedAutobroker] = React.useState<Autobroker>();

    const autobrokers = useStore($autobrokers);
    const exchangeDirections = useStore($exchangeDirections);

    return (
        <>
            <head>
                <title>Autobroker</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Autobroker</Headline3>
                    <StyledButton
                        text="Добавить автоброкер"
                        size="s"
                        contentLeft={<IconPlus />}
                        onClick={() => setAddAutobrokerModalOpen(true)}
                    />
                    <TableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Направление</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Минимальный курс</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Приоритет</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Курс</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
                            <StyledTableHeaderCell />
                            <StyledTableHeaderCell />
                        </StyledTableHeader>

                        {Boolean(isLoading) && (
                            <Plug>
                                <Spinner size={32} color="grey" />
                            </Plug>
                        )}

                        {!Boolean(autobrokers.length) && !Boolean(isLoading) && <Plug>Нет данных</Plug>}

                        {Boolean(autobrokers.length) && !Boolean(isLoading) && (
                            <TableBody>
                                {autobrokers.map((item) => {
                                    const exchangeDirection = exchangeDirections.find(
                                        (direction) => direction.id === item.exchangeDirectionId,
                                    );

                                    return (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                                <CurrenciesExchangeDirection>
                                                    <Currency>
                                                        <Icon
                                                            src={
                                                                exchangeDirection?.sourceCurrency.paymentSystem
                                                                    .imagePath
                                                            }
                                                        />{' '}
                                                        {exchangeDirection?.sourceCurrency.paymentSystem.name}{' '}
                                                        {exchangeDirection?.sourceCurrency.currencyCode.code}
                                                    </Currency>
                                                    <IconChevronRight size="xs" color={accent} />
                                                    <Currency>
                                                        <Icon
                                                            src={
                                                                exchangeDirection?.targetCurrency.paymentSystem
                                                                    .imagePath
                                                            }
                                                        />{' '}
                                                        {exchangeDirection?.targetCurrency.paymentSystem.name}{' '}
                                                        {exchangeDirection?.targetCurrency.currencyCode.code}
                                                    </Currency>
                                                </CurrenciesExchangeDirection>
                                            </StyledTableCellName>

                                            <StyledTableCellName>{item.minCourse}</StyledTableCellName>

                                            <StyledTableCellName>{item.position}</StyledTableCellName>

                                            <StyledTableCellName>{item.courseResponse.course}</StyledTableCellName>

                                            <StyledTableCellName>
                                                {' '}
                                                <StyledBadge
                                                    size="xs"
                                                    view={item.status === 'ACTIVE' ? 'positive' : 'negative'}
                                                >
                                                    {item.status === 'ACTIVE' ? 'Активный' : 'Не активный'}
                                                </StyledBadge>
                                            </StyledTableCellName>

                                            <StyledTableCellName>
                                                <Button
                                                    view="clear"
                                                    onClick={() => {
                                                        setSelectedAutobroker(item);
                                                        setEditAutobrokerModalOpen(true);
                                                    }}
                                                >
                                                    <IconEdit />
                                                </Button>
                                            </StyledTableCellName>

                                            <StyledTableCellName>
                                                <Button view="clear" onClick={() => deleteAutobrokerItem(item.id)}>
                                                    <IconTrash />
                                                </Button>
                                            </StyledTableCellName>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        )}
                    </TableWrapper>
                </StyledContent>

                <AddAutobrokerModal
                    opened={isAddAutobrokerModalOpen}
                    onClose={() => setAddAutobrokerModalOpen(false)}
                    createAutobroker={createAutobrokerItem}
                />

                {selectedAutobroker && (
                    <EditAutobrokerModal
                        opened={isEditAutobrokerModalOpen}
                        editAutobroker={editAutobrokerItem}
                        onClose={() => setEditAutobrokerModalOpen(false)}
                        selectedAutobroker={selectedAutobroker}
                    />
                )}
            </StyledRoot>
        </>
    );
};
