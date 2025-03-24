import { useStore } from '@nanostores/react';
import styled from 'styled-components';
import { $user } from '../../stores/user.store';

const Card = styled.div`
    width: 35rem;
    font-size: 1.7rem;
    padding: 3rem;
    background-color: var(--backgroundSecondary);
    border-radius: 2.5rem;
    color: white;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

const CardItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ProfileCard = () => {
    const user = useStore($user);

    return (
        <Card>
            <CardItem>
                <div>Имя:</div>
                <div>{user?.firstname}</div>
            </CardItem>

            <CardItem>
                <div>Фамилия:</div>
                <div>{user?.lastname}</div>
            </CardItem>

            <CardItem>
                <div>E-mail:</div>
                <div>{user?.email}</div>
            </CardItem>
        </Card>
    );
};
