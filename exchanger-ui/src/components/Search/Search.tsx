import React from 'react';
import styled from 'styled-components';
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
    margin-top: 2rem;
    font-family: Onest !important;
    font-size: 1.7rem;

    & > div {
        height: 4.5rem !important;
        background: #222224 !important;
        padding: 2rem !important;
        border-radius: 1.3rem !important;
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
