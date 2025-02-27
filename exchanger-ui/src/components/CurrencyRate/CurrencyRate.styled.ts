import styled, { keyframes } from "styled-components";

export const StyledRoot = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 20px;
    text-align: center;
    align-items: center;
    color: white;
    font-weight: 600;
`;

export const CountDown = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Seconds = styled.label`
    position: absolute;
    left: 14px;
`;

export const CountDownContainer = styled.div`
    transform: rotate(90deg);
`;

export const Svg = styled.svg`
    width: 40px;
    height: 40px;
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