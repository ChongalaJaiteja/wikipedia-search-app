import styled, { css } from "styled-components";

export const ContentLoaderBgContainer = styled.div`
    max-width: ${(props) => (props.isAllsearchResults ? "40rem" : "none")};
    min-height: 50vh;
    margin-bottom: clamp(1em, 1vw + 1.4em, 6em);
    display: flex;
    flex-direction: column;
    padding: 0 1em;
    @media (min-width: 690px) {
        & {
            margin-left: ${(props) =>
                props.isAllsearchResults ? "10%" : "none"};
        }
    }
`;
