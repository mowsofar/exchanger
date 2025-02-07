import styled from 'styled-components';

export const StyledLayout = styled.div`
    display: flex;
    column-gap: 10vw;
    height: 100vh;
    background-color: var(--backgroundPrimary);
    align-items: center;
    justify-content: center;
    z-index: -1;
`;

export const StyledDescription = styled.div`
    width: 500px;
    font-size: 3.3rem;
    font-weight: 600;
    color: white;
`;

export const Shade1 = styled.img`
    height: auto;
    position: absolute;
    top: 0;
    opacity: .45;
    width: 100%;
    z-index: 0;
`;

export const Shade2 = styled.img`
    height: auto;
    left: 0;
    max-width: 68.4rem;
    opacity: .45;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
`;

export const Shade3 = styled.img`
    height: auto;
    right: 0;
    max-width: 68.4rem;
    opacity: .45;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
`;