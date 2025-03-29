import { Headline3, Modal, Select, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { Requisites } from '../../api/types/common';
import { $currencyList } from '../../stores/currency.store';
import { numerize } from '../../utils/numerize';

interface EditRequisitesModalProps {
    requisites: Requisites;
    opened: boolean;
    onClose: () => void;
    editRequisites: (id: number, name: string, details: string, currencyIds: number[]) => void;
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

export const EditRequisitesModal: React.FC<EditRequisitesModalProps> = ({
    requisites,
    opened,
    onClose,
    editRequisites,
}) => {
    const currencyIdsInitial = requisites.currencies.map((currency) => String(currency.id));

    const [name, setName] = React.useState(requisites.name);
    const [currencyIds, setCurrencyIds] = React.useState(currencyIdsInitial);
    const [details, setDetails] = React.useState<string>(requisites.details);

    const currencies = useStore($currencyList);

    const currencyOptions = currencies.map((item) => {
        return {
            value: String(item.id),
            label: `${item.paymentSystem.name} ${item.currencyCode.code}`,
        };
    });

    const handleSubmit = () => {
        if (name && currencyIds && details) {
            editRequisites(requisites.id, name, details, numerize(currencyIds));
        }

        onClose();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Редактировать дополнительное поле</Headline3>
            <Content>
                <StyledTextField label="Название" value={name} onChange={(e) => setName(e.target.value)} />

                <StyledTextField label="Детали" value={details} onChange={(e) => setDetails(e.target.value)} />

                <Select
                    label="Выберите валюту"
                    multiselect
                    items={currencyOptions}
                    value={currencyIds}
                    onChange={setCurrencyIds}
                    size="l"
                />

                <Button text="Изменить" stretch onClick={handleSubmit} onKeyDown={handleSubmit} />
            </Content>
        </StyledModal>
    );
};
