import React from 'react';
import styled from 'styled-components';
import { surfaceSolid01, tertiary } from '@salutejs/plasma-tokens-web';
import { IconSearch } from '@salutejs/plasma-icons';
import { TextField } from '@salutejs/plasma-web';

interface SearchProps {
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const StyledTextField = styled(TextField)`
    margin-top: 20px;
    font-family: Onest !important;

    & > div {
        height: 45px;
        background: #222224 !important;
        border-radius: 8px;
    }

    > div {
        box-shadow: none !important;
    }

    & input,
    div > div > div {
        color: white !important;
    }
`;

export const Search: React.FC<SearchProps> = ({ className, value, placeholder = 'Поиск', onChange, onKeyDown }) => {
    return (
        <StyledTextField
            className={className}
            size="m"
            placeholder={placeholder}
            contentRight={<IconSearch color="white" />}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};
