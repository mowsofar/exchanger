import styled from "styled-components";

export const StyledRoot = styled.div`
    height: 70rem;
    width: 40rem;
    border-radius: 23px;
    background-color: var(--backgroundSecondary);
    padding: 15px;
`;

export const StyledHeader = styled.div`
    color: white;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    padding: 3rem;
    color: white;
`;

export const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 10px;
    color: white;
    align-items: center;
    font-family: Onest;
    font-size: 2rem;
    background-color: #393939;
    border-radius: 1.6rem;
`;

export const StyledCourse = styled(StyledCard)`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: white;
    align-items: center;
    font-family: Onest;
    font-size: 1.8rem;
    font-weight: 600;
    
    & div:first-child {
        color: var(--accent);
        font-weight: 600;
    }
`;

export const StyledAmountCard = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    word-break: break-all;

    &:first-child {
        font-weight: 700;
        font-size: 1.7rem;
        max-width: 20rem;
    }
`;

export const Amount = styled.div`
    font-weight: 600;
    font-size: 2rem;
    color: var(--accent);
`;

export const Currnecy = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
    font-weight: 600;
`;

export const Img = styled.img`
    height: 30px;
`;