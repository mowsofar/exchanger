import { Accordion, AccordionItem } from "@salutejs/plasma-web";
import styled from "styled-components";

export const Root = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledAccordion = styled(Accordion)`
    font-family: Onest;
    display: flex;
    flex-direction: column;
    row-gap: 1.4rem;
    padding-bottom: 10rem;
`;

export const StyledAccordionItem = styled(AccordionItem)`
    background-color: var(--backgroundTertiary);
    padding: 1.5rem;
    border-radius: 1.5rem !important;

    & button > div > div {
        color: white;
        font-weight: 600;
        font-size: 1.8rem;
        font-family: Onest;
    }

    > div > div:last-child {
        background-color: var(--backgroundTertiary);
        color: whitesmoke;
        font-size: 1.6rem;
        border-radius: 1.2rem;
        line-height: 2.5rem;
    }

    > button > div:last-child > div > div {
        width: 1.5rem;
        height: 1.5rem;
        color: white;
        flex: none;
    }
`;

export const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5rem;
    z-index: 1;
    padding: 5rem 20rem;

    @media only screen and (max-width: 1300px) {
        padding: 5rem 10rem;
    }

    @media only screen and (max-width: 820px) {
        padding: 2rem;
    }

    @media only screen and (max-width: 450px) {
        margin-top: -3rem;
        row-gap: 4rem;
    }
`;

export const StyledHeader = styled.div`
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent);

    @media only screen and (max-width: 450px) {
        font-size: 2.4rem;
    }
`;