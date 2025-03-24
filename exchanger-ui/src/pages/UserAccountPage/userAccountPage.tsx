import { PayoutsList } from '../../components/PayoutsList/PayoutsList';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { useUserAccountPage } from './userAccountPage.hooks';
import { Root, StyledHeader, StyledLayout } from './userAccountPage.styled';

export const UserAccountPage: React.FC = () => {
    useUserAccountPage();

    return (
        <>
            <title>Личный кабинет</title>

            <Root>
                <StyledLayout>
                    <StyledHeader>Аккауант</StyledHeader>
                    <ProfileCard />
                    <StyledHeader>Мои заказы</StyledHeader>
                    <PayoutsList />
                </StyledLayout>
            </Root>
        </>
    );
};
