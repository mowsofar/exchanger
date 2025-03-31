import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    Currencies,
    StyledBadge,
    StyledButton,
    StyledContent,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './AdditionalFieldsPage.styled';
import { IconEdit, IconPlus, IconTrash } from '@salutejs/plasma-icons';
import React from 'react';
import { useStore } from '@nanostores/react';
import { accent } from '@salutejs/plasma-tokens';
import { useAdditionalFieldsPage } from './AdditionalFieldsPage.hooks';
import { $additionalFields } from '../../stores/currency.store';
import { AddAdditionalFieldModal } from '../../components/AdditionaFieldModals/AddAdditionaFieldModal';
import { AdditionalFieldDirection } from '../../api/types/common';
import { EditAdditionalFieldModal } from '../../components/AdditionaFieldModals/EditAdditionalFieldModal';
import { Button } from '@salutejs/plasma-ui';

export const AdditionalFieldsPage: React.FC = () => {
    const { createAdditionalFieldItem, editAdditionalFieldItem, deleteAdditionalFieldItem } = useAdditionalFieldsPage();

    const [isAddAdditionaFieldModalOpen, setAddAdditionaFieldModalOpen] = React.useState(false);
    const [isEditAdditionaFieldModalOpen, setEditAdditionaFieldModalOpen] = React.useState(false);
    const [selectedAdditionalField, setSelectedAdditionalField] = React.useState<AdditionalFieldDirection>();

    const additionalFields = useStore($additionalFields);

    const additionalFieldsList = additionalFields.source.concat(additionalFields.target);
    return (
        <>
            <head>
                <title>Дополнительные поля валют</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Дополнительные поля валют</Headline3>
                    <StyledButton
                        text="Добавить поле"
                        size="s"
                        contentLeft={<IconPlus />}
                        onClick={() => setAddAdditionaFieldModalOpen(true)}
                    />
                    <TableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Название поля</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Валюта</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Тип</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
                            <StyledTableHeaderCell />
                        </StyledTableHeader>
                        <TableBody>
                            {additionalFieldsList.map((item) => {
                                const currencies = item?.currencies.map((currency) => currency.technicalName);

                                const linkedCurrencies = currencies.join(', ');
                                return (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCellName color={accent} style={{ fontWeight: '550' }}>
                                            {item.fieldName}
                                        </StyledTableCellName>

                                        <StyledTableCellName title={linkedCurrencies}>
                                            <Currencies>{linkedCurrencies || '—'}</Currencies>
                                        </StyledTableCellName>

                                        <StyledTableCellName>
                                            <div>
                                                {item.direction === 'TARGET' ? 'Для получателя' : 'Для отправителя'}
                                            </div>
                                        </StyledTableCellName>

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
                            onClose={() => {
                                setEditAdditionaFieldModalOpen(false);
                                setSelectedAdditionalField(undefined);
                            }}
                            editAdditionalField={editAdditionalFieldItem}
                        />
                    )}
                </StyledContent>
            </StyledRoot>
        </>
    );
};
