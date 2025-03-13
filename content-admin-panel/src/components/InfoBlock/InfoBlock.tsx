import React from 'react';
import styled from 'styled-components';
import { secondary, primary, surfaceLiquid02 } from '@salutejs/plasma-tokens';
import { IconCopyFill } from '@salutejs/plasma-icons';
import { Button } from '@salutejs/plasma-web';

const StyledInfoBlock = styled.div<{ isCopied: boolean }>`
    font-size: 15px;
    background-color: ${({ isCopied }) => (isCopied ? '#cfe5cd' : surfaceLiquid02)};
    padding: 10px 20px;
    border-radius: 18px;
    min-width: 220px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const Label = styled.div`
    font-weight: 600;
    color: ${secondary};
`;

const Value = styled.div`
    color: ${primary};
    font-size: 17px;
`;

const TwoColumns = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonCopy = styled(Button)`
    align-self: center;
    width: 40px !important;
`;

export const InfoBlock: React.FC<{ label: string; value: any; hasCopyButton?: boolean }> = ({
    label,
    value,
    hasCopyButton,
}) => {
    const [isCopied, setCopied] = React.useState(false);

    return (
        <StyledInfoBlock isCopied={isCopied}>
            <TwoColumns>
                <Card>
                    <Label>{label}</Label>
                    <Value>{value}</Value>
                </Card>
                {hasCopyButton && (
                    <ButtonCopy
                        view="clear"
                        onClick={() => {
                            setCopied(true);
                            navigator.clipboard.writeText(value);
                        }}
                    >
                        <IconCopyFill color={secondary} />
                    </ButtonCopy>
                )}
            </TwoColumns>
        </StyledInfoBlock>
    );
};
