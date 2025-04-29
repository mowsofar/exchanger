import React from 'react';
import { useStore } from '@nanostores/react';
import { $course, $sourceCurrency, $targetCurrency } from '../../stores/currencies.store';
import { Circle, CountDown, CountDownContainer, Seconds, Skeleton, StyledRoot, Svg } from './CurrencyRate.styled';
import { formatNumber } from '../../utils/formatNumber';

interface CurrencyRateProps {
    onComplete: (sourceId: number, targetId: number) => void;
}

export const CurrencyRate: React.FC<CurrencyRateProps> = ({ onComplete }) => {
    const [countdown, setCountdown] = React.useState(30);
    const circumference = 40 * Math.PI;

    const strokeDashoffset = circumference - (countdown / 30) * circumference;

    const course = useStore($course);
    const sourceCurrencyId = useStore($sourceCurrency)?.id;
    const sourceCurrencyCode = useStore($sourceCurrency)?.currencyCode.code;
    const targetCurrencyId = useStore($targetCurrency)?.id;
    const targetCurrencyCode = useStore($targetCurrency)?.currencyCode.code;

    const courseTitle = course?.isReversed
        ? `Курс: ${formatNumber(course?.course)} ${sourceCurrencyCode} = 1 ${targetCurrencyCode}`
        : `Курс: ${formatNumber(course?.course)} ${targetCurrencyCode} = 1 ${sourceCurrencyCode}`;

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (countdown !== 1) {
                setCountdown(countdown - 1);
            } else {
                setCountdown(30);
                if (sourceCurrencyId && targetCurrencyId) {
                    onComplete(sourceCurrencyId, targetCurrencyId);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown, onComplete, sourceCurrencyId, targetCurrencyId]);

    return (
        <StyledRoot>
            <CountDown>
                <Seconds>{countdown}</Seconds>
                <CountDownContainer>
                    <Svg>
                        <Circle
                            r="20"
                            cx="20"
                            cy="20"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        ></Circle>
                    </Svg>
                </CountDownContainer>
            </CountDown>
            {!course?.course && <Skeleton />}
            {course?.course && courseTitle}
        </StyledRoot>
    );
};
