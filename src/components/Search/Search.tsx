import React from 'react';
import styled from 'styled-components';
import { surfaceSolid01, surfaceSolid03, tertiary } from '@salutejs/plasma-tokens';
import { TextField } from '@salutejs/plasma-ui';
import { IconSearch } from '@salutejs/plasma-icons';

interface SearchProps {
    value?: string;
    placeholder?: string;
    className?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const StyledTextField = styled(TextField)`
    & input {
        height: 40px;
        background: #ececeb;
        border-radius: 8px;

        & svg {
            color: ${surfaceSolid03};
        }

        &:hover {
            background: #ececeb;
        }

        &:focus {
            background: #ececeb !important;
        }
    }
`;

export const Search: React.FC<SearchProps> = ({ className, value, placeholder = 'Поиск', onKeyDown }) => {
    return (
        <StyledTextField
            className={className}
            size="m"
            placeholder={placeholder}
            contentRight={<IconSearch color={tertiary} />}
            value={value}
            onKeyDown={onKeyDown}
        />
    );
};
