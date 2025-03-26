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
import { formatNumber } from '../../utils/formatNumber';

export const OperationInfo: React.FC = () => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);

    const payout = useStore($payout);

    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    const courseTitle = course?.isReversed
        ? `${formatNumber(payout?.course) || formatNumber(course?.course)} ${
              payout?.srcCurrency.currencyCode.code || sourceCurrency?.currencyCode.code
          }  = 1 ${payout?.targetCurrency.currencyCode.code || targetCurrency?.currencyCode.code}`
        : `${formatNumber(payout?.course) || formatNumber(course?.course)} ${
              payout?.targetCurrency.currencyCode.code || targetCurrency?.currencyCode.code
          } = 1 ${payout?.srcCurrency.currencyCode.code || sourceCurrency?.currencyCode.code}`;

    return (
        <StyledRoot>
            <StyledHeader>Информация об операции</StyledHeader>
            <StyledCard>
                <StyledAmountCard>
                    <div>Отдаёте</div>
                    <Amount>{formatNumber(payout?.amountFrom) || amountFrom}</Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img src={payout?.srcCurrency.paymentSystem.imagePath || sourceCurrency?.paymentSystem.imagePath} />
                    <div>{payout?.srcCurrency.currencyCode.code || sourceCurrency?.currencyCode.code}</div>
                </Currnecy>
            </StyledCard>

            <StyledCard>
                <StyledAmountCard>
                    <div>Получаете</div>
                    <Amount>{formatNumber(payout?.amountTo) || amountTo}</Amount>
                </StyledAmountCard>
                <Currnecy>
                    <Img
                        src={payout?.targetCurrency.paymentSystem.imagePath || targetCurrency?.paymentSystem.imagePath}
                    />
                    <div>{payout?.targetCurrency.currencyCode.code || targetCurrency?.currencyCode.code}</div>
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
                    <div>{payout.requisites.replace(/.{4}\B/g, '$& ')}</div>
                </StyledCourse>
            )}

            {payout?.sourceAdditionalFields.map((field) => (
                <StyledCourse>
                    <div>{field.fieldName}:</div>
                    <div>{field.userValue}</div>
                </StyledCourse>
            ))}

            {payout?.targetAdditionalFields.map((field) => (
                <StyledCourse>
                    <div>{field.fieldName}:</div>
                    <div>{field.userValue}</div>
                </StyledCourse>
            ))}
        </StyledRoot>
    );
};
