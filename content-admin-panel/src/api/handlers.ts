import { ROUTES } from "../constants/routes";
import { AdditionalField, Currency, CurrencyCode, ExchangeDirection, LoginData, PaymentSystem } from "./types/common";

function handleResponse(response: Response) {
    if (response.status === 403) {
        window.location.replace(ROUTES.login);
    }

    if (response.status === 200 && window.location.pathname === ROUTES.login) {
        window.location.replace(ROUTES.currencyCode);
    }
    
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function requestToApi(
    endpoint: string,
    options: Partial<RequestInit>,
    body?: unknown,
) {
    const requestOptions: RequestInit = {
        ...options,
        method: options?.method,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    console.log(`Bearer ${localStorage.getItem('accessToken')}`);

    return fetch(`http://212.193.31.222:7677/${endpoint}`, requestOptions).then(handleResponse);
}

export function getLoginData(email: string, password: string, twoFactorCode: string
): Promise<LoginData> {
    return requestToApi('api/v1/auth/authenticate', { method: 'POST' }, { email, password, twoFactorCode });
}

export function getCurrencyCodes(
): Promise<CurrencyCode[]> {
    return requestToApi('api/code', { method: 'GET' });
}

export function createCurrencyCode(code: string, symbol: string
): Promise<unknown> {
    return requestToApi('api/code', { method: 'POST' }, { code, symbol });
}

export function deleteCurrencyCode(id: number
): Promise<unknown> {
    return requestToApi(`api/code/${id}`, { method: 'DELETE' });
}

export function editCurrencyCode(id: number, code: string, symbol: string
): Promise<unknown> {
    return requestToApi(`api/code/${id}`, { method: 'PUT' }, { code, symbol });
}

export function getPaymentSystems(
): Promise<PaymentSystem[]> {
    return requestToApi('api/payments', { method: 'GET'});
}

function uploadImage(
    endpoint: string,
    formData?: FormData,
    options?: Partial<RequestInit>,
) {
    const requestOptions: RequestInit = {
        method: options?.method,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
    };

    console.log(`Bearer ${localStorage.getItem('accessToken')}`);

    return fetch(`http://212.193.31.222:7677/${endpoint}`, requestOptions).then(handleResponse);
}

export function createPaymentSystem(name: string, file: FormData
): Promise<unknown> {
    return uploadImage(`api/payments?name=${name}`, file, { method: 'POST' });
}

export function editPaymentSystem(id: number, name: string, file: FormData
): Promise<unknown> {
    return uploadImage(`api/payments/${id}?name=${name}`, file, { method: 'PUT' });
}

export function deletePaymentSystem(id: number
): Promise<unknown> {
    return requestToApi(`api/payments/${id}`, { method: 'DELETE'});
}

export function getCurrencies(
): Promise<Currency[]> {
    return requestToApi('api/currencies', { method: 'GET' });
}

export function createCurrency(paymentSystemId: number, currencyCodeId: number, xmlCode: string, decimalPlaces: number, filterType: string
): Promise<unknown> {
    return requestToApi('api/currencies', { method: 'POST' }, { paymentSystemId, currencyCodeId, xmlCode, decimalPlaces, filterType });
}

export function getCurrency(id: number
): Promise<Currency> {
    return requestToApi(`api/currencies/${id}`, { method: 'GET' });
}

export function editCurrency(id: number, body: any
): Promise<unknown> {
    return requestToApi(`api/currencies/${id}`, { method: 'PATCH' }, body);
}

export function getExchangeDirections(
): Promise<ExchangeDirection[]> {
    return requestToApi('api/exchange-directions', { method: 'GET' });
}

export function createExchangeDirection(sourceCurrencyId: number, targetCurrencyId: number, profitPercent: number, minSourceAmount: number, maxSourceAmount: number, reserves: number
): Promise<ExchangeDirection[]> {
    return requestToApi('api/exchange-directions', { method: 'POST' }, { sourceCurrencyId, targetCurrencyId, profitPercent, minSourceAmount, maxSourceAmount, reserves });
}

export function getAdditionalFields(
): Promise<AdditionalField[]> {
    return requestToApi('api/additional-fields', { method: 'GET' });
}

export function createAdditionalField(fieldName: string, keyId: number, status: string
): Promise<unknown> {
    return requestToApi('api/additional-fields', { method: 'POST' }, { fieldName, keyId, status });
}

export function editAdditionalField(id: number, fieldName: string, keyId: number, status: string
): Promise<unknown> {
    return requestToApi(`api/additional-fields/${id}`, { method: 'PATCH' }, { fieldName, keyId, status });
}

export function deleteAdditionalField(id: number
): Promise<unknown> {
    return requestToApi(`api/additional-fields/${id}`, { method: 'DELETE' });
}