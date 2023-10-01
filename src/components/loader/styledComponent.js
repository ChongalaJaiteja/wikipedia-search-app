import styled, { css } from "styled-components";

export const ContentLoaderBgContainer = styled.div`
    max-width: 40rem;
    min-height: 50vh;
    margin-bottom: clamp(1em, 1vw + 1.4em, 6em);
    display: flex;
    flex-direction: column;
    padding: 0 1em;
    @media (min-width: 690px) {
        & {
            margin-left: 10%;
        }
    }
`;
