import React from 'react';
import { IconEyeClosedFill, IconEyeFill } from '@salutejs/plasma-icons';
import { TextField, TextFieldProps } from '@salutejs/plasma-web';

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
            {isPassword ? <IconEyeFill size="m" color="inherit" /> : <IconEyeClosedFill size="m" color="inherit" />}
        </EyeIconWrapper>
    );

    return <TextField {...props} type={inputType} contentRight={contentRight} />;
});

TextFieldPassword.displayName = 'TextFieldPassword';
