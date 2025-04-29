import styled from "styled-components";

export const StyledRoot = styled.div`
    height: 65rem;
    width: 38rem;
    border-radius: 23px;
    background-color: var(--backgroundSecondary);
    padding: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: .5rem;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background-color: var(--backgroundTertiary);
    }

    @media (max-width: 1300px) {
        width: 80%;
        height: fit-content;
    }
`;

export const StyledHeader = styled.div`
    color: white;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    padding: 2rem;
    color: white;

    @media (max-width: 1300px) {
        font-size: 1.8rem;
    }
`;

export const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    margin-bottom: 10px;
    color: white;
    align-items: center;
    font-family: Onest;
    font-size: 2rem;
    background-color: #393939;
    border-radius: 1.7rem;

    @media (max-width: 1300px) {
        font-size: 1.5rem;
        padding: 1.3rem;
        border-radius: 1.2rem;
    }
`;

export const StyledCourse = styled(StyledCard)`
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    color: white;
    align-items: center;
    font-family: Onest;
    font-size: 1.7rem;
    font-weight: 600;
    column-gap: 1.2rem;
    
    & div:first-child {
        color: var(--accent);
        font-weight: 600;
    }
`;

export const StyledAmountCard = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    word-break: break-all;

    &:first-child {
        font-weight: 700;
        font-size: 1.7rem;
        max-width: 20rem;
    }
`;

export const Amount = styled.div`
    font-weight: 600;
    font-size: 1.8rem;
    color: var(--accent);
`;

export const Currnecy = styled.div`
    display: flex;
    column-gap: 1rem;
    align-items: center;
    font-weight: 600;
`;

export const Img = styled.img`
    height: 2.8rem;
    border-radius: .5rem;
`;