import { Headline3, Modal, Select, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $exchangeDirectionsList } from '../../stores/exchangeDirections.store';
import { AdditionalField } from '../../api/types/common';
import { $currencyList } from '../../stores/currency.store';

interface EditAdditionalFieldModalProps {
    additionalField: AdditionalField;
    opened: boolean;
    onClose: () => void;
    editAdditionalField: (id: number, fieldName: string, keyId: number, status: string) => void;
}

const StyledModal = styled(Modal)`
    width: 600px;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    > div > div {
        font-weight: 550;
    }
`;

const StyledTextField = styled(TextField)`
    width: 100%;

    & label {
        font-weight: 550 !important;
    }
`;

const AdditionalFieldStatuses = [
    { value: 'ACTIVE', label: 'Включён' },
    { value: 'INACTIVE', label: 'Отключён' },
];

export const EditAdditionalFieldModal: React.FC<EditAdditionalFieldModalProps> = ({
    additionalField,
    opened,
    onClose,
    editAdditionalField,
}) => {
    const [fieldName, setFieldName] = React.useState(additionalField.fieldName);
    const [currencyId, setCurrencyId] = React.useState(additionalField.keyId);
    const [additionalFieldStatus, setAdditionalFieldStatus] = React.useState<'ACTIVE' | 'INACTIVE'>(
        additionalField.status,
    );

    const currencies = useStore($currencyList);

    const currencyOptions = currencies.map((item) => {
        return {
            value: String(item.id),
            label: `${item.paymentSystem.name} ${item.currencyCode.code}`,
        };
    });

    const handleSubmit = () => {
        if (fieldName && currencyId) {
            editAdditionalField(additionalField.id, fieldName, Number(currencyId), additionalFieldStatus);
        }
        onClose();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Редактировать дополнительное поле</Headline3>
            <Content>
                <StyledTextField
                    label="Название поля"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />

                <Select
                    label="Выберите валюту"
                    items={currencyOptions}
                    value={currencyId}
                    onChange={setCurrencyId}
                    size="l"
                />

                <Select
                    label="Статус"
                    items={AdditionalFieldStatuses}
                    value={additionalFieldStatus}
                    onChange={setAdditionalFieldStatus}
                    size="l"
                />

                <Button text="Изменить" stretch onClick={handleSubmit} onKeyDown={handleSubmit} />
            </Content>
        </StyledModal>
    );
};
