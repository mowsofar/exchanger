export function formatNumber(n: number | undefined) {
    if (!n) return 0;

    let [integer, decimal] = n.toString().split('.');

    let formattedInteger = new Intl.NumberFormat('ru-Ru').format(Number(integer));

    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}

export function formatCalculatorInput(value: string | number | undefined): string {
    if (!value && value !== 0) return '0';

    let number = value;

    if (String(value).includes('e')) {
        number = Number(value).toFixed(12);
    }

    let inputValue = String(number);

    const parts = inputValue.split('.');

    if (inputValue === '') {
        inputValue = '0';
    }

    // Сохраняем информацию об отрицательном числе
    const isNegative = inputValue.startsWith('-');
    
    if (inputValue[0] === '0' && inputValue.length > 1 && parts.length < 2 && !isNegative) {
        inputValue = inputValue.slice(1);
    } else if (inputValue.startsWith('-0') && inputValue.length > 2 && parts.length < 2) {
        // Обработка случаев типа "-0123" -> "-123"
        inputValue = '-' + inputValue.slice(2);
    }

    inputValue = inputValue.replace(/,/g, '.');
    // Разрешаем знак минуса в регулярном выражении
    inputValue = inputValue.replace(/[^\d.-]/g, '');

    // Удаляем лишние минусы (оставляем только первый)
    if ((inputValue.match(/-/g) || []).length > 1) {
        inputValue = '-' + inputValue.replace(/-/g, '');
    }

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
