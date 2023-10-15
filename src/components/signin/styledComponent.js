import styled, { css } from "styled-components";
import { FaUser } from "react-icons/fa6";
import { BiSolidLockAlt, BiSolidShow, BiSolidHide } from "react-icons/bi";

export const SignInFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0.6em 1em;
`;

export const SigninInputFieldListContainer = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0;
`;

export const SignInInputFieldItem = styled.li``;

export const SignInInputFieldContainer = styled.div`
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
    font-size: clamp(0.1rem, 1vw + 0.54rem, 0.9rem);
    padding: 0.3em;
    border-radius: 100%;
`;

export const SignInInputField = styled.input`
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

export const SignInInputError = styled.span`
    color: #d83f31;
    margin-top: 0.2em;
    font-size: clamp(0.2rem, 1vw + 0.42rem, 0.77rem);
`;

export const PasswordIcon = styled(BiSolidLockAlt)`
    font-size: clamp(0.1rem, 1vw + 0.8rem, 1rem);
    border-radius: 100%;
`;

export const ToggleSigninPasswordContainer = styled.div`
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
`;

const PasswordIcons = css`
    font-size: clamp(0.1rem, 1vw + 0.96rem, 1.3rem);
`;
export const PasswordShowIcon = styled(BiSolidShow)`
    ${PasswordIcons}
`;

export const HidePasswordIcon = styled(BiSolidHide)`
    ${PasswordIcons}
`;

export const SignInBtn = styled.button`
    background-color: var(--theme-primary-color);
    color: white;
    border: none;
    width: 100%;
    cursor: pointer;
    margin-block: 2.6em 0.6em;
    padding-block: 0.8em;
    border-radius: 5px;
`;
