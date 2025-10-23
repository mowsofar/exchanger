import { PayoutsFilter } from '../../components/PayoutsFilter/PayoutsFilter';
import { PayoutsList } from '../../components/PayoutsList/PayoutsList';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { RequisitesCard } from '../../components/RequisitesCard/RequisitesCard';
import { useUserAccountPage } from './AccountPage.hooks';
import { Column, RightColumn, Root, StyledHeader, StyledLayout } from './AccountPage.styled';

export const AccountPage: React.FC = () => {
    const { isLoading } = useUserAccountPage();

    return (
        <>
            <title>Личный кабинет</title>

            <Root>
                <StyledLayout>
                    <Column>
                        <StyledHeader>Аккаунт</StyledHeader>
                        <ProfileCard />
                        <RequisitesCard />
                        <PayoutsFilter />
                    </Column>

                    <RightColumn>
                        <StyledHeader>Мои заявки</StyledHeader>
                        <PayoutsList isLoading={isLoading} />
                    </RightColumn>
                </StyledLayout>
            </Root>
        </>
    );
};
