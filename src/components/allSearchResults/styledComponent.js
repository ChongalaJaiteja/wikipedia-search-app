import styled, { css } from "styled-components";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineVerticalRight } from "react-icons/ai";

export const AllSearchResultsBgContainer = styled.ul`
    list-style-type: none;
    max-width: 50rem;
    min-height: 50vh;
    margin-bottom: clamp(1em, 1vw + 1.4em, 6em);
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 0 1em;
    position: relative;
    @media (min-width: 690px) {
        & {
            margin-left: 10%;
        }
    }
`;

export const TotalSearchResults = styled.li`
    color: rgb(158, 158, 158);
    font-size: clamp(0.4rem, 1vw + 0.7rem, 1.1rem);
`;

// export const ContentLoaderBgContainer = styled.div`
//     max-width: 40rem;
//     min-height: 50vh;
//     margin-bottom: clamp(1em, 1vw + 1.4em, 6em);
//     display: flex;
//     flex-direction: column;
//     padding: 0 1em;
//     @media (min-width: 690px) {
//         & {
//             margin-left: 10%;
//         }
//     }
// `;
