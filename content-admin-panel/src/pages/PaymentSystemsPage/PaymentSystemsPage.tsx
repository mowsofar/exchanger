import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { StyledImg, StyledRoot, StyledTableHeader, StyledTableRow } from './PaymentSystemsPage.styled';
import { Button } from '../../components/Button/Button.styled';
import { IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { useStore } from '@nanostores/react';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';
import { usePaymentSystemsPage } from './PaymentSystemsPage.hooks';
import { AddPaymentSystemModal } from '../../components/PaymentSystemModals/AddPaymentSystemModal';
import { accent } from '@salutejs/plasma-tokens';
import { EditPaymentSystemModal } from '../../components/PaymentSystemModals/EditPaymentSystemModal';
import { PaymentSystem } from '../../api/types/common';

export const PaymentSystemsPage: React.FC = () => {
    const { createPaymentSystemItem, deletePaymentSystemItem, editPaymentSystemItem } = usePaymentSystemsPage();

    const paymentSystems = useStore($paymentSystemsList);

    const [isAddPaymentSystemModalOpen, setAddPaymentSystemModalOpen] = React.useState(false);
    const [isEditPaymentSystemModalOpen, setEditPaymentSystemModalOpen] = React.useState(false);
    const [selectedPaymentSystem, setSelectedPaymentSystem] = React.useState<PaymentSystem | null>(null);

    const handleEditButtonClick = (paymentSystem: PaymentSystem) => {
        setSelectedPaymentSystem(paymentSystem);
        setEditPaymentSystemModalOpen(true);
    };

    return (
        <>
            <head>
                <title>Платёжные системы</title>
            </head>

            <StyledRoot>
                <Headline3>Список платёжных систем</Headline3>
                <Button
                    text="Добавить платёжную систему"
                    size="s"
                    contentLeft={<IconPlus color="white" />}
                    onClick={() => setAddPaymentSystemModalOpen((state) => !state)}
                />
                <TableWrapper>
                    <StyledTableHeader>
                        <StyledTableHeaderCell />
                        <StyledTableHeaderCell>Название</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Дата обновления</StyledTableHeaderCell>
                    </StyledTableHeader>
                    <TableBody>
                        {paymentSystems.map((item) => {
                            const lastSeenText = new Date(item.updatedAt).toLocaleString();

                            return (
                                <StyledTableRow key={item.id}>
                                    <StyledTableCellName>
                                        <StyledImg src={item.imagePath} alt="" />
                                    </StyledTableCellName>
                                    <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                        {item.name}
                                    </StyledTableCellName>
                                    <StyledTableCellName isSecondary>{lastSeenText}</StyledTableCellName>
                                    <StyledTableCellName>
                                        <Button view="clear" onClick={() => handleEditButtonClick(item)}>
                                            <IconEdit />
                                        </Button>
                                    </StyledTableCellName>
                                    <StyledTableCellName>
                                        <Button view="clear" onClick={() => deletePaymentSystemItem(item.id)}>
                                            <IconTrash />
                                        </Button>
                                    </StyledTableCellName>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </TableWrapper>

                <AddPaymentSystemModal
                    opened={isAddPaymentSystemModalOpen}
                    createPaymentSystem={createPaymentSystemItem}
                    onClose={() => setAddPaymentSystemModalOpen(false)}
                />

                {selectedPaymentSystem && (
                    <EditPaymentSystemModal
                        opened={isEditPaymentSystemModalOpen}
                        paymentSystem={selectedPaymentSystem}
                        editPaymentSystem={editPaymentSystemItem}
                        onClose={() => {
                            setEditPaymentSystemModalOpen(false);
                            setSelectedPaymentSystem(null);
                        }}
                    />
                )}
            </StyledRoot>
        </>
    );
};
