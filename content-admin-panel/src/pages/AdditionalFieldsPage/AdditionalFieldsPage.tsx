import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { StyledBadge, StyledRoot, StyledTableHeader, StyledTableRow } from './AdditionalFieldsPage.styled';
import { IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { Button } from '../../components/Button/Button.styled';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { useAdditionalFieldsPage } from './AdditionalFieldsPage.hooks';
import { $additionalFields } from '../../stores/currency.store';
import { AddAdditionalFieldModal } from '../../components/AdditionaFieldModals/AddAdditionaFieldModal';
import { AdditionalField } from '../../api/types/common';
import { EditAdditionalFieldModal } from '../../components/AdditionaFieldModals/EditAdditionalFieldModal';

export const AdditionalFieldsPage: React.FC = () => {
    const { createAdditionalFieldItem, editAdditionalFieldItem, deleteAdditionalFieldItem } = useAdditionalFieldsPage();

    const [isAddAdditionaFieldModalOpen, setAddAdditionaFieldModalOpen] = React.useState(false);
    const [isEditAdditionaFieldModalOpen, setEditAdditionaFieldModalOpen] = React.useState(false);
    const [selectedAdditionalField, setSelectedAdditionalField] = React.useState<AdditionalField>();

    const additionalFields = useStore($additionalFields);

    return (
        <>
            <head>
                <title>Дополнительные поля валют</title>
            </head>

            <StyledRoot>
                <Headline3>Дополнительные поля валют</Headline3>
                <Button
                    text="Добавить поле"
                    size="s"
                    contentLeft={<IconPlus color="white" />}
                    onClick={() => setAddAdditionaFieldModalOpen(true)}
                />
                <TableWrapper>
                    <StyledTableHeader>
                        <StyledTableHeaderCell>Название поля</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Валюта</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
                        <StyledTableHeaderCell />
                    </StyledTableHeader>
                    <TableBody>
                        {additionalFields.map((item) => {
                            return (
                                <StyledTableRow key={item.id}>
                                    <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                        {item.fieldName}
                                    </StyledTableCellName>
                                    <StyledTableCellName>{item.currencyIds}</StyledTableCellName>
                                    <StyledTableCellName>
                                        <StyledBadge
                                            size="xs"
                                            view={item.status === 'ACTIVE' ? 'positive' : 'negative'}
                                        >
                                            {item.status === 'ACTIVE' ? 'Включён' : 'Отключён'}
                                        </StyledBadge>
                                    </StyledTableCellName>
                                    <StyledTableCellName>
                                        <Button
                                            view="clear"
                                            onClick={() => {
                                                setSelectedAdditionalField(item);
                                                setEditAdditionaFieldModalOpen(true);
                                            }}
                                        >
                                            <IconEdit />
                                        </Button>
                                    </StyledTableCellName>
                                    <StyledTableCellName>
                                        <Button view="clear" onClick={() => deleteAdditionalFieldItem(item.id)}>
                                            <IconTrash />
                                        </Button>
                                    </StyledTableCellName>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </TableWrapper>

                <AddAdditionalFieldModal
                    opened={isAddAdditionaFieldModalOpen}
                    onClose={() => setAddAdditionaFieldModalOpen(false)}
                    createAdditionalField={createAdditionalFieldItem}
                />

                {selectedAdditionalField && (
                    <EditAdditionalFieldModal
                        additionalField={selectedAdditionalField}
                        opened={isEditAdditionaFieldModalOpen}
                        onClose={() => setEditAdditionaFieldModalOpen(false)}
                        editAdditionalField={editAdditionalFieldItem}
                    />
                )}
            </StyledRoot>
        </>
    );
};
