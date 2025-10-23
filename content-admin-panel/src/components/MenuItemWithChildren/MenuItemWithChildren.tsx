import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { blackPrimary } from '@salutejs/plasma-tokens';
import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@salutejs/plasma-icons';

interface MenuItemWithChildrenProps {
    item: {
        key?: string;
        name: string;
        icon?: React.ReactNode;
        children?: Array<{
            key: string;
            name: string;
            icon?: React.ReactNode;
        }>;
    };
}

const StyledMenuItemWithChildren = styled.div`
    display: flex;
    flex-direction: column;
`;

const ParentMenuItem = styled.div<{ isActive?: boolean }>`
    padding: 14px 16px 14px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    font-size: 18px;
    cursor: pointer;
    color: ${blackPrimary} !important;
    background: ${({ isActive }) => (isActive ? '#ececeb' : 'transparent')};

    &:hover {
        background: #ececeb;
    }
`;

const ParentMenuItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ChildrenMenu = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StyledChildMenuItem = styled(NavLink)`
    padding: 10px 16px 10px 70px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    color: ${blackPrimary} !important;

    &.active {
        background: #ececeb;
    }

    &:visited {
        color: ${blackPrimary} !important;
    }

    &:hover {
        color: ${blackPrimary} !important;
        background: #ececeb;
    }
`;

export const MenuItemWithChildren: React.FC<MenuItemWithChildrenProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const hasActiveChild = item.children?.some(
        (child) => location.pathname === child.key || location.pathname.startsWith(`${child.key}/`),
    );

    const isParentActive = item.key
        ? location.pathname === item.key || location.pathname.startsWith(`${item.key}/`)
        : false;

    React.useEffect(() => {
        if (hasActiveChild) {
            setIsOpen(true);
        }
    }, [hasActiveChild]);

    const toggleSubmenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledMenuItemWithChildren>
            <ParentMenuItem onClick={toggleSubmenu} isActive={isParentActive && !hasActiveChild}>
                <ParentMenuItemContent>
                    {item?.icon}
                    {item.name}
                </ParentMenuItemContent>
                {isOpen ? <IconChevronUp size="xs" /> : <IconChevronDown size="xs" />}
            </ParentMenuItem>
            {isOpen && item.children && (
                <ChildrenMenu>
                    {item.children.map((child) => (
                        <StyledChildMenuItem to={child.key} key={child.key}>
                            {child?.icon}
                            {child.name}
                        </StyledChildMenuItem>
                    ))}
                </ChildrenMenu>
            )}
        </StyledMenuItemWithChildren>
    );
};
