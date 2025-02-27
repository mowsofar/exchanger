import React from 'react';
import { Headline3 } from '@salutejs/plasma-web';

import { Button } from '../Button/Button.styled';
import { CurrencyCode } from '../../api/types/common';
import { Content, StyledModal, StyledTextField } from './CurrencyCodeModal.styled';

interface EditCurrencyCodeModalProps {
    opened: boolean;
    onClose: () => void;
    selectedCurrencyCode: CurrencyCode;
    editCurrencyCode: (id: number, code: string, currencySymbol: string) => void;
    className?: string;
}
export const EditCurrencyCodeModal: React.FC<EditCurrencyCodeModalProps> = ({
    opened,
    onClose,
    editCurrencyCode,
    selectedCurrencyCode,
}) => {
    const [code, setCode] = React.useState(selectedCurrencyCode.code);
    const [currencySymbol, setCurrencySymbol] = React.useState(selectedCurrencyCode.symbol);

    const handleSubmit = () => {
        if (selectedCurrencyCode) {
            editCurrencyCode(selectedCurrencyCode.id, code, currencySymbol);
        }

        onClose();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Изменение кода валюты</Headline3>
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
                <Button
                    text="Сохранить"
                    stretch
                    onClick={handleSubmit}
                    disabled={code === selectedCurrencyCode.code && currencySymbol === selectedCurrencyCode.symbol}
                />
            </Content>
        </StyledModal>
    );
};
