import { Headline3, Modal, Select, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { $currencyCodeList } from '../../stores/currencyCode.store';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';
import { FilterTypeValues } from '../../api/types/common';

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

export const AddCurrencyModal: React.FC<AddCurrencyModalProps> = ({ opened, onClose, createCurrency }) => {
    const [selectedPaymentSystem, setSelectedPaymentSystem] = React.useState<number>();
    const [selectedCurrencyCode, setSelectedCurrencyCode] = React.useState<number>();
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
        if (selectedCurrencyCode && selectedPaymentSystem && XMLCode && decimalPlaces && filterType) {
            createCurrency(selectedPaymentSystem, selectedCurrencyCode, XMLCode, decimalPlaces, filterType);
        }

        onCloseModal();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Добавить валюту</Headline3>
            <Content>
                <Select
                    label="Платёжная система"
                    items={paymentSystemsOptions}
                    value={selectedPaymentSystem}
                    onChange={setSelectedPaymentSystem}
                    size="l"
                />

                <Select
                    label="Код валюты"
                    items={currencyCodeOptions}
                    value={selectedCurrencyCode}
                    onChange={setSelectedCurrencyCode}
                    size="l"
                />

                <StyledTextField label="XML-код" value={XMLCode} onChange={(e) => setXMLCode(e.target.value)} />

                <StyledTextField
                    label="Знаки после запятой"
                    type="number"
                    value={decimalPlaces}
                    onChange={(e) => setDecimalPlaces(Number(e.target.value))}
                />

                <Select
                    label="Фильтр"
                    value={filterType}
                    items={FilterTypeValues}
                    onChange={(value) => setFilterType(value)}
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
