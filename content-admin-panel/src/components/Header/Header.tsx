import { IconProfileCircleFill } from '@salutejs/plasma-icons';
import { surfaceSolid03 } from '@salutejs/plasma-tokens';
import styled from 'styled-components';

const StyledRoot = styled.div`
    height: 84px;
    min-height: 84px;
    padding: 0 31px 0 34px;

    border-bottom: 1px solid ${surfaceSolid03};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    font-size: 20px;
    display: flex;
    column-gap: 10px;
    align-items: center;
    text-transform: lowercase;
`;

export const Header: React.FC = () => {
    return (
        <StyledRoot>
            <Logo>
                <div style={{ fontWeight: '600' }}>Exchanger</div>
            </Logo>
            <IconProfileCircleFill size="m" />
        </StyledRoot>
    );
};
