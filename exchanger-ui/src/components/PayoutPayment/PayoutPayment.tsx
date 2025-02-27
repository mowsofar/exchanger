import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    StyledButton,
    StyledContent,
    StyledHeader,
    StyledLayout,
    StyledTextField,
    StyledUserForm,
    TwoBlocks,
} from './PayoutPayment.styled';
import { useStore } from '@nanostores/react';
import { $amountFrom, $amountTo, $course, $sourceCurrency, $targetCurrency } from '../../stores/currencies.store';

interface PayoutPaymentProps {
    createPayout: (
        sourceCurrencyId: number,
        targetCurrencyId: number,
        amountFrom: number,
        amountTo: number,
        requisites: string,
        course: number,
        email: string,
        referralCode?: string,
    ) => void;
}

export const PayoutPayment: React.FC<PayoutPaymentProps> = ({ createPayout }) => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);

    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    const [requisites, setRequisites] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [referralCode, setReferralCode] = React.useState('');

    const handleSubmit = () => {
        if (sourceCurrency?.id && targetCurrency?.id && course) {
            createPayout(
                sourceCurrency?.id,
                targetCurrency?.id,
                amountFrom,
                amountTo,
                requisites,
                course.course,
                email,
                referralCode,
            );
        }
    };

    return (
        <StyledLayout>
            <StyledContent>
                <Breadcrumbs
                    path={[
                        { number: 1, name: 'Ввод реквизитов', isActive: true },
                        { number: 2, name: 'Оплата заявки', isActive: false },
                        { number: 3, name: 'Завершение', isActive: false },
                    ]}
                />
                <TwoBlocks>
                    <StyledUserForm>
                        <StyledHeader>Отправитель</StyledHeader>
                        <StyledTextField placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <StyledTextField
                            placeholder="Промокод"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                        />
                    </StyledUserForm>

                    <StyledUserForm>
                        <StyledHeader>Получатель</StyledHeader>
                        <StyledTextField
                            placeholder="Реквизиты"
                            value={requisites}
                            onChange={(e) => setRequisites(e.target.value)}
                        />
                    </StyledUserForm>
                </TwoBlocks>

                <StyledButton disabled={!requisites || !email} onClick={handleSubmit}>
                    Начать транкзацию
                </StyledButton>
            </StyledContent>
        </StyledLayout>
    );
};
