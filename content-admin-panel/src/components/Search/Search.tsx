import React from 'react';
import { tertiary } from '@salutejs/plasma-tokens';
import { IconSearch } from '@salutejs/plasma-icons';
import { TextField } from '../TextField';

interface SearchProps {
    value?: string;
    placeholder?: string;
    className?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Search: React.FC<SearchProps> = ({ className, value, placeholder = 'Поиск', onKeyDown, onChange }) => {
    return (
        <TextField
            className={className}
            size="m"
            placeholder={placeholder}
            contentRight={<IconSearch color={tertiary} />}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    );
};
