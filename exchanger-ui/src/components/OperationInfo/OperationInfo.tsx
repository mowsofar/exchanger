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

export const OperationInfo: React.FC = () => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);

    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    const courseTitle = course?.isReversed
        ? `${course?.course} ${sourceCurrency?.currencyCode.code}  = 1 ${targetCurrency?.currencyCode.code}`
        : `${course?.course} ${targetCurrency?.currencyCode.code} = 1 ${sourceCurrency?.currencyCode.code}`;

    return (
        <StyledRoot>
            <StyledHeader>Информация об операции</StyledHeader>
            <StyledCard>
                <StyledAmountCard>
                    <div>Отдаёте</div>
                    <Amount>{amountFrom}</Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img src={sourceCurrency?.paymentSystem.imagePath} />
                    <div>{sourceCurrency?.currencyCode.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCard>
                <StyledAmountCard>
                    <div>Получаете</div>
                    <Amount>{amountTo}</Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img src={targetCurrency?.paymentSystem.imagePath} />
                    <div>{targetCurrency?.currencyCode.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCourse>
                <div>Курс:</div>
                <div>{courseTitle}</div>
            </StyledCourse>
        </StyledRoot>
    );
};
