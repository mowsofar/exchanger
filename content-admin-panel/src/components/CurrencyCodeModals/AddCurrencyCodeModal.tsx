import { Headline3 } from '@salutejs/plasma-web';
import React from 'react';
import { Button } from '../Button/Button.styled';
import { Content, StyledModal, StyledTextField } from './CurrencyCodeModal.styled';

interface AddCurrencyCodeModalProps {
    opened: boolean;
    onClose: () => void;
    createCurrencyCode: (code: string, currencySymbol: string) => void;
    className?: string;
}

export const AddCurrencyCodeModal: React.FC<AddCurrencyCodeModalProps> = ({ opened, onClose, createCurrencyCode }) => {
    const [code, setCode] = React.useState('');
    const [currencySymbol, setCurrencySymbol] = React.useState('');

    const onCloseModal = () => {
        setCode('');
        setCurrencySymbol('');
        onClose();
    };

    const handleSubmit = () => {
        createCurrencyCode(code, currencySymbol);

        onCloseModal();
    };

    return (
        <StyledModal opened={opened} onClose={onCloseModal}>
            <Headline3>Добавить код валюты</Headline3>
            <Content>
                <StyledTextField
                    label="Код валюты"
                    placeholder="Введите платёжную систему"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <StyledTextField
                    label="Символ валюты"
                    placeholder="Введите символ валюты"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                />
                <Button text="Добавить код" stretch onClick={handleSubmit} disabled={!code || !currencySymbol} />
            </Content>
        </StyledModal>
    );
};
