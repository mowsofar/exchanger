import { Headline3, Spinner } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    CurrenciesExchangeDirection,
    Currency,
    Icon,
    Plug,
    StyledButtons,
    StyledContent,
    StyledFooter,
    StyledPaging,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './ExchangeDirectionsPage.styled';
import {
    IconChevronRight,
    IconEdit,
    IconPercent,
    IconPlus,
    IconRublePlusDollar,
    IconTrash,
} from '@salutejs/plasma-icons';
import React from 'react';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { useExchangeDirectionsPage } from './ExchangeDirectionsPage.hooks';
import { AddExchangeDirectionModal } from '../../components/ExchangeDirectionModals/AddExchangeDirectionModal';
import { $exchangeDirectionsPaged, $exchangeDirectionsTotal } from '../../stores/exchangeDirections.store';
import { DIRECTIONS_PER_PAGE, ExchangeDirection } from '../../api/types/common';
import { EditExchangeDirectionModal } from '../../components/ExchangeDirectionModals/EditExchangeDirectionModal';
import { MinMaxAmountModal } from '../../components/MinMaxAmountModal/MinMaxAmountModal';
import { formatCalculatorInput } from '../../utils/formatNumber';
import { Button } from '@salutejs/plasma-ui';
import { UpdateProfitPercentModal } from '../../components/UpdateProfitPercentModal/UpdateProfitPercentModal';
import { UpdateStatusModal } from '../../components/UpdateStatusModal/UpdateStatusModal';

export const ExchangeDirectionsPage: React.FC = () => {
    const {
        exchangeDirectionsPage,
        getExchangeDirectionsListPaged,
        handleClickPage,
        createExchangeDirectionItem,
        editExchangeDirectionItem,
        deleteExchangeDirectionItem,
        isLoading,
    } = useExchangeDirectionsPage();

    const [isAddExchangeDirectionModalOpen, setAddExchangeDirectionModalOpen] = React.useState(false);
    const [isEditExchangeDirectionModalOpen, setEditExchangeDirectionModalOpen] = React.useState(false);
    const [isUpdateProfitPercentModalOpen, setUpdateProfitPercentModalOpen] = React.useState(false);
    const [isMinMaxAmountModalOpen, setMinMaxAmountModalOpen] = React.useState(false);
    const [isStatusSettingsModalOpen, setStatusSettingsModalOpen] = React.useState(false);

    const [selectedExchangeDirection, setSelectedExchangeDirection] = React.useState<ExchangeDirection>();

    const exchangeDirectionsPaged = useStore($exchangeDirectionsPaged);
    const exchangeDirectionsTotal = useStore($exchangeDirectionsTotal);

    return (
        <>
            <head>
                <title>Направления обмена</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Направления обмена</Headline3>

                    <StyledButtons>
                        <Button
                            text="Добавить направление"
                            size="s"
                            contentLeft={<IconPlus />}
                            onClick={() => setAddExchangeDirectionModalOpen(true)}
                        />

                        <Button
                            text="Проценты обмена"
                            size="s"
                            onClick={() => setUpdateProfitPercentModalOpen(true)}
                            contentLeft={<IconPercent size="xs" />}
                        />

                        <Button
                            text="Границы обмена"
                            size="s"
                            onClick={() => setMinMaxAmountModalOpen(true)}
                            contentLeft={<IconRublePlusDollar size="xs" />}
                        />

                        <Button text="Настройка статуса" size="s" onClick={() => setStatusSettingsModalOpen(true)} />
                    </StyledButtons>

                    <TableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Направление</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Мин. сумма обмена</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Макс. сумма обмена</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Курс</StyledTableHeaderCell>
                            <StyledTableHeaderCell />
                            <StyledTableHeaderCell />
                        </StyledTableHeader>

                        {Boolean(isLoading) && (
                            <Plug>
                                <Spinner size={32} color="grey" />
                            </Plug>
                        )}

                        {!Boolean(exchangeDirectionsPaged.length) && !Boolean(isLoading) && (
                            <Plug>Нет доступных направлений обмена</Plug>
                        )}

                        {Boolean(exchangeDirectionsPaged.length) && !Boolean(isLoading) && (
                            <TableBody>
                                {exchangeDirectionsPaged.map((item) => {
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
                                                {formatCalculatorInput(item.minSourceAmount)}{' '}
                                                {item.sourceCurrency.currencyCode.code}
                                            </StyledTableCellName>
                                            <StyledTableCellName>
                                                {formatCalculatorInput(item.maxSourceAmount)}{' '}
                                                {item.sourceCurrency.currencyCode.code}
                                            </StyledTableCellName>
                                            <StyledTableCellName>
                                                {formatCalculatorInput(item.course)}
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
                                                <Button
                                                    view="clear"
                                                    onClick={() => deleteExchangeDirectionItem(item.id)}
                                                >
                                                    <IconTrash />
                                                </Button>
                                            </StyledTableCellName>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        )}
                    </TableWrapper>

                    <StyledFooter>
                        {exchangeDirectionsTotal > DIRECTIONS_PER_PAGE && (
                            <StyledPaging
                                currentPage={exchangeDirectionsPage}
                                recordsOnPage={DIRECTIONS_PER_PAGE}
                                recordsTotal={exchangeDirectionsTotal}
                                onClick={handleClickPage}
                            />
                        )}
                    </StyledFooter>
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

                <UpdateProfitPercentModal
                    opened={isUpdateProfitPercentModalOpen}
                    onClose={() => {
                        setUpdateProfitPercentModalOpen(false);
                        getExchangeDirectionsListPaged(exchangeDirectionsPage);
                    }}
                />

                <MinMaxAmountModal
                    opened={isMinMaxAmountModalOpen}
                    onClose={() => {
                        setMinMaxAmountModalOpen(false);
                        getExchangeDirectionsListPaged(exchangeDirectionsPage);
                    }}
                />

                <UpdateStatusModal
                    opened={isStatusSettingsModalOpen}
                    onClose={() => {
                        setStatusSettingsModalOpen(false);
                        getExchangeDirectionsListPaged(exchangeDirectionsPage);
                    }}
                />
            </StyledRoot>
        </>
    );
};
