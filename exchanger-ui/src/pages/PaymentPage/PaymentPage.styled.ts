import styled from 'styled-components';

export const StyledLayout = styled.div`
    display: flex;
    column-gap: 5vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media (max-width: 1300px) {
        flex-direction: column;
        width: 100%;
        row-gap: 10rem;
        overflow: scroll;
    }

    @media (max-width: 800px) {
        padding-top: 10rem;
        row-gap: 5vh;
    }

    @media (max-width: 400px) {
        padding-top: 20rem;
        row-gap: 5vh;
    }
`;