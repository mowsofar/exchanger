import { Headline3, Spinner } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import {
    Currencies,
    Header,
    Plug,
    Select,
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
import { $additionalFields, $additionalFieldsTyped } from '../../stores/currency.store';
import { AddAdditionalFieldModal } from '../../components/AdditionaFieldModals/AddAdditionaFieldModal';
import { AdditionalFieldDirection, AdditionalFieldTypeValues } from '../../api/types/common';
import { EditAdditionalFieldModal } from '../../components/AdditionaFieldModals/EditAdditionalFieldModal';
import { Button } from '@salutejs/plasma-ui';
import { useSearchParams } from 'react-router-dom';

export const AdditionalFieldsPage: React.FC = () => {
    const {
        createAdditionalFieldItem,
        editAdditionalFieldItem,
        deleteAdditionalFieldItem,
        getAdditionalFieldsList,
        getAdditionalFieldsListByType,
        isLoading,
    } = useAdditionalFieldsPage();

    const [isAddAdditionaFieldModalOpen, setAddAdditionaFieldModalOpen] = React.useState(false);
    const [isEditAdditionaFieldModalOpen, setEditAdditionaFieldModalOpen] = React.useState(false);
    const [selectedAdditionalField, setSelectedAdditionalField] = React.useState<AdditionalFieldDirection>();
    const [searchParams, setSearchParams] = useSearchParams();

    const additionalFields = useStore($additionalFields);
    const additionalFieldsTyped = useStore($additionalFieldsTyped);

    const initialStatus = new URLSearchParams(window.location.search).get('status');

    const additionalFieldsList = React.useMemo(() => {
        if (initialStatus) {
            return additionalFieldsTyped;
        } else {
            return additionalFields?.source?.concat(additionalFields?.target);
        }
    }, [additionalFields?.source, additionalFields?.target, additionalFieldsTyped, initialStatus]);

    const onFieldTypeChange = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (value === '') {
            newSearchParams.delete('status');
            getAdditionalFieldsList();
        } else {
            newSearchParams.set('status', value);
            getAdditionalFieldsListByType(value);
        }

        setSearchParams(newSearchParams);
    };

    return (
        <>
            <head>
                <title>Дополнительные поля валют</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Дополнительные поля валют</Headline3>

                    <Header>
                        <StyledButton
                            text="Добавить поле"
                            size="s"
                            contentLeft={<IconPlus />}
                            onClick={() => setAddAdditionaFieldModalOpen(true)}
                        />

                        <Select
                            placeholder="Тип поля"
                            size="l"
                            value={initialStatus}
                            items={AdditionalFieldTypeValues}
                            onChange={(value) => onFieldTypeChange(value as string)}
                        />
                    </Header>

                    <TableWrapper>
                        <StyledTableHeader>
                            <StyledTableHeaderCell>Название поля</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Валюта</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Тип</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Статус</StyledTableHeaderCell>
                            <StyledTableHeaderCell />
                        </StyledTableHeader>

                        {Boolean(isLoading) && (
                            <Plug>
                                <Spinner size={32} color="grey" />
                            </Plug>
                        )}

                        {!Boolean(additionalFieldsList.length) && !Boolean(isLoading) && (
                            <Plug>Нет доступных дополнительных полей</Plug>
                        )}

                        {Boolean(additionalFieldsList.length) && !Boolean(isLoading) && (
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
                        )}
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
