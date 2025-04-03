import { StyledLayout, StyledLeftColumn, StyledRightColumn, StyledTwoColumnsRoot } from './AppLayout.styled';
import { MenuList } from '../MenuList/MenuList';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const AppLayout: React.FC = () => {
    return (
        <StyledLayout>
            <Header />
            <StyledTwoColumnsRoot>
                <StyledLeftColumn>
                    <MenuList />
                </StyledLeftColumn>
                <StyledRightColumn>
                    <Outlet />
                </StyledRightColumn>
            </StyledTwoColumnsRoot>
        </StyledLayout>
    );
};
