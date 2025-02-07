import { Button, ModalBase, Select } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';

interface AddCurrencyModalProps {
    opened: boolean;
    onClose: () => void;
}

const Content = styled.div`
    height: 280px;
    width: 300px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`;

const items = [
    {
        value: 'north_america',
        label: 'Северная Америка',
    },
    {
        value: 'south_america',
        label: 'Южная Америка',
    },
];

export const AddCurrencyModal: React.FC<AddCurrencyModalProps> = ({ opened, onClose }) => {
    const [paymentSystem, setPaymentSystem] = React.useState('');
    return (
        <ModalBase opened={opened} placement="center" withBlur hasBody hasClose onClose={onClose}>
            <Content>
                <Select
                    label="Платёжная система"
                    placeholder="Выберите платёжную систему"
                    items={items}
                    value={paymentSystem}
                    onChange={setPaymentSystem}
                />
                <Select
                    label="Код валюты"
                    placeholder="Выберите код валюты"
                    items={items}
                    value={paymentSystem}
                    onChange={setPaymentSystem}
                />
                <Button text="Добавить" stretch />
            </Content>
        </ModalBase>
    );
};
