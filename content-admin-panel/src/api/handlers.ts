import { ROUTES } from "../constants/routes";
import { queueTokenRefresh } from "./tokenHandlers";
import { AdditionalFieldDirection, AdditionalFieldDirections, AdditionalFields, Currency, CurrencyCode, ExchangeDirection, getPayoutsResponse, LoginData, PaymentSystem, Payout, PayoutStatus, Requisites, StatusType, User } from "./types/common";

async function handleResponse(response: Response, originalRequest?: RequestInit): Promise<any> {
    if (response.status === 403) {
        try {
            await queueTokenRefresh();
            const newResponse = await fetch(response.url, {
                ...originalRequest,
                headers: {
                    ...originalRequest?.headers,
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            return handleResponse(newResponse, originalRequest);
        } catch (error) {
            window.location.replace(ROUTES.login);
            return Promise.reject(error);
        }
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
    options?: Partial<RequestInit>,
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

    return fetch(`https://server.kykyshka.com/${endpoint}`, requestOptions).then(response => handleResponse(response, requestOptions));;
}


function refresh(
    endpoint: string,
    options?: Partial<RequestInit>,
    body?: unknown,
) {
    const requestOptions: RequestInit = {
        ...options,
        method: options?.method,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return fetch(`https://server.kykyshka.com/${endpoint}`, requestOptions).then(response => handleResponse(response, requestOptions));;
}

export function getLoginData(email: string, password: string, twoFactorCode: string
): Promise<LoginData> {
    return requestToApi('api/v1/auth/authenticate', { method: 'POST' }, { email, password, twoFactorCode });
}

export function logout(
): Promise<LoginData> {
    return requestToApi('api/v1/auth/logout', { method: 'POST' });
}

export function refreshToken(): Promise<LoginData> {
    return refresh('api/v1/auth/refresh-token', { method: 'POST' });
}

export function getAccount(): Promise<User> {
    return requestToApi('api/user/getaccount');
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

    return fetch(`https://server.kykyshka.com/${endpoint}`, requestOptions).then(response => handleResponse(response, requestOptions));;
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

export function deleteCurrency(id: number
): Promise<unknown> {
    return requestToApi(`api/currencies/${id}`, { method: 'DELETE' });
}

export function getExchangeDirections(
): Promise<ExchangeDirection[]> {
    return requestToApi('api/exchange-directions', { method: 'GET' });
}

export function getExchangeDirectionsPaged(page: number, size: number
): Promise<{ totalPages: number, totalElements: number, size: number, content: ExchangeDirection[]}> {
    return requestToApi(`api/exchange-directions/paged?page=${page-1}&size=${size}`, { method: 'GET' });
}

export function createExchangeDirection(sourceCurrencyId: number, targetCurrencyId: number, profitPercent: number, minSourceAmount: number, maxSourceAmount: number, reserves: number
): Promise<ExchangeDirection[]> {
    return requestToApi('api/exchange-directions', { method: 'POST' }, { sourceCurrencyId, targetCurrencyId, profitPercent, minSourceAmount, maxSourceAmount, reserves });
}

export function editExchangeDirection(id: number, body: any
): Promise<unknown> {
    return requestToApi(`api/exchange-directions/${id}`, { method: 'PATCH' }, body);
}

export function deleteExchangeDirection(id: number
): Promise<unknown> {
    return requestToApi(`api/exchange-directions/${id}`, { method: 'DELETE' });
}

export function updateProfitPercent(ids: number[], newProfit: number, sortMap: {[key: string]: number}
): Promise<unknown> {
    return requestToApi(`api/exchange-directions/batch/update-profit-percent`, { method: 'PATCH' }, { ids, newProfit, sortMap });
}

export function updateMinMaxAmount(ids: number[], minSourceAmount: number, maxSourceAmount: number, sortMap: { [key: string]: number }
): Promise<unknown> {
    return requestToApi(`api/exchange-directions/batch/update-min-max-amounts`, { method: 'PATCH' }, { ids, minSourceAmount, maxSourceAmount, sortMap });
}

export function updateDirectionsStatus(ids: number[], sortMap: { [key: string]: number }
): Promise<unknown> {
    return requestToApi(`api/exchange-directions/batch/update-status`, { method: 'PATCH' }, {ids, newStatus: 'ACTIVE', sortMap });
}

export function updateStatus(ids: number[], newStatus: StatusType, sortMap: { [key: string]: number }
): Promise<unknown> {
    return requestToApi(`api/exchange-directions/batch/update-status`, { method: 'PATCH' }, {ids, newStatus, sortMap });
}

export function getAdditionalFields(
): Promise<AdditionalFields> {
    return requestToApi('api/additional-fields', { method: 'GET' });
}

export function getTypedAdditionalFields(status: string
): Promise<AdditionalFieldDirection[]> {
    return requestToApi(`api/additional-fields/status/${status}`, { method: 'GET' });
}

export function createAdditionalField(fieldName: string, nameIdentify: string, status: string, direction: AdditionalFieldDirections, currencyIds: number[]
): Promise<unknown> {
    return requestToApi('api/additional-fields', { method: 'POST' }, { fieldName, nameIdentify, status, direction, currencyIds });
}

export function editAdditionalField(id: number, fieldName: string, nameIdentify: string, status: string, direction: AdditionalFieldDirections, currencyIds: number[]
): Promise<unknown> {
    return requestToApi(`api/additional-fields/${id}`, { method: 'PATCH' }, { fieldName, nameIdentify, status, direction, currencyIds });
}

export function deleteAdditionalField(id: number
): Promise<unknown> {
    return requestToApi(`api/additional-fields/${id}`, { method: 'DELETE' });
}

export function getPayouts(page?: number, size?: number, statuses?: PayoutStatus[], 
): Promise<getPayoutsResponse> {
    const queryParams = new URLSearchParams();
    
    if (statuses && statuses.length > 0) {
        statuses.forEach(status => {
            queryParams.append('statuses', status);
        });
    }
    
    if (page !== undefined) {
        queryParams.append('page', page.toString());
    }
    
    if (size !== undefined) {
        queryParams.append('size', size.toString());
    }
    
    const url = `api/payouts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    return requestToApi(url, { method: 'GET' });
}

export function getPayout(id: number
): Promise<Payout> {
    return requestToApi(`api/payouts/${id}`, { method: 'GET' });
}

export function setPayoutStatus(id: number, status: PayoutStatus
): Promise<Payout> {
    return requestToApi(`api/payouts/${id}/status`, { method: 'PATCH' }, { status });
}

export function updatePayoutRequisites(id: number, exchangeRequisites: string
): Promise<Payout> {
    return requestToApi(`api/payouts/${id}/exchange-requisites`, { method: 'PATCH' }, { exchangeRequisites });
}

export function verifyPayoutRequisites(requisite: string
): Promise<Payout> {
    return requestToApi(`api/payouts/cards/${requisite}/approve`, { method: 'PATCH' });
}

export function getRequisites(
): Promise<Requisites[]> {
    return requestToApi(`api/requisites`, { method: 'GET' });
}

export function createRequisites(name: string, details: string, currencyIds: number[]
): Promise<Requisites[]> {
    return requestToApi(`api/requisites`, { method: 'POST' }, { name, details, currencyIds });
}

export function editRequisites(id: number, name: string, details: string, currencyIds: number[]
): Promise<unknown> {
    return requestToApi(`api/requisites/${id}`, { method: 'PUT' }, { name, details, currencyIds });
}

export function deleteRequisites(id: number
): Promise<unknown> {
    return requestToApi(`api/requisites/${id}`, { method: 'DELETE' });
}