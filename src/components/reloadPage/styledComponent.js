import styled from "styled-components";

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
