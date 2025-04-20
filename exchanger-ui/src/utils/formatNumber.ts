export function formatNumber(n: number | undefined, decimalPlaces?: number): string {
    if (!n) return '0';

    let roundedValue = n;
    if (decimalPlaces !== undefined) {
        roundedValue = Number(n.toFixed(decimalPlaces));
    }

    let [integer, decimal] = roundedValue.toString().split('.');

    let formattedInteger = new Intl.NumberFormat('ru-Ru').format(Number(integer));

    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}

export function formatCalculatorInput(value: string | number): string {
    let number = value;

    if (String(value).includes('e')) {
        number = Number(value).toFixed(12);
    }

    let inputValue = String(number);

    const parts = inputValue.split('.');

    if (inputValue === '') {
        inputValue = '0';
    }

    if (inputValue[0] === '0' && inputValue.length > 1 && parts.length < 2) {
        inputValue = inputValue.slice(1);
    }

    inputValue = inputValue.replace(/,/g, '.');
    inputValue = inputValue.replace(/[^\d.]/g, '');

    if (parts.length > 2) {
        inputValue = parts[0] + '.' + parts.slice(1).join('');
    }

    if (inputValue.includes('.')) {
        const [integerPart, decimalPart] = inputValue.split('.');
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        inputValue = `${formattedInteger}.${decimalPart}`;
    } else {
        inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    return inputValue;
}

export function formatToSubmit(displayValue: string): number {
    if (!displayValue) return 0;

    // Удаляем все пробелы (разделители тысяч)
    let numericString = displayValue.replace(/\s/g, '');

    // Заменяем запятые на точки (для корректного парсинга в JS)
    numericString = numericString.replace(/,/g, '.');

    // 3. Парсим в число
    const numberValue = parseFloat(numericString);

    if (isNaN(numberValue)) return 0;

    return numberValue;
}

export function formatInputWithDecimalPlaces(value: string, decimalPlaces?: number): string {
    if (!value) return '0';
    
    // Удаляем все нечисловые символы, кроме точки и запятой
    let cleanedValue = value.replace(/[^\d.,]/g, '');
    
    // Заменяем запятые на точки
    cleanedValue = cleanedValue.replace(/,/g, '.');
    
    // Разделяем на целую и дробную части
    const parts = cleanedValue.split('.');
    
    // Если есть дробная часть и указано decimalPlaces
    if (parts.length > 1 && decimalPlaces !== undefined) {
        // Обрезаем дробную часть до допустимого количества знаков
        parts[1] = parts[1].slice(0, decimalPlaces);
        cleanedValue = parts.join('.');
    }
    
    return formatCalculatorInput(cleanedValue);
}

export function formatNumberWithDecimalPlaces(value: number, decimalPlaces?: number): string {
    if (decimalPlaces !== undefined) {
        // Округляем до указанного количества знаков после запятой
        const roundedValue = Number(value.toFixed(decimalPlaces));
        return formatCalculatorInput(roundedValue.toString());
    }
    return formatCalculatorInput(value.toString());
}