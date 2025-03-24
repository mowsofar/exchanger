import styled from 'styled-components';

export const StyledLayout = styled.div`
    display: flex;
    column-gap: 10vw;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media (max-width: 1300px) {
        flex-direction: column;
        width: 100%;
        row-gap: 5rem;
        overflow: scroll;
    }
`;

export const StyledDescription = styled.div`
    width: 500px;
    font-size: 6.5rem;
    font-weight: 600;
    color: white;

    @media only screen and (max-width: 1330px) {
        max-width: 100%;
        text-align: center;
    }

    @media only screen and (max-width: 1024px) {
        font-size: 28px;
        max-width: 100%;
    }
`;