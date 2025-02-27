import { Course, Currency } from "./types/common";
import { ExchangeDirectionResponseDto, GetCourseResponseDto } from "./types/currency";

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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXNoYW1pQHZrLmNvbSIsImlhdCI6MTc0MDkxODcxMywiZXhwIjoxNzQxMDA1MTEzfQ.9iUNkWJ_eNGSubMvtvU2PyilouzL6mq1CwM7T7E3-K8`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return fetch(`http://212.193.31.222:7677/${endpoint}`, requestOptions).then(handleResponse);
}

export function getLeftColumnCurrencies(): Promise<Currency[]> {
    return requestToApi('api/currencies/from', { method: 'GET'});
}

export function getRightColumnCurrencies(currencyId: number): Promise<Currency[]> {
    return requestToApi(`api/currencies/from/${currencyId}`, { method: 'GET'});
}

export function getExchangeDirections(sourceId: number, targetId: number): Promise<ExchangeDirectionResponseDto> {
    return requestToApi(`api/exchange-directions/${sourceId}/${targetId}`, { method: 'GET'});
}

export function getExchangeDirectionsCourse(sourceId: number, targetId: number): Promise<Course> {
    return requestToApi(`api/exchange-directions/course/${sourceId}/${targetId}`, { method: 'GET'});
}

export function createPayout(srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, course: number, email: string, referralCode?: string): Promise<unknown> {
    return requestToApi(`api/payouts`, { method: 'POST'}, { srcCurrencyId, targetCurrencyId, amountFrom, amountTo, requisites, course, email, referralCode});
}