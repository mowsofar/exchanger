import { IconSleepOutline, IconSunOutline } from '@salutejs/plasma-icons';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';
import React from 'react';

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Icon = styled.span<{ $active: boolean }>`
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--accentText)')};
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: opacity 0.3s ease;
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 5rem;
    height: 3rem;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--backgroundTertiary);
    transition: 0.4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 2px;
        bottom: 2px;
        background-color: var(--backgroundSecondary);
        transition: 0.4s;
        border-radius: 50%;
    }
`;

const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${Slider} {
        background-color: var(--backgroundTertiary);
    }

    &:checked + ${Slider}:before {
        transform: translateX(20px);
    }
`;

interface ThemeSwitchProps {
    className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <SwitchContainer className={className}>
            <Icon $active={!isDark}>
                <IconSunOutline color="inherit" size="m" />
            </Icon>
            <Switch>
                <Checkbox type="checkbox" checked={isDark} onChange={toggleTheme} aria-label="Переключить тему" />
                <Slider />
            </Switch>
            <Icon $active={isDark}>
                <IconSleepOutline color="inherit" size="m" />
            </Icon>
        </SwitchContainer>
    );
};
