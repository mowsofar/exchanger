import { Headline3, Modal } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyList } from '../../stores/currency.store';
import { numerize } from '../../utils/numerize';
import { TextFieldGrey } from '../TextField/TextField';
import { Select } from '../Select/Select';

interface AddRequisitesModalProps {
    opened: boolean;
    onClose: () => void;
    createRequisites: (name: string, details: string, currencyIds: number[]) => void;
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

const StyledTextField = styled(TextFieldGrey)`
    width: 100%;

    & label {
        font-weight: 550 !important;
    }
`;
export const AddRequisitesModal: React.FC<AddRequisitesModalProps> = ({ opened, onClose, createRequisites }) => {
    const [name, setName] = React.useState('');
    const [currencyIds, setCurrencyIds] = React.useState<string[]>();
    const [details, setDetails] = React.useState('');

    const currencies = useStore($currencyList);

    const currencyOptions = currencies.map((item) => {
        return {
            value: String(item.id),
            label: `${item.paymentSystem.name} ${item.currencyCode.code}`,
        };
    });

    const onCloseModal = () => {
        setName('');
        setCurrencyIds([]);
        setDetails('');
        onClose();
    };

    const handleSubmit = () => {
        if (name && currencyIds?.length && details) {
            createRequisites(name, details, numerize(currencyIds));
        }

        onCloseModal();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Добавить реквизиты</Headline3>
            <Content>
                <StyledTextField label="Название реквизитов" value={name} onChange={(e) => setName(e.target.value)} />

                <StyledTextField label="Детали" value={details} onChange={(e) => setDetails(e.target.value)} />

                <Select
                    label="Выберите валюту"
                    multiselect
                    items={currencyOptions}
                    value={currencyIds}
                    onChange={(value) => setCurrencyIds(value as string[])}
                    size="l"
                />

                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    onKeyDown={handleSubmit}
                    disabled={!name || !currencyIds?.length || !details}
                />
            </Content>
        </StyledModal>
    );
};
