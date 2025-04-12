import { Headline3, Spinner } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    Currencies,
    Plug,
    StyledButton,
    StyledContent,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './RequisitesPage.styled';
import { IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { $requisites } from '../../stores/currency.store';
import { Requisites } from '../../api/types/common';
import { useRequisitesPage } from './RequisitesPage.hooks';
import { AddRequisitesModal } from '../../components/RequisitesModals/AddRequisitesModal';
import { EditRequisitesModal } from '../../components/RequisitesModals/EditRequisitesModal';
import { Button } from '@salutejs/plasma-ui';

export const RequisitesPage: React.FC = () => {
    const { createRequiustesItem, editRequiustesItem, deleteRequisitesItem, isLoading } = useRequisitesPage();

    const [isAddRequisitesModalOpen, setAddRequisitesModalOpen] = React.useState(false);
    const [isEditRequisitesModalOpen, setEditRequisitesModalOpen] = React.useState(false);
    const [selectedRequisites, setSelectedRequisites] = React.useState<Requisites>();

    const requisites = useStore($requisites);

    return (
        <>
            <head>
                <title>Реквизиты</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Реквизиты</Headline3>
                    <StyledButton
                        text="Добавить реквизиты"
                        size="s"
                        contentLeft={<IconPlus />}
                        onClick={() => setAddRequisitesModalOpen(true)}
                    />
                    <TableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Реквизиты</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Детали</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Валюты</StyledTableHeaderCell>
                            <StyledTableHeaderCell />
                            <StyledTableHeaderCell />
                        </StyledTableHeader>

                        {Boolean(isLoading) && (
                            <Plug>
                                <Spinner size={32} />
                            </Plug>
                        )}

                        {!Boolean(requisites.length) && !Boolean(isLoading) && <Plug>Нет доступных реквизитов</Plug>}

                        {Boolean(requisites.length) && !Boolean(isLoading) && (
                            <TableBody>
                                {requisites.map((item) => {
                                    const currencies = item?.currencies.map((currency) => currency.technicalName);

                                    const linkedCurrencies = currencies.join(', ');
                                    return (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                                {item.name}
                                            </StyledTableCellName>

                                            <StyledTableCellName>{item.details}</StyledTableCellName>

                                            <StyledTableCellName>
                                                <Currencies>{linkedCurrencies || '—'}</Currencies>
                                            </StyledTableCellName>

                                            <StyledTableCellName>
                                                <Button
                                                    view="clear"
                                                    onClick={() => {
                                                        setSelectedRequisites(item);
                                                        setEditRequisitesModalOpen(true);
                                                    }}
                                                >
                                                    <IconEdit />
                                                </Button>
                                            </StyledTableCellName>

                                            <StyledTableCellName>
                                                <Button view="clear" onClick={() => deleteRequisitesItem(item.id)}>
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

                <AddRequisitesModal
                    opened={isAddRequisitesModalOpen}
                    onClose={() => setAddRequisitesModalOpen(false)}
                    createRequisites={createRequiustesItem}
                />

                {selectedRequisites && (
                    <EditRequisitesModal
                        requisites={selectedRequisites}
                        opened={isEditRequisitesModalOpen}
                        onClose={() => {
                            setEditRequisitesModalOpen(false);
                            setSelectedRequisites(undefined);
                        }}
                        editRequisites={editRequiustesItem}
                    />
                )}
            </StyledRoot>
        </>
    );
};
