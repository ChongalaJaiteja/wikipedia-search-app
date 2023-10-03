import styled from "styled-components";

export const PopupBgContainer = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
`;

export const PopupModel = styled.div`
    background-color: var(--theme-container-bg-color);
    border-radius: 15px;
    width: min(85%, 30rem);
    /* outline: auto; */
    /* border: 1px solid var(--theme-border-color); */
    padding: 0.9em 1em;
    /* display: flex; */
    /* flex-direction: column; */
    /* gap: 1em; */
    /* & > * {
        outline: auto;
    } */
`;
