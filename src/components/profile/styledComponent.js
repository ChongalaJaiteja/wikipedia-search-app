import styled from "styled-components";
import { FaUser } from "react-icons/fa";

export const ProfileBgContainer = styled.div`
    min-height: 100vh;
    background-color: var(--theme-page-bg-color);
    color: var(--theme-primary-text-color);
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProfileCard = styled.div`
    outline: auto;
`;

export const ProfileIcon = styled(FaUser)`
    font-size: clamp(1rem, 1vw + 5rem, 30rem);
`;
