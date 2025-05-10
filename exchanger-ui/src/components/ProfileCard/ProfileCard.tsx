import { useStore } from '@nanostores/react';
import styled from 'styled-components';
import { $user } from '../../stores/user.store';
import { Link } from 'react-router-dom';
import { accent } from '@salutejs/plasma-tokens';

const Card = styled.div`
    min-width: 35rem;
    font-size: 1.7rem;
    padding: 3rem;
    background-color: var(--backgroundSecondary);
    border-radius: 2.5rem;
    color: var(--accent);
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    font-weight: 600;

    @media (max-width: 450px) {
        min-width: 0;
    }
`;

const CardItem = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
`;

const UserData = styled.div`
    color: var(--accentText);
`;

const StyledLink = styled(Link)`
    font-size: 1.4rem;
    color: ${accent};
`;

export const ProfileCard = () => {
    const user = useStore($user);

    return (
        <Card>
            <CardItem>
                <div>Имя:</div>
                <UserData>{user?.firstname}</UserData>
            </CardItem>

            <CardItem>
                <div>Фамилия:</div>
                <UserData>{user?.lastname}</UserData>
            </CardItem>

            <CardItem>
                <div>E-mail:</div>
                <UserData>{user?.email}</UserData>
            </CardItem>

            {user?.referralCode && (
                <CardItem>
                    <div>Реферальная ссылка:</div>
                    <UserData>
                        <StyledLink to={`https://kykyshka.com/?ref=${user?.referralCode}`} target="_blank">
                            https://kykyshka.com/?ref={user?.referralCode}
                        </StyledLink>
                    </UserData>
                </CardItem>
            )}

            <CardItem>
                <div>Баланс:</div>
                <UserData>{user?.balance}</UserData>
            </CardItem>
        </Card>
    );
};
