import styled from "styled-components";

export const Root = styled.div`
    padding: 5rem 10rem;
    width: 80%;

    @media only screen and (max-width: 800px) {
        width: 100%;
        padding: 5rem 2rem;
    }
`;

export const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    height: 100%;
    width: 100%;
    z-index: 1;
`;

export const StyledHeader = styled.div`
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent);
`;