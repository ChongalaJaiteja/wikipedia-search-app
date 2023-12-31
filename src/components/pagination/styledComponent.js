import styled, { css } from "styled-components";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineVerticalRight } from "react-icons/ai";
import { RetryBtn } from "../reloadPage/styledComponent";

export const PaginationContainerLg = styled.div`
    width: 100%;
    display: none;
    @media (min-width: 1024px) {
        & {
            display: block;
        }
    }
`;

export const PaginationContainerSm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0em 1em;
    margin-top: clamp(1em, 1vw + 2.5em, 4em);
    margin-bottom: clamp(1em, 1vw + 1.9em, 4em);
    align-items: center;
    justify-content: center;
    gap: 0em 1em;
    align-items: center;
    @media (min-width: 600px) {
        flex-direction: row;
        justify-content: space-around;
        padding: 0 4em;
    }
`;

export const PageNavigationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 1em;
    flex-grow: 1;
`;

export const NavigateToFirstPageBgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    @media (min-width: 600px) {
        display: none;
    }
`;

export const NavigateToFirstPageBgContainerMd = styled.div``;

export const PaginationBtn = styled(RetryBtn)`
    display: flex;
    align-items: center;
    gap: 0.6em;
    border: ${(props) =>
        props.outline && "1px solid var(--theme-primary-color)"};
    padding-block: 0.7em;
    color: ${(props) => props.outline && "var(--theme-primary-color)"};
    background-color: ${(props) =>
        props.outline ? "white" : props.disabled ? "grey" : ""};
`;

export const PaginationBtnContent = styled.span`
    display: none;
    font-weight: 600;
    @media (min-width: 600px) {
        display: inline;
    }
`;

export const MultipleDots = styled.p`
    color: #bfbfbfbf;
    font-size: clamp(0.7rem, 1vw + 0.9rem, 1.5rem);
`;
export const NavigateToBothPagesBgContainer = styled.div`
    outline: auto;
    display: flex;
    align-items: center;
    gap: 1em;
`;
export const FirstPageNavigationIcon = styled(AiOutlineVerticalRight)`
    font-size: clamp(0.7rem, 1vw + 1.1rem, 1.34rem);
`;

export const NavigateToFirstPageTextContainer = styled.div`
    display: none;
    cursor: pointer;
    color: var(--theme-primary-color);

    @media (min-width: 600px) {
        & {
            display: flex;
            align-items: center;
            gap: 0.3em;
        }
    }
`;

export const NavigateToFirstPageText = styled.p`
    font-size: clamp(0.7rem, 1vw + 0.8rem, 1rem);
`;

export const LeftPaginationIcon = styled(FaArrowLeftLong)`
    font-size: clamp(0.7rem, 1vw + 1.1rem, 1.34rem);
`;

export const RightPaginationIcon = styled(FaArrowRightLong)`
    font-size: clamp(0.7rem, 1vw + 1.1rem, 1.34rem);
`;

export const PageNumberDetails = styled.p`
    font-size: clamp(1rem, 1vw + 0.4rem, 1.12rem);
`;

export const PaginationInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    gap: 0.2em;

    & input {
        width: 2rem;
        outline: none;
        height: 2em;
    }
`;
