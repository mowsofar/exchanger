import { blackSecondary } from '@salutejs/plasma-tokens';
import { applySpacing, ParagraphText1, Subtitle, Switch } from '@salutejs/plasma-web';
import styled from 'styled-components';

export const StyledRoot = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledContent = styled.div`
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 30px;
`;

export const StyledSubtitle = styled(Subtitle)`
    margin-top: 20px;
`;

export const StyledDescription = styled(ParagraphText1)`
    ${applySpacing};
    color: ${blackSecondary};
    hyphens: initial;
`;

export const StyledSwitch = styled(Switch)`
    align-self: flex-start;
`;