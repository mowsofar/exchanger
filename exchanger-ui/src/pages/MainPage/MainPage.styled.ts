import styled from 'styled-components';

export const StyledLayout = styled.div`
    display: flex;
    column-gap: 10vw;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media (max-width: 1500px) {
        flex-direction: column;
        row-gap: 5rem;
        width: 100%;
        row-gap: 5rem;
    }
`;

export const StyledDescription = styled.div`
    width: 45rem;
    font-size: 5rem;
    font-weight: 600;
    color: white;

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