import styled, { keyframes } from "styled-components";

export const PopupBgContainer = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    min-height: 100vh;
    overflow: auto;
`;

const AnimatePopup = keyframes`
    from {
        transform: scale(0);
    } 
    
    to {
        transform: scale(1);
    }
`;
export const PopupModel = styled.div`
    background-color: var(--theme-container-bg-color);
    color: var(--theme-primary-text-color);
    border-radius: 15px;
    width: min(85%, 30rem);
    animation: ${AnimatePopup} 0.16s linear;
    padding: 0.9em 1em;
    margin-bottom: 2em;
    margin-top: 5rem;
`;

