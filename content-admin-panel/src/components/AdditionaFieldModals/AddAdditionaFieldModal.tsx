import { Headline3, Modal } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { numerize } from '../../utils/numerize';
import { AdditionalFieldDirections } from '../../api/types/common';
import { TextFieldGrey } from '../TextField/TextField';
import { Select } from '../Select/Select';

interface AddAdditionalFieldModalProps {
    opened: boolean;
    onClose: () => void;
    createAdditionalField: (
        fieldName: string,
        nameIdentify: string,
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
    row-gap: 20px;
`;

const StyledTextField = styled(TextFieldGrey)`
    width: 100%;
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
    const [identifier, setIdentifier] = React.useState('');
    const [currencyIds, setCurrencyIds] = React.useState<string[]>();
    const [additionalFieldType, setAdditionalFieldType] = React.useState<'SOURCE' | 'TARGET'>();

    const currencies = useStore($currencyList);

    const currencyOptions = currencies.map((item) => {
        return {
            value: String(item.id),
            label: `${item.paymentSystem.name} ${item.currencyCode.code}`,
        };
    });

    const onCloseModal = () => {
        setFieldName('');
        setIdentifier('');
        setCurrencyIds([]);
        setAdditionalFieldType(undefined);
        onClose();
    };

    const handleSubmit = () => {
        if (fieldName && currencyIds?.length && additionalFieldType) {
            createAdditionalField(fieldName, identifier, 'ACTIVE', additionalFieldType, numerize(currencyIds));
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

                <StyledTextField
                    label="Идентификатор"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />

                <Select
                    label="Выберите валюту"
                    multiselect
                    items={currencyOptions}
                    value={currencyIds}
                    onChange={(value) => setCurrencyIds(value as string[])}
                    size="l"
                />

                <Select
                    label="Тип поля"
                    items={AdditionalFieldTypes}
                    value={additionalFieldType}
                    onChange={(value) => setAdditionalFieldType(value as 'SOURCE' | 'TARGET')}
                    size="l"
                />

                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    onKeyDown={handleSubmit}
                    disabled={!fieldName || !identifier || !currencyIds?.length || !additionalFieldType}
                />
            </Content>
        </StyledModal>
    );
};
