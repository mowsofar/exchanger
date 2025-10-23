import React from 'react';
import { useForm } from 'react-hook-form';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    ButtonBlock,
    Row,
    Rules,
    StyledButton,
    StyledButtonBack,
    StyledCheckbox,
    StyledForm,
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
import { $email, $requisites } from '../../stores/payout.store';
import { AdditionalField, Payout } from '../../api/types/common';
import { formatToSubmit } from '../../utils/formatNumber';

interface UserDetailsProps {
    createPayout: (
        sourceCurrencyId: number,
        targetCurrencyId: number,
        amountFrom: number,
        amountTo: number,
        requisites: string,
        sourceFields: { fieldId: number; userValue: string; nameIdentify: string }[],
        targetFields: { fieldId: number; userValue: string; nameIdentify: string }[],
        course: number,
        email: string,
    ) => Promise<Payout>;
}

interface FormValues {
    email: string;
    requisites: string;
    sourceFields: Record<string, string>;
    targetFields: Record<string, string>;
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

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormValues>({
        defaultValues: {
            email: localStorage.getItem('email') || '',
            requisites: '',
            sourceFields: {},
            targetFields: {},
        },
    });

    const [isChecked, setIsChecked] = React.useState(false);

    const transformFormData = (data: Record<string, string>, additionalFields: AdditionalField[] = []) => {
        return Object.keys(data).map((key) => {
            const fieldId = Number(key);
            const fieldInfo = additionalFields.find((field) => field.id === fieldId);
            return {
                fieldId,
                userValue: data[key],
                nameIdentify: fieldInfo?.nameIdentify || '',
            };
        });
    };

    const onSubmit = async (data: FormValues) => {
        $requisites.set(data.requisites);
        $email.set(data.email);

        if (sourceCurrency?.id && targetCurrency?.id && course) {
            try {
                const newPayout = await createPayout(
                    sourceCurrency.id,
                    targetCurrency.id,
                    formatToSubmit(amountFrom),
                    formatToSubmit(amountTo),
                    data.requisites.replace(/\s+/g, ''),
                    transformFormData(data.sourceFields, sourceAdditionalFields),
                    transformFormData(data.targetFields, targetAdditionalFields),
                    course.course,
                    data.email,
                );

                navigate(ROUTES.payment(newPayout.id), {
                    state: { from: ROUTES.userDetails(sourceCurrency.id, targetCurrency.id) },
                });
            } catch (error) {
                // Обработка ошибки
            }
        }
    };

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validateRequisitesLength = (value: string) => {
        const cleanValue = value.replace(/\D/g, '');
        return (cleanValue.length >= 16 && cleanValue.length <= 18) || 'Номер карты должен содержать от 16 до 18 цифр';
    };

    const handleBack = () => {
        navigate(ROUTES.root);
    };

    const handleChangeRequisites = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setValue('requisites', value);
    };

    const handleChangeUSDTRequisites = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('requisites', e.target.value);
    };

    const handleChangeCoinRequisites = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('requisites', e.target.value);
    };

    const getRequisitesField = () => {
        switch (targetCurrency?.filterType) {
            case 'COIN':
                return (
                    <StyledTextField
                        placeholder="Криптовалютный кошелёк"
                        {...register('requisites', { required: true })}
                        error={!!errors.requisites}
                        helperText={errors.requisites?.message}
                        onChange={handleChangeCoinRequisites}
                    />
                );
            case 'RUB': {
                return (
                    <StyledTextField
                        placeholder="Номер карты (от 16 до 18 цифр)"
                        {...register('requisites', {
                            required: true,
                            validate: (value) => validateRequisitesLength(value),
                        })}
                        onChange={handleChangeRequisites}
                        error={!!errors.requisites}
                        helperText={errors.requisites?.message}
                    />
                );
            }
            case 'USDT': {
                return (
                    <StyledTextField
                        placeholder="Номер карты"
                        {...register('requisites', { required: 'Реквизиты обязательны' })}
                        onChange={handleChangeUSDTRequisites}
                        error={!!errors.requisites}
                        helperText={errors.requisites?.message}
                    />
                );
            }
            default:
                return null;
        }
    };

    return (
        <StyledLayout>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="var(--accentText)" />
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
                            {...register('email', {
                                required: true,
                                validate: (value) => isValidEmail(value) || 'Неверный формат электронной почты',
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        {sourceAdditionalFields?.map((field) => (
                            <StyledTextField
                                key={field.id}
                                placeholder={field.fieldName}
                                {...register(`sourceFields.${field.id}`, {
                                    required: 'Обязательно для заполнения',
                                })}
                                error={!!errors.sourceFields?.[field.id]}
                            />
                        ))}
                    </StyledUserForm>

                    <StyledUserForm>
                        <StyledHeader>Получатель</StyledHeader>

                        {getRequisitesField()}

                        {targetAdditionalFields?.map((field) => (
                            <StyledTextField
                                key={field.id}
                                placeholder={field.fieldName}
                                {...register(`targetFields.${field.id}`, {
                                    required: 'Обязательно для заполнения',
                                })}
                                error={!!errors.targetFields?.[field.id]}
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
                    <StyledButton disabled={!isChecked}>Начать транзакцию</StyledButton>
                </ButtonBlock>
            </StyledForm>
        </StyledLayout>
    );
};
