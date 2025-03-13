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

export const OperationInfo: React.FC = () => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);

    const payout = useStore($payout);

    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    const courseTitle = course?.isReversed
        ? `${course?.course || payout?.course} ${
              sourceCurrency?.currencyCode.code || payout?.srcCurrency.currencyCode.code
          }  = 1 ${targetCurrency?.currencyCode.code || payout?.targetCurrency.currencyCode.code}`
        : `${course?.course || payout?.course} ${
              targetCurrency?.currencyCode.code || payout?.targetCurrency.currencyCode.code
          } = 1 ${sourceCurrency?.currencyCode.code || payout?.srcCurrency.currencyCode.code}`;

    return (
        <StyledRoot>
            <StyledHeader>Информация об операции</StyledHeader>
            <StyledCard>
                <StyledAmountCard>
                    <div>Отдаёте</div>
                    <Amount>{amountFrom || payout?.amountFrom}</Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img src={sourceCurrency?.paymentSystem.imagePath || payout?.srcCurrency.paymentSystem.imagePath} />
                    <div>{sourceCurrency?.currencyCode.code || payout?.srcCurrency.currencyCode.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCard>
                <StyledAmountCard>
                    <div>Получаете</div>
                    <Amount>{amountTo || payout?.amountTo}</Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img
                        src={targetCurrency?.paymentSystem.imagePath || payout?.targetCurrency.paymentSystem.imagePath}
                    />
                    <div>{targetCurrency?.currencyCode.code || payout?.targetCurrency.currencyCode.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCourse>
                <div>Курс:</div>
                <div>{courseTitle}</div>
            </StyledCourse>

            {payout?.email && (
                <StyledCourse>
                    <div>E-mail:</div>
                    <div>{payout.email}</div>
                </StyledCourse>
            )}

            {payout?.requisites && (
                <StyledCourse>
                    <div>Реквизиты:</div>
                    <div>{payout.requisites}</div>
                </StyledCourse>
            )}
        </StyledRoot>
    );
};
