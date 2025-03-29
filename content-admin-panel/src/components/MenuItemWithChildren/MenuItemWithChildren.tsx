import { IconChevronDown, IconChevronUp } from '@salutejs/plasma-icons';
import { blackPrimary } from '@salutejs/plasma-tokens';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface MenuItem {
    key: string;
    name: string;
    children?: MenuItem[];
}

const StyledMenuItem = styled(NavLink)`
    padding: 14px 16px 14px 32px;
    display: block;
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    color: ${blackPrimary} !important;

    &.active {
        background: #ececeb;
    }

    &::before {
        border: 0;
    }

    &:visited {
        color: ${blackPrimary} !important;
    }

    &:hover {
        color: ${blackPrimary} !important;
        background: #ececeb;
    }
`;

const StyledSubMenuItem = styled(StyledMenuItem)<{ isActive?: boolean }>`
    font-size: 18px;
    padding-left: 50px;
    background: none;
    cursor: pointer;

    background: ${({ isActive }) => (isActive ? '#ececeb' : 'white')} !important;
`;

export const MenuItemWithChildren: React.FC<{ item: MenuItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeTab = searchParams.get('tab') || '';

    return (
        <div>
            <StyledMenuItem
                to={item.key}
                onClick={(e) => {
                    if (item.children) {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
            >
                {item.name}
                {item.children && (
                    <span style={{ float: 'right' }}>
                        {isOpen ? <IconChevronUp size="xs" /> : <IconChevronDown size="xs" />}
                    </span>
                )}
            </StyledMenuItem>
            {isOpen && item.children && (
                <div>
                    {item.children.map((child) => {
                        return (
                            <StyledSubMenuItem to={child.key} key={child.key} isActive={child.key.includes(activeTab)}>
                                {child.name}
                            </StyledSubMenuItem>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
