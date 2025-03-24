import { Headline3, Modal, Select, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { numerize } from '../../utils/numerize';
import { AdditionalFieldDirections } from '../../api/types/common';

interface AddAdditionalFieldModalProps {
    opened: boolean;
    onClose: () => void;
    createAdditionalField: (
        fieldName: string,
        status: string,
        direction: AdditionalFieldDirections,
        currencyIds: number[],
    ) => void;
}

const StyledModal = styled(Modal)`
    width: 500px;
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

const AdditionalFieldTypes = [
    { value: 'SOURCE', label: 'Для отправителя' },
    { value: 'TARGET', label: 'Для получателя' },
];

export const AddAdditionalFieldModal: React.FC<AddAdditionalFieldModalProps> = ({
    opened,
    onClose,
    createAdditionalField,
}) => {
    const [fieldName, setFieldName] = React.useState('');
    const [currencyIds, setCurrencyIds] = React.useState<string[]>();
    const [additionalFieldType, setAdditionalFieldType] = React.useState();

    const currencies = useStore($currencyList);

    const currencyOptions = currencies.map((item) => {
        return {
            value: String(item.id),
            label: `${item.paymentSystem.name} ${item.currencyCode.code}`,
        };
    });

    const onCloseModal = () => {
        setFieldName('');
        setCurrencyIds([]);
        setAdditionalFieldType(undefined);
        onClose();
    };

    const handleSubmit = () => {
        if (fieldName && currencyIds?.length && additionalFieldType) {
            createAdditionalField(fieldName, 'ACTIVE', additionalFieldType, numerize(currencyIds));
        }

        onCloseModal();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Добавить дополнительное поле</Headline3>
            <Content>
                <StyledTextField
                    label="Название поля"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />

                <Select
                    label="Выберите валюту"
                    multiselect
                    items={currencyOptions}
                    value={currencyIds}
                    onChange={setCurrencyIds}
                    size="l"
                />

                <Select
                    label="Тип поля"
                    items={AdditionalFieldTypes}
                    value={additionalFieldType}
                    onChange={setAdditionalFieldType}
                    size="l"
                />

                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    onKeyDown={handleSubmit}
                    disabled={!fieldName || !currencyIds?.length || !additionalFieldType}
                />
            </Content>
        </StyledModal>
    );
};
