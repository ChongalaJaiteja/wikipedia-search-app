import { useReducer } from "react";
import * as StyledComponent from "./styledComponent";

const initialState = {
    username: "",
    userPassword: "",
    usernameError: false,
    userPasswordError: false,
    signinError: false,
};

const ACTIONS = {
    SET_USERNAME: "set-user-name",
    SET_USER_PASSWORD: "set-user-password",
    SET_USERNAME_ERROR: "set-username-error",
    SET_USER_PASSWORD_ERROR: "set-password-error",
    SET_SIGNIN_ERROR: "set-signin-error",
    RESET_FORM: "reset-form",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_USERNAME:
            return { ...state, username: action.payload };

        case ACTIONS.SET_USER_PASSWORD:
            return { ...state, userPassword: action.payload };

        case ACTIONS.SET_USERNAME_ERROR:
            return { ...state, usernameError: action.payload };

        case ACTIONS.SET_USER_PASSWORD_ERROR:
            return { ...state, userPasswordError: action.payload };

        case ACTIONS.SET_SIGNIN_ERROR:
            return {
                ...state,
                signinError: action.payload,
            };

        case ACTIONS.RESET_FORM:
            return initialState;

        default:
            console.error("error");
    }
};

const SignIn = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        username,
        userPassword,
        usernameError,
        userPasswordError,
        signinError,
    } = state;

    const verifyFormData = () => {
        const usernameReg = /[a-z]+[w]*/gi;
        const isUsernameValid = usernameReg.test(username);
        const userPasswordReg =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isUserPasswordValid = userPasswordReg.test(userPassword);

        dispatch({
            type: ACTIONS.SET_SIGNIN_ERROR,
            payload: isUsernameValid && isUserPasswordValid,
        });
    };

    const onSubmitSigninForm = (event) => {
        event.preventDefault();
        verifyFormData();
        if (!usernameError && !userPasswordError && !signinError) {
            const submittedUsername = username.trim();
            const submittedUserPassword = userPassword.trim();
            console.log("username", submittedUsername);
            console.log("password", submittedUserPassword);
        }
    };

    return (
        <StyledComponent.SignInFormContainer onSubmit={onSubmitSigninForm}>
            {signinError && <p>invalid credentials</p>}
            <StyledComponent.UserNameInputContainer>
                <StyledComponent.UserIcon />
                <StyledComponent.UsernameOrMailInput
                    placeholder="Username or email"
                    value={username}
                    onChange={(event) =>
                        dispatch({
                            type: ACTIONS.SET_USERNAME,
                            payload: event.target.value,
                        })
                    }
                    onBlur={() =>
                        dispatch({
                            type: ACTIONS.SET_USERNAME_ERROR,
                            payload: username.trim() === "",
                        })
                    }
                />
            </StyledComponent.UserNameInputContainer>

            {usernameError && (
                <StyledComponent.UsernameInputError>
                    Field can not be empty.
                </StyledComponent.UsernameInputError>
            )}

            <StyledComponent.UserPasswordInputContainer>
                <StyledComponent.PasswordIcon />
                <StyledComponent.PasswordInput
                    placeholder="Password"
                    type="password"
                    value={userPassword}
                    onChange={(event) =>
                        dispatch({
                            type: ACTIONS.SET_USER_PASSWORD,
                            payload: event.target.value,
                        })
                    }
                    onBlur={() =>
                        dispatch({
                            type: ACTIONS.SET_USER_PASSWORD_ERROR,
                            payload: userPassword.trim() === "",
                        })
                    }
                />
            </StyledComponent.UserPasswordInputContainer>

            {userPasswordError && (
                <StyledComponent.PasswordInputError>
                    Field can not be empty.
                </StyledComponent.PasswordInputError>
            )}

            <StyledComponent.SignInBtn type="submit">
                Sign In
            </StyledComponent.SignInBtn>
        </StyledComponent.SignInFormContainer>
    );
};

export default SignIn;
