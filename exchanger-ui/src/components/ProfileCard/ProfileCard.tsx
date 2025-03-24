import { useStore } from '@nanostores/react';
import styled from 'styled-components';
import { $user } from '../../stores/user.store';

const Card = styled.div`
    width: 30rem;
    font-size: 1.7rem;
    padding: 3rem;
    background-color: var(--backgroundSecondary);
    border-radius: 2.5rem;
    color: var(--backgroundTertiary);
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

const CardItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const UserData = styled.div`
    color: white;
    font-weight: 600;
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
        </Card>
    );
};
