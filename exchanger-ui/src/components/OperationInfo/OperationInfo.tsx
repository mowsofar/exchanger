import {
    Amount,
    Currnecy,
    Img,
    StyledAmountCard,
    StyledCard,
    StyledCourse,
    StyledHeader,
    StyledRoot,
} from './OperationInfo.styled';
import { useStore } from '@nanostores/react';
import { $amountFrom, $amountTo, $course, $sourceCurrency, $targetCurrency } from '../../stores/currencies.store';
import { $payout } from '../../stores/payout.store';
import { formatCalculatorInput, formatNumber } from '../../utils/formatNumber';

export const OperationInfo: React.FC = () => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);
    const payout = useStore($payout);
    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    // Функция для форматирования суммы с учетом decimalPlaces
    const formatAmount = (
        amount: number | string | undefined,
        currency: { decimalPlaces?: number } | null | undefined,
    ) => {
        if (amount === undefined) return '0';

        const numericValue = typeof amount === 'string' ? parseFloat(amount.replace(/\s/g, '')) : amount;
        if (isNaN(numericValue)) return '0';

        return formatNumber(numericValue, currency?.decimalPlaces);
    };

    const courseTitle = (() => {
        if (!course && !payout?.course) return '';

        const currentCourse = payout?.course || course?.course;
        const isReversed = course?.isReversed; // Используем только из course

        const sourceCode = payout?.srcCurrency?.currencyCode?.code || sourceCurrency?.currencyCode?.code;
        const targetCode = payout?.targetCurrency?.currencyCode?.code || targetCurrency?.currencyCode?.code;

        // Определяем decimalPlaces для форматирования
        const sourceDecimalPlaces = payout?.srcCurrency?.decimalPlaces || sourceCurrency?.decimalPlaces;
        const targetDecimalPlaces = payout?.targetCurrency?.decimalPlaces || targetCurrency?.decimalPlaces;

        if (isReversed) {
            // Формат: X source = 1 target
            const formattedCourse = formatNumber(currentCourse, sourceDecimalPlaces);
            return `${formattedCourse} ${sourceCode} = 1 ${targetCode}`;
        } else {
            // Формат: X target = 1 source
            const formattedCourse = formatNumber(currentCourse, targetDecimalPlaces);
            return `${formattedCourse} ${targetCode} = 1 ${sourceCode}`;
        }
    })();

    return (
        <StyledRoot>
            <StyledHeader>Информация об операции</StyledHeader>
            <StyledCard>
                <StyledAmountCard>
                    <div>Отдаёте</div>
                    <Amount>
                        {payout?.amountFrom
                            ? formatAmount(payout.amountFrom, payout.srcCurrency || sourceCurrency)
                            : formatCalculatorInput(amountFrom)}
                    </Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img
                        src={payout?.srcCurrency?.paymentSystem?.imagePath || sourceCurrency?.paymentSystem?.imagePath}
                    />
                    <div>{payout?.srcCurrency?.currencyCode?.code || sourceCurrency?.currencyCode?.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCard>
                <StyledAmountCard>
                    <div>Получаете</div>
                    <Amount>
                        {payout?.amountTo
                            ? formatAmount(payout.amountTo, payout.targetCurrency || targetCurrency)
                            : formatCalculatorInput(amountTo)}
                    </Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img
                        src={
                            payout?.targetCurrency?.paymentSystem?.imagePath || targetCurrency?.paymentSystem?.imagePath
                        }
                    />
                    <div>{payout?.targetCurrency?.currencyCode?.code || targetCurrency?.currencyCode?.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCourse>
                <div>Курс:</div>
                <div>{courseTitle}</div>
            </StyledCourse>

            {payout?.email && (
                <StyledCourse>
                    <div>E-mail:</div>
                    <div>{payout?.email}</div>
                </StyledCourse>
            )}

            {payout?.requisites && (
                <StyledCourse>
                    <div>Реквизиты:</div>
                    <div>{payout?.requisites.replace(/.{4}\B/g, '$& ')}</div>
                </StyledCourse>
            )}

            {payout?.sourceAdditionalFields?.map((field, index) => (
                <StyledCourse key={`source-${index}`}>
                    <div>{field?.fieldName}:</div>
                    <div>{field?.userValue}</div>
                </StyledCourse>
            ))}

            {payout?.targetAdditionalFields?.map((field, index) => (
                <StyledCourse key={`target-${index}`}>
                    <div>{field?.fieldName}:</div>
                    <div>{field?.userValue}</div>
                </StyledCourse>
            ))}
        </StyledRoot>
    );
};
