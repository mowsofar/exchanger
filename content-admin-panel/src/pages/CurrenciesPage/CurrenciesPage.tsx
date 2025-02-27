import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { StyledImg, StyledRoot, StyledTableHeader, StyledTableRow } from './CurrenciesPage.styled';
import { IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { Button } from '../../components/Button/Button.styled';
import { AddCurrencyModal } from '../../components/AddCurrencyModal/AddCurrencyModal';
import { useCurrenciesPage } from './CurrenciesPage.hooks';
import { useStore } from '@nanostores/react';
import { $currencyList, $selectedCurrency } from '../../stores/currency.store';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { Currency } from '../../api/types/common';
import { accent } from '@salutejs/plasma-tokens';

export const CurrenciesPage: React.FC = () => {
    const { createCurrencyItem } = useCurrenciesPage();
    const navigate = useNavigate();

    const [isAddCurrencyModalOpen, setAddCurrencyModalOpen] = React.useState(false);

    const currencyList = useStore($currencyList);

    const hanleClickEditButton = (item: Currency) => {
        $selectedCurrency.set(item);
        navigate(ROUTES.currencyGenerals(item.id));
    };

    return (
        <StyledRoot>
            <Headline3>Список валют</Headline3>
            <Button
                contentLeft={<IconPlus color="white" />}
                view="accent"
                size="s"
                text="Добавить валюту"
                onClick={() => setAddCurrencyModalOpen((state) => !state)}
            />
            <TableWrapper>
                <StyledTableHeader>
                    <StyledTableHeaderCell />
                    <StyledTableHeaderCell>Платёжная система</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Код валюты</StyledTableHeaderCell>
                    <StyledTableHeaderCell>XML-код</StyledTableHeaderCell>
                    <StyledTableHeaderCell />
                    <StyledTableHeaderCell />
                </StyledTableHeader>
                <TableBody>
                    {currencyList.map((item) => {
                        return (
                            <StyledTableRow key={item.id}>
                                <StyledTableCellName>
                                    <StyledImg src={item.paymentSystem.imagePath} />
                                </StyledTableCellName>
                                <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                    {item.paymentSystem.name}
                                </StyledTableCellName>
                                <StyledTableCellName>{item.currencyCode.code}</StyledTableCellName>
                                <StyledTableCellName>{item.xmlCode}</StyledTableCellName>
                                <StyledTableCellName>
                                    <Button view="clear" onClick={() => hanleClickEditButton(item)}>
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

            <AddCurrencyModal
                opened={isAddCurrencyModalOpen}
                onClose={() => setAddCurrencyModalOpen(false)}
                createCurrency={createCurrencyItem}
            />
        </StyledRoot>
    );
};
