import { IconMessageQuestionOutline, IconProfileCircleFill } from '@salutejs/plasma-icons';
import { surfaceSolid03 } from '@salutejs/plasma-tokens';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';

const StyledRoot = styled.div`
    height: 84px;
    min-height: 84px;
    padding: 0 31px 0 34px;

    border-bottom: 1px solid ${surfaceSolid03};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.img`
    height: 60px;
`;

const StyledRightHeaderButtons = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
`;

const StyledButton = styled(Button)`
    height: 45px;
    width: 50px !important;
`;

export const Header: React.FC = () => {
    return (
        <StyledRoot>
            <Logo src="images/logo-kykyshka2.png" />
            <StyledRightHeaderButtons>
                <StyledButton view="secondary">
                    <IconMessageQuestionOutline />
                </StyledButton>
                <IconProfileCircleFill size="m" />
            </StyledRightHeaderButtons>
        </StyledRoot>
    );
};
