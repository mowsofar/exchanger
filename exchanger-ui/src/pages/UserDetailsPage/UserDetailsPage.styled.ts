import styled from 'styled-components';

export const Root = styled.div`
    height: 100%;
    width: 100%;
`;

export const StyledLayout = styled.div`
    display: flex;
    column-gap: 5vw;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media (max-width: 1300px) {
        flex-direction: column;
        row-gap: 5rem;
        overflow: scroll;
        align-items: center;
    }
`;