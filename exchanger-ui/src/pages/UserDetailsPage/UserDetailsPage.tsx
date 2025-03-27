import { OperationInfo } from '../../components/OperationInfo/OperationInfo';
import { UserDetails } from '../../components/UserDetails/UserDetails';
import { useUserDetailsPage } from './UserDetails.hooks';
import { Root, StyledLayout } from './UserDetailsPage.styled';

export const UserDetailsPage: React.FC = () => {
    const { createNewPayout } = useUserDetailsPage();

    return (
        <>
            <title>Ввод реквизитов</title>

            <Root>
                <StyledLayout>
                    <OperationInfo />
                    <UserDetails createPayout={createNewPayout} />
                </StyledLayout>
            </Root>
        </>
    );
};
