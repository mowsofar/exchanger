import React from 'react';
import styled from 'styled-components';
import { secondary, primary, surfaceLiquid02 } from '@salutejs/plasma-tokens';
import { IconCopyFill } from '@salutejs/plasma-icons';
import { Button } from '@salutejs/plasma-web';
import { Currency } from '../../api/types/common';

const StyledInfoBlock = styled.div<{ isCopied: boolean }>`
    font-size: 13px;
    background-color: ${({ isCopied }) => (isCopied ? '#cfe5cd' : surfaceLiquid02)};
    padding: 7px 4px 0px 16px;
    border-radius: 15px;
    min-width: 220px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 7px;
`;

const Label = styled.div`
    font-weight: 600;
    color: ${secondary};
`;

const Value = styled.div`
    display: flex;
    column-gap: 30px;
    color: ${primary};
    font-size: 14px;
    font-weight: 600;
`;

const TwoColumns = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonCopy = styled(Button)`
    align-self: center;
    width: 40px !important;
`;

const Icon = styled.img`
    height: 20px;
    border-radius: 3px;
`;

const CurrencyBlock = styled.div`
    display: flex;
    column-gap: 6px;
    align-items: center;

    & div {
        font-weight: 500;
    }
`;

const Amount = styled.div`
    display: flex;
    font-weight: 600;
    font-size: 16px;
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

export const InfoBlockCurrency: React.FC<{
    label: string;
    currency: Currency;
    value: any;
    hasCopyButton?: boolean;
}> = ({ label, currency, value, hasCopyButton }) => {
    const [isCopied, setCopied] = React.useState(false);

    return (
        <StyledInfoBlock isCopied={isCopied}>
            <TwoColumns>
                <Card>
                    <Label>{label}</Label>
                    <Value>
                        <CurrencyBlock>
                            <Icon src={currency.paymentSystem.imagePath} />
                            <div>{currency?.currencyCode.code}</div>
                        </CurrencyBlock>

                        <Amount>{value}</Amount>
                    </Value>
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
