import styled, { css } from "styled-components";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineVerticalRight } from "react-icons/ai";

export const AllSearchResultsBgContainer = styled.ul`
    list-style-type: none;
    max-width: 40rem;
    min-height: 50vh;
    margin-bottom: clamp(1em, 1vw + 1.4em, 6em);
    display: flex;
    flex-direction: column;
    gap: 1.6em;
    padding: 0 1em;
    @media (min-width: 690px) {
        & {
            margin-left: 10%;
        }
    }
`;
export const FailedViewBgContainer = styled.div`
    width: min(100%, 40rem);
    margin: auto;
    text-align: center;
`;
export const ErrorImg = styled.img`
    width: 80%;
    max-width: 33rem;
`;

export const RetryBtn = styled.button`
    border-radius: 15px;
    cursor: pointer;
    border: none;
    padding: 0.6em 1.3em;
    font-size: clamp(0.7rem, 1vw + 0.3rem, 0.9rem);
    background-color: var(--theme-primary-color);
    color: white;
`;
export const NoResultsFoundContainer = styled.div`
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* outline: auto; */
`;
export const NoResultsFoundImg = styled.img`
    width: min(80%, 26rem);
`;

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
    margin-bottom: 2em;
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
    border: ${(props) =>
        props.outline && "1px solid var(--theme-primary-color)"};
    padding-block: 0.7em;
    color: ${(props) => props.outline && "var(--theme-primary-color)"};
    background-color: ${(props) => props.outline && "white"};
`;
export const MultiplDots = styled.p`
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
    font-size: clamp(0.7rem, 1vw + 0.9rem, 1.5rem);
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
    font-size: clamp(0.7rem, 1vw + 0.9rem, 1.2rem);
`;

export const RightPaginationIcon = styled(FaArrowRightLong)`
    font-size: clamp(0.7rem, 1vw + 0.9rem, 1.2rem);
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
