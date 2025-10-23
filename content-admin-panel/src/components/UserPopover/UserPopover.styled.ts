import { surfaceSolidCard, textPrimary, textSecondary } from '@salutejs/plasma-themes/tokens';
import { BodyL, BodyS, Button, Popover } from '@salutejs/plasma-web';
import styled from 'styled-components';

export const StyledPopover = styled(Popover)`
    & > .popover-open {
        border-radius: 0.75rem;
    }
`;

export const Container = styled.div`
    position: relative;
    width: 100%;
    min-width: 18rem;
    border-radius: 0.75rem;
    padding: 1.5rem 0.5rem 1rem;
    background: ${surfaceSolidCard};
`;

export const AvatarContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

export const Name = styled(BodyL)`
    color: ${textPrimary};
    text-align: center;
`;

export const Email = styled(BodyS)`
    color: ${textSecondary};
    text-align: center;
`;

export const ButtonsContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;

export const StyledButton = styled(Button)`
    font-weight: 500;
`;
