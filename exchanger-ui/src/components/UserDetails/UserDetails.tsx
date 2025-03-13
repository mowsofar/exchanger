import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Row,
    StyledButton,
    StyledButtonBack,
    StyledContent,
    StyledHeader,
    StyledLayout,
    StyledTextField,
    StyledUserForm,
    TwoBlocks,
} from './UserDetails.styled';
import { useStore } from '@nanostores/react';
import { $amountFrom, $amountTo, $course, $sourceCurrency, $targetCurrency } from '../../stores/currencies.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft } from '@salutejs/plasma-icons';
import { $email, $referralCode, $requisites } from '../../stores/payout.store';
import { Payout } from '../../api/types/common';

interface UserDetailsProps {
    createPayout: (
        sourceCurrencyId: number,
        targetCurrencyId: number,
        amountFrom: number,
        amountTo: number,
        requisites: string,
        course: number,
        email: string,
        referralCode: string | null,
    ) => Promise<Payout>;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ createPayout }) => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);
    const course = useStore($course);

    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    const navigate = useNavigate();

    const [requisites, setRequisites] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [referralCode, setReferralCode] = React.useState('');

    const [emailError, setEmailError] = React.useState('');

    const handleSubmit = async () => {
        $requisites.set(requisites);
        $email.set(email);
        $referralCode.set(referralCode);

        if (sourceCurrency?.id && targetCurrency?.id && course) {
            const newPayout = await createPayout(
                sourceCurrency?.id,
                targetCurrency?.id,
                amountFrom,
                amountTo,
                requisites,
                course.course,
                email,
                referralCode ? referralCode : null,
            );

            navigate(ROUTES.payment(newPayout.id));
        }
    };

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (e.target.value && !isValidEmail(e.target.value)) {
            setEmailError('Невверный формат электронной почты');
        } else {
            setEmailError('');
        }
    };

    const handleBack = () => {
        navigate(ROUTES.root);
    };

    return (
        <StyledLayout>
            <StyledContent>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="white" />
                    </StyledButtonBack>

                    <Breadcrumbs
                        path={[
                            { number: 1, name: 'Ввод реквизитов', isActive: true },
                            { number: 2, name: 'Оплата заявки', isActive: false },
                            { number: 3, name: 'Завершение', isActive: false },
                        ]}
                    />
                </Row>
                <TwoBlocks>
                    <StyledUserForm>
                        <StyledHeader>Отправитель</StyledHeader>
                        <StyledTextField
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            helperText={emailError}
                        />
                        <StyledTextField
                            placeholder="Промокод (необязательно)"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                        />
                    </StyledUserForm>

                    <StyledUserForm>
                        <StyledHeader>Реквизиты</StyledHeader>
                        <StyledTextField
                            placeholder="Реквизиты"
                            value={requisites}
                            onChange={(e) => setRequisites(e.target.value)}
                        />
                    </StyledUserForm>
                </TwoBlocks>

                <StyledButton disabled={!requisites || !email || Boolean(emailError)} onClick={handleSubmit}>
                    Начать транкзацию
                </StyledButton>
            </StyledContent>
        </StyledLayout>
    );
};
