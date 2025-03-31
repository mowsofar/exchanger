import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    ButtonBlock,
    Row,
    Rules,
    StyledButton,
    StyledButtonBack,
    StyledCheckbox,
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
import { formatToSubmit } from '../../utils/formatNumber';

interface UserDetailsProps {
    createPayout: (
        sourceCurrencyId: number,
        targetCurrencyId: number,
        amountFrom: number,
        amountTo: number,
        requisites: string,
        sourceFields: { fieldId: number; userValue: string }[],
        targetFields: { fieldId: number; userValue: string }[],
        course: number,
        email: string,
        referralCode: string | null,
    ) => Promise<Payout>;
}

interface FormData {
    [key: string]: string;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ createPayout }) => {
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);

    const course = useStore($course);

    const amountFrom = useStore($amountFrom);
    const amountTo = useStore($amountTo);

    const navigate = useNavigate();

    const sourceAdditionalFields = sourceCurrency?.additionalFieldsList.filter((item) => item.direction === 'SOURCE');
    const targetAdditionalFields = targetCurrency?.additionalFieldsList.filter((item) => item.direction === 'TARGET');

    const sourceFieldsInitial = sourceAdditionalFields?.reduce<FormData>((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {});

    const targetFieldsInitial = targetAdditionalFields?.reduce<FormData>((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {});

    const [requisites, setRequisites] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [referralCode, setReferralCode] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(false);

    const [emailError, setEmailError] = React.useState('');
    const [sourceFormData, setSourceFormData] = React.useState<FormData>(sourceFieldsInitial || {});
    const [targetFormData, setTargetFormData] = React.useState<FormData>(targetFieldsInitial || {});

    const transformFormData = (data: FormData) => {
        return Object.keys(data).map((key) => ({ fieldId: Number(key), userValue: data[key] }));
    };

    const handleSubmit = async () => {
        $requisites.set(requisites);
        $email.set(email);
        $referralCode.set(referralCode);

        if (sourceCurrency?.id && targetCurrency?.id && course) {
            try {
                const newPayout = await createPayout(
                    sourceCurrency?.id,
                    targetCurrency?.id,
                    formatToSubmit(amountFrom),
                    formatToSubmit(amountTo),
                    requisites.replace(/\s+/g, ''),
                    transformFormData(sourceFormData),
                    transformFormData(targetFormData),
                    course.course,
                    email,
                    referralCode ? referralCode : null,
                );

                navigate(ROUTES.payment(newPayout.id));
            } catch {}
        }
    };

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (e.target.value && !isValidEmail(e.target.value)) {
            setEmailError('Неверный формат электронной почты');
        } else {
            setEmailError('');
        }
    };

    const handleBack = () => {
        navigate(ROUTES.root);
    };

    const handleChangeSourceFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSourceFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeTargetFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTargetFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeRequisites = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

        setRequisites(value);
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
                            value={localStorage.getItem('email') || email}
                            onChange={handleEmailChange}
                            helperText={emailError}
                        />
                        <StyledTextField
                            placeholder="Промокод (необязательно)"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                        />

                        {sourceAdditionalFields?.map((field) => (
                            <StyledTextField
                                placeholder={field.fieldName}
                                value={sourceFormData[field.id]}
                                name={String(field.id)}
                                onChange={handleChangeSourceFields}
                            />
                        ))}
                    </StyledUserForm>

                    <StyledUserForm>
                        <StyledHeader>Получатель</StyledHeader>
                        <StyledTextField placeholder="Реквизиты" value={requisites} onChange={handleChangeRequisites} />

                        {targetAdditionalFields?.map((field) => (
                            <StyledTextField
                                placeholder={field.fieldName}
                                value={targetFormData[field.id]}
                                name={String(field.id)}
                                onChange={handleChangeTargetFields}
                            />
                        ))}
                    </StyledUserForm>
                </TwoBlocks>

                <ButtonBlock>
                    <StyledCheckbox
                        label={
                            <>
                                Соглашаюсь с{' '}
                                <Rules to={ROUTES.amlKyc} target="_blank">
                                    политикой AML
                                </Rules>{' '}
                                и{' '}
                                <Rules to={ROUTES.rules} target="_blank">
                                    правилами обмена
                                </Rules>
                            </>
                        }
                        checked={isChecked}
                        onClick={() => setIsChecked(!isChecked)}
                    />
                    <StyledButton
                        disabled={
                            !requisites ||
                            (!email && !localStorage.getItem('email')) ||
                            Boolean(emailError) ||
                            !isChecked
                        }
                        onClick={handleSubmit}
                    >
                        Начать транзакцию
                    </StyledButton>
                </ButtonBlock>
            </StyledContent>
        </StyledLayout>
    );
};
