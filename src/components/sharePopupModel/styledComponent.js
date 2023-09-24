import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

export const PopupBgContainer = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PopupModel = styled.div`
    background-color: var(--theme-container-bg-color);
    border-radius: 15px;
    width: min(85%, 30rem);
    /* outline: auto; */
    /* border: 1px solid var(--theme-border-color); */
    padding: 0.9em 0.8em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    /* & > * {
        outline: auto;
    } */
`;

export const PopupHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    /* outline: auto; */
    justify-content: space-between;
`;
export const MainHeading = styled.h1`
    color: var(--theme-primary-text-color);
    font-size: clamp(1rem, 1vw + 1rem, 1.4rem);
`;

export const PopUpCloseIcon = styled(AiOutlineClose)`
    font-size: clamp(1rem, 1vw + 1.2rem, 1.6rem);
    cursor: pointer;
    border-radius: 100%;
    padding: 0.14em;
    &:hover {
        background-color: red;
        color: white;
    }
`;

export const SharePlatformsBgContainer = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1em;
    overflow-x: auto;
    border-bottom: 1px solid var(--theme-divide-line-color);
    padding-bottom: 0.7em;
    /* outline: auto; */
    &::-webkit-scrollbar {
        height: 5px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 13px;
    }
`;

export const WikipediaLinkContainer = styled.div`
    /* outline: auto; */
    display: flex;
    gap: 0 0.6em;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--theme-input-border-color);
    border-radius: 15px;
    padding: 0.4em 0.3em;
`;

export const WikiUrl = styled.p`
    color: var(----theme-primary-text-color);
    margin-inline: auto;
    word-break: break-all;
    font-size: clamp(0.3rem, 1vw + 0.7rem, 1rem);
`;

export const CopyWikiUrlBtn = styled.button`
    background-color: ${(props) =>
        props.copied === "true" ? "grey" : "var(--theme-primary-color)"};
    color: white;
    font-size: clamp(0.3rem, 1vw + 0.55rem, 1rem);
    padding: 0.5em 1em;
    border: 1px solid
        ${(props) =>
            props.copied === "true" ? "grey" : "var(--theme-primary-color)"};
    border-radius: 15px;
    cursor: pointer;
    margin-inline: auto;
    transform: scale(1.05);
    &:active {
        transform: scale(1);
        background-color: transparent;
    }
`;
