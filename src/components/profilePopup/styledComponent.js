import styled from "styled-components";
import { HomeOptions } from "../home/styledComponent";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const ProfilePopUpBgContainer = styled.div`
    cursor: pointer;
`;

export const UserProfileAvatar = styled(FaCircleUser)`
    font-size: clamp(1rem, 1vw + 1.3rem, 1.8rem);
`;

export const ProfilePopUpContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6em 0;
    top: 100%;
    right: 6px;
    background-color: var(--theme-container-bg-color);
    padding: 0.7em 0.9em;
    border-radius: 10px;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    width: 100%;
    color: var(--theme-primary-text-color);
    ${HomeOptions};
    font-size: clamp(0.3rem, 1vw + 0.6rem, 0.9rem);
`;

export const SignOutBtn = styled.button`
    color: red;
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: clamp(0.3rem, 1vw + 0.6rem, 0.9rem);
`;
