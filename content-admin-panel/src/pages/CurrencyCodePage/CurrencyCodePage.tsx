import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { StyledButton, StyledContent, StyledRoot, StyledTableHeader, StyledTableRow } from './CurrencyCodePage.styled';
import { IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { AddCurrencyCodeModal } from '../../components/CurrencyCodeModals/AddCurrencyCodeModal';
import { useStore } from '@nanostores/react';
import { $currencyCodeList } from '../../stores/currencyCode.store';
import { useCurrencyCodePage } from './CurrencyCodePage.hooks';
import { accent } from '@salutejs/plasma-tokens';
import { CurrencyCode } from '../../api/types/common';
import { EditCurrencyCodeModal } from '../../components/CurrencyCodeModals/EditCurrencyCodeModal';
import { Button } from '@salutejs/plasma-ui';

export const CurrencyCodePage: React.FC = () => {
    const { createCurrencyCodeItem, deleteCurrencyCodeItem, editCurrencyCodeItem } = useCurrencyCodePage();

    const [isAddCurrencyCodeModalOpen, setAddCurrencyCodeModalOpen] = React.useState(false);
    const [isEditCurrencyCodeModalOpen, setEditCurrencyCodeModalOpen] = React.useState(false);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = React.useState<CurrencyCode>();

    const currencyCodeList = useStore($currencyCodeList);

    const handleDeleteCurrencyCode = (id: number) => {
        deleteCurrencyCodeItem(id);
    };

    return (
        <>
            <head>
                <title>Коды валюты</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Коды валют</Headline3>
                    <StyledButton
                        text="Добавить код валюты"
                        size="s"
                        contentLeft={<IconPlus />}
                        onClick={() => setAddCurrencyCodeModalOpen((state) => !state)}
                    />
                    <TableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Код валюты</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Символ</StyledTableHeaderCell>
                        </StyledTableHeader>
                        <TableBody>
                            {currencyCodeList.map((item) => {
                                return (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                            {item.code}
                                        </StyledTableCellName>
                                        <StyledTableCellName>{item.symbol}</StyledTableCellName>
                                        <StyledTableCellName>
                                            <Button
                                                view="clear"
                                                onClick={() => {
                                                    setSelectedCurrencyCode(item);
                                                    setEditCurrencyCodeModalOpen(true);
                                                }}
                                            >
                                                <IconEdit color={accent} />
                                            </Button>
                                        </StyledTableCellName>
                                        <StyledTableCellName>
                                            <Button view="clear" onClick={() => handleDeleteCurrencyCode(item.id)}>
                                                <IconTrash />
                                            </Button>
                                        </StyledTableCellName>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </TableWrapper>
                </StyledContent>

                <AddCurrencyCodeModal
                    opened={isAddCurrencyCodeModalOpen}
                    onClose={() => setAddCurrencyCodeModalOpen(false)}
                    createCurrencyCode={createCurrencyCodeItem}
                />

                {selectedCurrencyCode && (
                    <EditCurrencyCodeModal
                        opened={isEditCurrencyCodeModalOpen}
                        onClose={() => {
                            setEditCurrencyCodeModalOpen(false);
                            setSelectedCurrencyCode(undefined);
                        }}
                        selectedCurrencyCode={selectedCurrencyCode}
                        editCurrencyCode={editCurrencyCodeItem}
                    />
                )}
            </StyledRoot>
        </>
    );
};
