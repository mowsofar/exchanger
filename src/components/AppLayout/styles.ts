import styled from 'styled-components';

export const StyledLayout = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const StyledTwoColumnsRoot = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
    flex-grow: 2;
    flex-direction: row;
    height: 100%;
`;

export const StyledLeftColumn = styled.div`
    max-width: 314px;
    border-right: 1px solid #ECECEB;
    display: flex;
`;

export const StyledRightColumn = styled.div`
    position: relative;
    overflow-y: auto;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    min-width: 1400px;
    background-color: #ececeb;
`;