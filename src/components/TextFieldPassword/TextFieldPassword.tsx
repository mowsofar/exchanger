import React from 'react';
import { IconEyeClosedFill, IconEyeFill } from '@salutejs/plasma-icons';
import { TextFieldProps } from '@salutejs/plasma-web';

import { TextField } from '../TextField/TextField';

import styled from 'styled-components';

const EyeIconWrapper = styled.div`
    cursor: pointer;
`;

export const TextFieldPassword = React.forwardRef<HTMLInputElement, TextFieldProps>((props) => {
    const [inputType, setInputType] = React.useState<'password' | 'text'>('password');
    const isPassword = inputType === 'password';

    const contentRight = (
        <EyeIconWrapper
            onClick={() => {
                isPassword ? setInputType('text') : setInputType('password');
            }}
        >
            {isPassword ? <IconEyeFill size="s" color="inherit" /> : <IconEyeClosedFill size="s" color="inherit" />}
        </EyeIconWrapper>
    );

    return <TextField {...props} type={inputType} contentRight={contentRight} />;
});

TextFieldPassword.displayName = 'TextFieldPassword';
