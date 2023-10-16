import styled, { css } from "styled-components";
import {
    SignInInputFieldContainer,
    SignInInputField,
    SignInInputError,
    SignInBtn,
    UserIcon,
    PasswordIcon,
    ToggleSigninPasswordContainer,
    SignInBtnText,
} from "../signin/styledComponent";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

export const SignupFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0.6em 1em;
`;

export const SignupInputFieldListContainer = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0;
`;

export const SignupInInputFieldItem = styled.li``;

export const SignupInputFieldContainer = styled(SignInInputFieldContainer)``;

export const SignupInputField = styled(SignInInputField)``;

export const SignupInputError = styled(SignInInputError)``;

export const EmailIcon = styled(MdEmail)`
    font-size: clamp(0.1rem, 1vw + 0.85rem, 1.1rem);
    padding: 0.1em;
`;

export const SignupUserIcon = styled(UserIcon)``;

export const SignupPasswordIcon = styled(PasswordIcon)``;

export const ToggleSignupPasswordContainer = styled(
    ToggleSigninPasswordContainer
)``;

const PasswordIcons = css`
    font-size: clamp(0.1rem, 1vw + 0.96rem, 1.25rem);
`;
export const PasswordShowIcon = styled(BiSolidShow)`
    ${PasswordIcons}
`;

export const HidePasswordIcon = styled(BiSolidHide)`
    ${PasswordIcons}
`;

export const SignupBtn = styled(SignInBtn)``;

export const SignupBtnText = styled(SignInBtnText)``;
