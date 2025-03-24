import { Accordion, AccordionItem } from "@salutejs/plasma-web";
import styled from "styled-components";

export const Root = styled.div`
    padding: 5rem 10rem;
    width: 80%;

    @media only screen and (max-width: 800px) {
        width: 100%;
        padding: 5rem 2rem;
    }
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
    height: 100%;
    width: 100%;
    z-index: 1;
`;

export const StyledHeader = styled.div`
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent);
`;