import { useStore } from '@nanostores/react';
import styled from 'styled-components';
import { $user } from '../../stores/user.store';
import { addNotification, Button, Spinner, TextField } from '@salutejs/plasma-web';
import React from 'react';
import { IconDone } from '@salutejs/plasma-icons';
import { addRequisites, getRefferalPay } from '../../api/handlers';
import { Button as ButtonBase } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;

    @media (max-width: 450px) {
        min-width: 0;
    }
`;

const Headline = styled.div`
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--accent);
`;

const Description = styled.div`
    width: 35rem;
    font-size: 1.5rem;
    color: var(--accentText);
    opacity: 0.7;
`;

const StyledTextField = styled(TextField)`
    width: 30rem;
    font-size: 1.5rem;

    & > div {
        height: 4.5rem !important;
        background: var(--backgroundSecondary) !important;
        border-radius: 1.3rem !important;
    }

    > div {
        box-shadow: none !important;
    }

    & input,
    div > div > div {
        padding-left: 0.5rem;
        color: var(--accentText) !important;
    }

    div > div > div > div {
        padding-left: 1rem !important;
        opacity: 0.7;
    }
`;

const Skeleton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30rem;
    height: 4.5rem;
    background: var(--backgroundSecondary);
    border-radius: 1.3rem;
`;

const RefferalPayButton = styled(ButtonBase)`
    height: 4rem;
    max-width: 30rem;
    font-size: 1.5rem;
    margin-top: 1rem;
    border-radius: 1.3rem;
`;

export const RequisitesCard = () => {
    const user = useStore($user);
    const navigate = useNavigate();

    const [requiustes, setRequisites] = React.useState(user?.requisites || '');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setRequisites(user?.requisites || '');
        setIsLoading(false);
    }, [user?.requisites]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequisites(e.target.value);
    };

    const onSubmit = async () => {
        try {
            await addRequisites(requiustes);

            addNotification(
                {
                    title: 'Реквизиты успешно сохранены',
                    titleColor: 'var(--text)',
                    backgroundColor: 'var(--accent)',
                    style: { fontSize: '1.5rem' },
                },
                3000,
            );
        } catch {
            addNotification(
                {
                    title: 'Ошибка сохранения реквизитов',
                    style: { fontSize: '1.5rem' },
                    view: 'negative',
                    backgroundColor: 'var(--backgroundSecondary)',
                },
                3000,
            );
        }
    };

    const getRefferalPayment = async () => {
        try {
            if (user?.id) {
                const payout = await getRefferalPay(user.id);

                addNotification(
                    {
                        title: 'Заявка на реферальную выплату успешно создана',
                        titleColor: 'var(--text)',
                        backgroundColor: 'var(--accent)',
                        style: { fontSize: '1.5rem' },
                    },
                    3000,
                );

                navigate(ROUTES.payoutStatus(payout.id));
            }
        } catch (error) {
            if (error === 'Balance is zero or negative: 0.00') {
                addNotification(
                    {
                        title: 'Ошибка. Ваш баланс равен 0',
                        style: { fontSize: '1.5rem' },
                        view: 'negative',
                        backgroundColor: 'var(--backgroundSecondary)',
                    },
                    3000,
                );

                return;
            }

            addNotification(
                {
                    title: 'Ошибка создания заявки на реферальную выплату',
                    style: { fontSize: '1.5rem' },
                    view: 'negative',
                    backgroundColor: 'var(--backgroundSecondary)',
                },
                3000,
            );
        }
    };

    return (
        <Card>
            <Headline>Реквизиты:</Headline>
            <Description>
                Реквизиты вашего счёта <p style={{ color: 'var(--accent)', display: 'inline' }}>Tether TRC20</p> для
                получения реферальной выплаты
            </Description>
            {isLoading ? (
                <Skeleton>
                    <Spinner size="2rem" color="var(--accent)" />
                </Skeleton>
            ) : (
                <StyledTextField
                    chipView="positive"
                    value={requiustes}
                    placeholder="Добавьте реквизиты"
                    onChange={onChange}
                    contentRight={
                        <Button view="clear" onClick={onSubmit}>
                            <IconDone size="m" color="var(--accent)" />
                        </Button>
                    }
                    contentLeft={<img src="/images/tether.png" alt="" style={{ width: '2rem' }} />}
                />
            )}

            <RefferalPayButton disabled={!requiustes} onClick={getRefferalPayment}>
                Получить реферальную выплату
            </RefferalPayButton>
            {!requiustes && (
                <Description style={{ fontSize: '1.3rem' }}>
                    Для получение реферальной выплаты введите реквизиты Tether TRC20
                </Description>
            )}
        </Card>
    );
};
