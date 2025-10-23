import styled from 'styled-components';

export const Root = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledLayout = styled.div`
    display: flex;
    padding: 5rem 8rem;
    column-gap: 5rem;
    z-index: 1;

    @media only screen and (max-width: 820px) {
        flex-direction: column;
        row-gap: 5rem;
        padding: 3rem 1.5rem;
    }

    @media only screen and (max-width: 450px) {
        margin-top: -5rem;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4rem;

    @media only screen and (max-width: 820px) {
        > div:last-child {
            display: none;
        }
    }
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    width: 100%;
    flex-grow: 1;
`;

export const StyledHeader = styled.div`
    font-size: 2.8rem;
    font-weight: 600;
    color: var(--accent);
`;
