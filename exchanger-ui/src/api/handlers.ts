import { Course, Currency, ExchangeDirection, Payout } from "./types/common";

function handleResponse(response: Response) {    
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return fetch(`https://server.kykyshka.com/${endpoint}`, requestOptions).then(handleResponse);
}

export function getLeftColumnCurrencies(): Promise<Currency[]> {
    return requestToApi('api/currencies/from', { method: 'GET'});
}

export function getRightColumnCurrencies(currencyId: number): Promise<Currency[]> {
    return requestToApi(`api/currencies/from/${currencyId}`, { method: 'GET'});
}

export function getCurrency(currencyId: number): Promise<Currency> {
    return requestToApi(`api/currencies/${currencyId}`, { method: 'GET'});
}

export function getExchangeDirections(sourceId: number, targetId: number): Promise<ExchangeDirection> {
    return requestToApi(`api/exchange-directions/admin/${sourceId}/${targetId}`, { method: 'GET'});
}

export function getExchangeDirectionsCourse(sourceId: number, targetId: number): Promise<Course> {
    return requestToApi(`api/exchange-directions/course/${sourceId}/${targetId}`, { method: 'GET'});
}

export function createPayout(srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, course: number, email: string, referralCode: string | null): Promise<Payout> {
    return requestToApi('api/payouts', { method: 'POST'}, { srcCurrencyId, targetCurrencyId, amountFrom, amountTo, requisites, course, email, referralCode});
}

export function getPayout(id: number): Promise<Payout> {
    return requestToApi(`api/payouts/${id}`, { method: 'GET'});
}

export function setPayoutStatus(id: number
): Promise<Payout> {
    return requestToApi(`api/payouts/${id}/status`, { method: 'PATCH' }, { status: 'WAITING_FOR_OPERATOR_PROCESSING' });
}