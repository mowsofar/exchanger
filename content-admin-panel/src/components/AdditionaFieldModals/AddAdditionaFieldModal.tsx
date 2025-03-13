import { Headline3, Modal, Select, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';

interface AddAdditionalFieldModalProps {
    opened: boolean;
    onClose: () => void;
    createAdditionalField: (fieldName: string, keyId: number, status: string, currencyIds: number[]) => void;
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

export const AddAdditionalFieldModal: React.FC<AddAdditionalFieldModalProps> = ({
    opened,
    onClose,
    createAdditionalField,
}) => {
    const [fieldName, setFieldName] = React.useState('');
    const [currencyIds, setCurrencyIds] = React.useState<number[]>();

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
        onClose();
    };

    const handleSubmit = () => {
        if (fieldName && currencyIds?.length) {
            const numericCurrencyIds = currencyIds.map((currecy) => Number(currecy));
            createAdditionalField(fieldName, 21, 'ACTIVE', numericCurrencyIds);
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

                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    onKeyDown={handleSubmit}
                    disabled={!fieldName || !currencyIds?.length}
                />
            </Content>
        </StyledModal>
    );
};
