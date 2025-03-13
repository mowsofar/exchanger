import styled from 'styled-components';

const StyledRoot = styled.div`
    background: transparent;
    height: 100px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.img`
    height: 7.5rem;
    margin-left: 3rem;

    @media only screen and (max-height: 850px) and (max-width: 500px) {
        height: 4rem;
    }
`;

export const Header = () => {
    return (
        <StyledRoot>
            <Logo src="/images/kykyshka.png" />
        </StyledRoot>
    );
};
