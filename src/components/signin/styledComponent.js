import styled from "styled-components";
import { FaUser } from "react-icons/fa6";
import { BiSolidLockAlt } from "react-icons/bi";

export const SignInFormContainer = styled.form`
    /* outline: auto; */
    display: flex;
    flex-direction: column;
    padding: 0.6em 1em;
`;

export const UserNameInputContainer = styled.div`
    background-color: var(--theme-input-bg-color);
    display: flex;
    gap: 0.3em;
    margin-top: 1.3em;
    border: 1px solid var(--theme-input-border-color);
    border-radius: 5px;
    padding: 0.34em 0.3em;
    align-items: center;
    &:focus-within {
        border-color: grey;
    }
`;
export const UserIcon = styled(FaUser)`
    font-size: clamp(0.1em, 1vw + 0.54em, 0.9em);
    padding: 0.3em;
    border-radius: 100%;
`;
export const UsernameOrMailInput = styled.input`
    flex-grow: 1;
    color: var(--theme-input-text-color);
    background-color: var(--theme-input-bg-color);
    outline: none;
    border: none;
    padding: 0.5em 0em;
    &::placeholder {
        color: var(--theme-input-placeholder-text-color);
    }
`;

export const UsernameInputError = styled.span`
    color: #d83f31;
    margin-top: 0.2em;
    font-size: clamp(0.2em, 1vw + 0.42em, 0.77em);
`;

export const UserPasswordInputContainer = styled(UserNameInputContainer)`
    margin-top: 1.4em;
    gap: 0.6em;
`;

export const PasswordIcon = styled(BiSolidLockAlt)`
    font-size: clamp(0.1em, 1vw + 0.8em, 1em);
    border-radius: 100%;
`;

export const PasswordInput = styled(UsernameOrMailInput)``;

export const PasswordInputError = styled(UsernameInputError)``;

export const SignInBtn = styled.button`
    background-color: var(--theme-success-color);
    color: white;
    border: none;
    cursor: pointer;
    margin-block: 2.6em 0.6em;
    padding-block: 0.8em;
    border-radius: 5px;
`;
