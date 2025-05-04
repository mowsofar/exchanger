import styled from 'styled-components';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
`;

export const ContentWrapper = styled.div`
    flex: 1;
`;

export const StyledLayout = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    column-gap: 10vw;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media (max-width: 1500px) {
        flex-direction: column;
        row-gap: 5rem;
    }
`;

export const StyledDescription = styled.div`
    width: 45rem;
    font-size: 5rem;
    font-weight: 600;
    color: var(--accentText);

    @media (max-width: 1500px) {
        width: 100%;
        text-align: center;
    }

    @media only screen and (max-width: 1330px) {
        font-size: 4rem;
        width: 100%;
    }

    @media only screen and (max-width: 800px) {
        font-size: 3rem;
    }
`;

export const StyledFooter = styled.footer`
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    padding: .5rem 10rem;
    background: var(--accent);
    text-align: center;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    margin-top: auto;

    @media only screen and (max-width: 850px) {
        padding: 0rem 4rem;
    }
`;

export const FooterContainer = styled.div`
    padding-top: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 500px) {
        flex-direction: column;
    }
`;

export const PartnersContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-top: 2rem;

    @media only screen and (max-width: 500px) {
        flex-direction: column;
    }
`;

export const Description = styled.div`
    color: var(--backgroundSecondary);
    font-weight: 600;
`;

export const Row = styled.div`
    display: flex;
    column-gap: 1rem;
    align-items: center;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 500px) {
        align-items: center;
    }
`;

export const Link = styled.a`
    font-weight: 600;
    color: var(--text);
    font-size: 1.6rem;
    text-decoration: none;

    &:visited {
        color: var(--text);
    }
`;

export const Img = styled.img`
    height: 4rem;
    width: fit-content;
`;

export const Partner = styled.img`
    height: 1.6rem;
    margin-right: 1rem;
    width: fit-content;
`;
