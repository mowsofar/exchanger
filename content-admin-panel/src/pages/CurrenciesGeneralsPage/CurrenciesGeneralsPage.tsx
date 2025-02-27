import { Headline3 } from '@salutejs/plasma-web';
import React from 'react';
import { useStore } from '@nanostores/react';
import { $selectedCurrency } from '../../stores/currency.store';
import {
    StyledBlock,
    StyledLine,
    StyledRoot,
    StyledSaveButton,
    StyledSelect,
    StyledTextField,
} from './CurrenciesGeneralsPage.styled';
import { ROUTES } from '../../constants/routes';
import { Breadcrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { CurrencyStatusValues, FilterTypeValues } from '../../api/types/common';
import { useNavigate } from 'react-router-dom';
import { useCurrenciesGeneralsPage } from './CurrenciesGeneralsPage.hooks';
import { $paymentSystemsList } from '../../stores/paymentSystems.store';
import { $currencyCodeList } from '../../stores/currencyCode.store';

export const CurrenciesGeneralsPage: React.FC = () => {
    const { editCurrencyItem } = useCurrenciesGeneralsPage();
    const navigate = useNavigate();
    const currency = useStore($selectedCurrency);
    const paymentSystemsList = useStore($paymentSystemsList);
    const currencyCodeList = useStore($currencyCodeList);

    const [status, setStatus] = React.useState(currency?.status);
    const [paymentSystem, setPaymentSystem] = React.useState(String(currency?.paymentSystem.id));
    const [currencyCode, setCurrencyCode] = React.useState(String(currency?.currencyCode.id));
    const [technicalName, setTechnicalName] = React.useState(currency?.technicalName);
    const [XML, setXML] = React.useState(currency?.xmlCode);
    const [decimalPlaces, setDecimalPlaces] = React.useState(currency?.decimalPlaces || 0);
    const [filterType, setFilterType] = React.useState(currency?.filterType);

    const currencyCodeOptions = currencyCodeList.map((item) => {
        return {
            value: String(item?.id),
            label: item?.code,
        };
    });

    const paymentSystemsOptions = paymentSystemsList.map((item) => {
        return {
            value: String(item?.id),
            label: item?.name,
        };
    });

    const handleSubmit = () => {
        const newData: any = {};

        if (status !== currency?.status) {
            newData.status = status;
        }

        if (Number(paymentSystem) !== currency?.paymentSystem.id) {
            newData.paymentSystemId = paymentSystem;
        }

        if (Number(currencyCode) !== currency?.currencyCode.id) {
            newData.currencyCodeId = currencyCode;
        }

        if (technicalName !== currency?.technicalName) {
            newData.technicalName = technicalName;
        }

        if (XML !== currency?.xmlCode) {
            newData.xmlCode = XML;
        }

        if (decimalPlaces !== currency?.decimalPlaces) {
            newData.decimalPlaces = decimalPlaces;
        }

        if (filterType !== currency?.filterType) {
            newData.filterType = filterType;
        }

        editCurrencyItem(newData);
    };

    const handleBack = () => {
        navigate(ROUTES.currency);
    };

    return (
        <StyledRoot>
            <Breadcrumbs
                path={[
                    { name: 'Валюты', route: ROUTES.currency },
                    { name: 'Основные настройки', route: ROUTES.currencyGenerals(currency?.id) },
                ]}
            />
            <Headline3>Основные настройки</Headline3>
            <StyledSelect
                label="Статус"
                value={status}
                items={CurrencyStatusValues}
                onChange={(value) => setStatus(value as string)}
            />

            <StyledLine />

            <StyledBlock>
                <StyledSelect
                    label="Платёжная система"
                    value={paymentSystem}
                    items={paymentSystemsOptions}
                    onChange={(value) => setPaymentSystem(value as string)}
                />

                <StyledSelect
                    label="Код валюты"
                    value={currencyCode}
                    items={currencyCodeOptions}
                    onChange={(value) => setCurrencyCode(value as string)}
                />
            </StyledBlock>

            <StyledBlock>
                <StyledTextField
                    label="Техническое название валюты"
                    value={technicalName}
                    onChange={(e) => setTechnicalName(e.target.value)}
                />

                <StyledTextField label="Обозначение для XML" value={XML} onChange={(e) => setXML(e.target.value)} />
            </StyledBlock>

            <StyledTextField
                label="Знаки после запятой"
                type="number"
                value={decimalPlaces}
                onChange={(e) => setDecimalPlaces(Number(e.target.value))}
            />

            <StyledSelect
                label="Фильтр"
                value={filterType}
                items={FilterTypeValues}
                onChange={(value) => setFilterType(value as string)}
            />

            <StyledBlock>
                <StyledSaveButton view="dark" size="s" text="Сохранить" onClick={handleSubmit} />
                <StyledSaveButton view="secondary" size="s" text="Назад" onClick={handleBack} />
            </StyledBlock>
        </StyledRoot>
    );
};
