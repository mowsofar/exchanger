import React from 'react';
import styled from 'styled-components';
import { Caption } from '@salutejs/plasma-web';
import { primary, secondary, accent } from '@salutejs/plasma-tokens-web';
import { NavLink } from 'react-router-dom';

export interface BreadcrumbsItem {
    name: string;
    route?: string;
}

interface BreadcrumbsProps {
    path: Array<BreadcrumbsItem | null>;
    className?: string;
}

const StyledRoot = styled.div``;

const StyledList = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    font-size: 20px;
`;

const StyledListItem = styled.li`
    display: block;
    margin: 0;
    padding: 3px 10px;
    position: relative;

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;
    }

    &::after {
        content: '–';
        position: absolute;
        top: 0;
        right: -5px;
        line-height: 1em;
        color: ${secondary};
        font-weight: 200;
    }

    &:last-child::after {
        display: none;
    }
`;

const StyledLink = styled(NavLink)`
    color: ${primary} !important;
    font-size: 16px;

    max-width: 400px;
    display: block;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    text-decoration: none;

    &:hover {
        color: ${accent} !important;
    }

    &::before {
        border-bottom: none;
    }
`;

const StyledPlaceholder = styled.span`
    color: ${secondary};

    max-width: 200px;
    display: block;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className, path }) => {
    const filteredPath = path.filter(Boolean) as Array<BreadcrumbsItem>;
    if (filteredPath.length === 0) {
        return null;
    }

    return (
        <StyledRoot className={className}>
            <StyledList>
                {filteredPath.map((item, i) => (
                    <StyledListItem key={i}>
                        <Caption>
                            {item.route ? (
                                <StyledLink data-test-name={`Breadcrumb_${item.name}`} to={item.route}>
                                    {item.name}
                                </StyledLink>
                            ) : (
                                <StyledPlaceholder data-test-name={`Breadcrumb_${item.name}`}>
                                    {item.name}
                                </StyledPlaceholder>
                            )}
                        </Caption>
                    </StyledListItem>
                ))}
            </StyledList>
        </StyledRoot>
    );
};
