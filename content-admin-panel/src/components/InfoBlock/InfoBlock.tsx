import React from 'react';
import styled from 'styled-components';
import { secondary, primary, surfaceLiquid02 } from '@salutejs/plasma-tokens';

const StyledInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    background-color: ${surfaceLiquid02};
    padding: 10px 20px;
    border-radius: 18px;
    min-width: 220px;

    & div:first-child {
        font-weight: 600;
        color: ${secondary};
    }

    & div:last-child {
        color: ${primary};
        font-size: 20px;
    }
`;

export const InfoBlock: React.FC<{ label: string; value: any }> = ({ label, value }) => {
    return (
        <StyledInfoBlock>
            <div>{label}</div>
            <div>{value}</div>
        </StyledInfoBlock>
    );
};
