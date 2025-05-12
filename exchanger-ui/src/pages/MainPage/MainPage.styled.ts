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

    @media (max-width: 450px) {
        flex-direction: column;
        row-gap: 3rem;
    }
`;

export const StyledDescription = styled.div`
    width: 45rem;
    font-size: 4.2rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    color: var(--accentText);

    @media (max-width: 1500px) {
        font-size: 3.5rem;
        width: 90%;
        text-align: center;
    }

    @media only screen and (max-width: 1330px) {
        font-size: 3rem;
        width: 80%;
    }

    @media only screen and (max-width: 800px) {
        font-size: 2.5rem;
        width: 90%;
    }
`;

export const DescriptionColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3.5rem;

    @media (max-width: 1500px) {
        align-items: center;
        row-gap: 2rem;
    }
`;

export const Badge = styled.div`
    background-color: var(--backgroundSecondary);
    display: flex;
    column-gap: 1rem;
    color: var(--accentText);
    border-radius: 2rem;
    width: fit-content;
    padding: 1rem 1.5rem;
    font-size: 1.6rem;
    font-weight: 600;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 450px) {
        font-size: 1.3rem;
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

    @media only screen and (max-width: 780px) {
        flex-direction: column;
    }

    @media only screen and (max-width: 850px) {
        padding: 0rem 4rem;
    }
`;

export const PartnersContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-top: 2rem;

    @media only screen and (max-width: 780px) {
        flex-direction: column;
    }
`;

export const Description = styled.div`
    color: var(--backgroundFourth);
`;

export const Row = styled.div`
    display: flex;
    column-gap: .5rem;
    align-items: center;
`;

export const PartnersRow = styled(Row)`
    align-items: center;

    @media only screen and (max-width: 780px) {
        flex-direction: column;
        margin-top: 2rem;
    }

    @media only screen and (max-width: 500px) {
        flex-direction: column;
        row-gap: .8rem;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 500px) {
        align-items: center;
    }
`;

export const Link = styled.a`
    color: black;
    font-size: 1.5rem;
    font-weight: 600;
    text-decoration: none;

    &:visited {
        color: var(--text);
    }
`;

export const Img = styled.img`
    height: 4rem;
    object-fit: contain;
`;

export const Partner = styled.img`
    height: 1.6rem;
    margin-right: 1rem;
    object-fit: contain;
`;
