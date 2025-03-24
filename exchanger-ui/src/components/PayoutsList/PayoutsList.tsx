import { useStore } from '@nanostores/react';
import styled from 'styled-components';
import { $user } from '../../stores/user.store';
import { getPayoutStatus } from '../../utils/getPayoutStatus';
import { IconArrowRight } from '@salutejs/plasma-icons';
import { Button } from '@salutejs/plasma-web';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const Payouts = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 2rem;
    font-size: 2rem;
`;

const Root = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 3rem;
    width: 100%;
    background-color: var(--backgroundSecondary);
    border-radius: 2.5rem;
    color: white;
    align-items: center;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

const Status = styled.div`
    font-weight: 600;
`;

const PayoutDate = styled.div`
    opacity: 0.3;
    font-size: 1.8rem;
`;

const Direction = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;
    font-weight: 600;
    flex-wrap: wrap;
`;

const Icon = styled.img`
    width: 20px;
`;

const StyledButton = styled(Button)`
    font-family: Onest;
    color: white;
    font-weight: 600;
`;

const Plug = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: var(--backgroundTertiary);
`;

export const PayoutsList = () => {
    const user = useStore($user);
    const navigate = useNavigate();

    if (user?.payouts?.length === 0) {
        return <Plug>У вас пока нет активных заявок</Plug>;
    }

    return (
        <Payouts>
            {user?.payouts.map((payout) => {
                const createdAt = new Date(payout.createdAt).toLocaleString();

                return (
                    <Root>
                        <Card>
                            <PayoutDate>
                                Заявка №{payout.id} от {createdAt}
                            </PayoutDate>
                            <Status>{getPayoutStatus(payout)}</Status>

                            <Direction>
                                <Icon src={payout.srcCurrency?.paymentSystem.imagePath} />
                                <div>{payout.amountFrom}</div>
                                <div>{payout.srcCurrency?.currencyCode.code}</div>

                                <IconArrowRight color="white" />

                                <Icon src={payout.targetCurrency?.paymentSystem.imagePath} />
                                <div>{payout.amountTo}</div>
                                <div>{payout.targetCurrency?.currencyCode.code}</div>
                            </Direction>
                        </Card>
                        <StyledButton view="clear" onClick={() => navigate(ROUTES.payoutStatus(payout.id))}>
                            Подробнее
                        </StyledButton>
                    </Root>
                );
            })}
        </Payouts>
    );
};
