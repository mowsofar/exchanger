import styled from "styled-components";

export const StyledRoot = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 2rem;
    text-align: center;
    align-items: center;
    color: white;
    font-size: 1.9rem;
    font-weight: 600;

    @media only screen and (max-width: 820px) {
        font-size: 1.6rem;
    }

    @media only screen and (max-width: 450px) {
       font-size: 1.4rem;
       column-gap: 1rem;
    }
`;

export const CountDown = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Seconds = styled.label`
    position: absolute;
    left: 1.4rem;
    font-size: 1.7rem;

    @media only screen and (max-width: 450px) {
        left: 1.5rem;
       font-size: 1.3rem;
    }
`;

export const CountDownContainer = styled.div`
    transform: rotate(90deg);
`;

export const Svg = styled.svg`
    width: 4rem;
    height: 4rem;
    transform: scale(-1, 1);
    overflow: visible;
`;

export const Circle = styled.circle`
    stroke-linecap: round;
    stroke-width: 3px;
    stroke: var(--accent);
    fill: none;
    transition: all 1.5s ease-in-out;
`;

export const Skeleton = styled.div`
    background-color: var(--backgroundSecondary);
    border-radius: 2rem;
    height: 4.6rem;
    width: 8rem;
`;