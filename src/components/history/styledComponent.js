import styled, { keyframes } from "styled-components";
import { SearchInput } from "../home/styledComponent";
import { IoIosArrowBack } from "react-icons/io";
import { IconButton } from "@mui/material";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

export const HistoryBgContainer = styled.div`
    background-color: var(--theme-page-bg-color);
    color: var(--theme-primary-text-color);
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const HistoryNavBar = styled.nav`
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: var(--theme-container-bg-color);
    margin-bottom: 2.3em;
    min-height: 3.5em;
    display: flex;
    padding-inline: clamp(0.5em, 1vw + 0.45em, 1.5em);
`;

export const HistorySearchInputFormContainer = styled.form`
    display: flex;
    flex-grow: 1;
    align-items: center;
    gap: 0.5em;
    justify-content: space-between;
`;

export const ToolTipButton = styled(IconButton)`
    padding: 0 !important;
`;
export const NavigateBackIcon = styled(IoIosArrowBack)`
    cursor: pointer;
    font-size: clamp(0.6rem, 1vw + 1rem, 1.5rem);
    color: var(--theme-primary-text-color);
`;

export const HistoryMainHeading = styled.h1`
    font-size: clamp(0.55rem, 1vw + 0.93rem, 1.45rem);
`;

const SearchInputSmAnimation = keyframes`
from {
    width: 0;
} to {
    width: 100%;
}
`;
export const HistorySearchInputSm = styled(SearchInput)`
    border: none;
    border-radius: none;
    animation: ${SearchInputSmAnimation} 0.1s linear 1;
    background-color: transparent;
    @media (min-width: 565px) {
        & {
            display: none;
        }
    }
`;

export const SearchIcon = styled(AiOutlineSearch)`
    cursor: pointer;
    font-size: clamp(0.4rem, 1vw + 1rem, 1.4rem);
    color: var(--theme-primary-text-color);
    @media (min-width: 565px) {
        & {
            display: none;
        }
    }
`;

export const SearchHistoryInput = styled(SearchInput)`
    width: min(73%, 30rem);
    margin-inline: auto;
    display: none;
    @media (min-width: 565px) {
        display: block;
    }
`;

export const HistoryItemsBgContainer = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1.32em;
    align-self: center;
    width: 100%;
    & > :nth-last-child(1) {
        margin-bottom: 1.5em;
    }
`;

const animateDeleteHistory = keyframes`
from {
    flex-grow: 0;
}
to {
    flex-grow: 1;
}
`;
export const DeleteBgContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    animation: ${animateDeleteHistory} 0.1s ease-out 1 forwards;
`;

export const DeleteCountDetailsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

export const CloseIcon = styled(AiOutlineClose)`
    font-size: clamp(0.4rem, 1vw + 0.8rem, 1.26rem);
    color: var(--theme-primary-text-color);
    cursor: pointer;
    padding: 0.1em;
`;

export const SelectedHistoryItemsCount = styled.p`
    font-size: clamp(0.3em, 1vw + 0.51rem, 1rem);
`;

export const DeleteHistoryFormContainer = styled.form``;

export const DeleteIcon = styled(MdOutlineDeleteOutline)`
    cursor: pointer;
    font-size: clamp(0.4rem, 1vw + 1rem, 1.4rem);
    @media (min-width: 565px) {
        display: none;
    }
`;

export const DeleteBtn = styled.button`
    display: none;
    background-color: transparent;
    border: 1px solid #e74646;
    border-radius: 9px;
    padding-block: 0.35em;
    padding-inline: 0.7em;
    cursor: pointer;
    color: var(--theme-primary-text-color);
    font-size: clamp(0.4em, 1vw + 0.52rem, 1rem);
    &:hover {
        background-color: #e74646;
        color: white;
    }
    @media (min-width: 565px) {
        & {
            display: block;
        }
    }
`;
