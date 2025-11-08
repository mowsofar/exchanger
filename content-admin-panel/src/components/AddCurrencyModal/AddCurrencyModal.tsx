import { Combobox, Headline3, Modal, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyCodeList } from '../../stores/currencyCode.store';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';
import { FilterTypeValues } from '../../api/types/common';
import { Select } from '../Select/Select';

interface AddCurrencyModalProps {
    opened: boolean;
    onClose: () => void;
    createCurrency: (
        paymentSystemId: number,
        currencyCodeId: number,
        xmlCode: string,
        decimalPlaces: number,
        filterType: string,
    ) => void;
}

const StyledModal = styled(Modal)`
    width: 480px;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

export const AddCurrencyModal: React.FC<AddCurrencyModalProps> = ({ opened, onClose, createCurrency }) => {
    const [selectedPaymentSystem, setSelectedPaymentSystem] = React.useState<string>();
    const [selectedCurrencyCode, setSelectedCurrencyCode] = React.useState<string>();
    const [decimalPlaces, setDecimalPlaces] = React.useState<number>();
    const [filterType, setFilterType] = React.useState<'RUB' | 'USDT' | 'COIN' | ''>('');
    const [XMLCode, setXMLCode] = React.useState('');

    const currencyCodeList = useStore($currencyCodeList);
    const paymentSystemsList = useStore($paymentSystemsList);

    const currencyCodeOptions = currencyCodeList.map((item) => {
        return {
            value: String(item.id),
            label: item.code,
        };
    });

    const paymentSystemsOptions = paymentSystemsList.map((item) => {
        return {
            value: String(item.id),
            label: item.name,
        };
    });

    const onCloseModal = () => {
        setSelectedCurrencyCode(undefined);
        setSelectedPaymentSystem(undefined);
        setDecimalPlaces(undefined);
        setXMLCode('');
        setFilterType('');
        onClose();
    };

    const handleSubmit = () => {
        if (Number(selectedCurrencyCode) && Number(selectedPaymentSystem) && XMLCode && decimalPlaces && filterType) {
            createCurrency(
                Number(selectedPaymentSystem),
                Number(selectedCurrencyCode),
                XMLCode,
                decimalPlaces,
                filterType,
            );
        }

        onCloseModal();
    };

    const handleChangeDecimalPlacesValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(e.target.value))) {
            return;
        }

        setDecimalPlaces(Number(e.target.value));
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Добавить валюту</Headline3>
            <Content>
                <Combobox
                    label="Платёжная система"
                    placeholder="Выберите из списка"
                    items={paymentSystemsOptions}
                    value={String(selectedPaymentSystem)}
                    onChange={(value: string) => setSelectedPaymentSystem(value)}
                    size="l"
                    listHeight="300px"
                    listOverflow="scroll"
                />

                <Combobox
                    label="Код валюты"
                    placeholder="Выберите из списка"
                    items={currencyCodeOptions}
                    value={String(selectedCurrencyCode)}
                    onChange={(value: string) => setSelectedCurrencyCode(value)}
                    size="l"
                    listHeight="300px"
                    listOverflow="scroll"
                />

                <TextField label="XML-код" value={XMLCode} onChange={(e) => setXMLCode(e.target.value)} />

                <TextField
                    label="Знаки после запятой"
                    value={decimalPlaces}
                    onChange={handleChangeDecimalPlacesValue}
                />

                <Select
                    label="Фильтр"
                    placeholder="Выберите из списка"
                    value={filterType}
                    items={FilterTypeValues}
                    onChange={(value) => setFilterType(value as 'RUB' | 'USDT' | 'COIN' | '')}
                />
                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    disabled={
                        !selectedCurrencyCode || !selectedPaymentSystem || !XMLCode || !decimalPlaces || !filterType
                    }
                />
            </Content>
        </StyledModal>
    );
};
