/* eslint-disable no-useless-escape */
import { useReducer } from "react";
import Cookies from "js-cookies";
import * as StyledComponent from "./styledComponent";
import toast from "react-hot-toast";

const initialState = {
    usernameOrEmail: "",
    userPassword: "",
    formError: {
        usernameOrEmail: false,
        userPassword: false,
    },
    showPassword: false,
};

const ACTIONS = {
    SET_FIELD: "set-user-fields",
    SET_FORM_ERROR: "set-form-error",
    SET_SHOW_PASSWORD: "set-show-password",
    RESET_FORM: "reset-form",
};

const INPUT_FIELD_NAMES = {
    USERNAME_OR_EMAIL: "usernameOrEmail",
    USER_PASSWORD: "userPassword",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_FIELD:
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };

        case ACTIONS.SET_SHOW_PASSWORD:
            return { ...state, showPassword: action.payload };

        case ACTIONS.SET_FORM_ERROR:
            return {
                ...state,
                formError: {
                    ...state.formError,
                    [action.payload.fieldName]: action.payload.value,
                },
            };

        case ACTIONS.RESET_FORM:
            return initialState;

        default:
            return state;
    }
};

const SignIn = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { usernameOrEmail, userPassword, formError, showPassword } = state;

    const {
        usernameOrEmail: usernameOrEmailError,
        userPassword: userPasswordError,
    } = formError;

    const verifyUser = async (username_or_email, password, is_username) => {
        try {
            const url = "http://localhost:3001/login/";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username_or_email,
                    password,
                    is_username,
                }),
            };
            const response = await fetch(url, options);
            const responseText = await response.text();

            if (response.ok) {
                toast.success("Login Successfully");
                const { jwt_token: jwtToken } = response;
                Cookies.setItem("jwt_token", jwtToken, { expires: 30 });
                dispatch({ type: ACTIONS.RESET_FORM });
            } else {
                toast.error(responseText);
            }
        } catch (error) {
            toast.error("Server Error");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const submittedUsernameOrEmail = usernameOrEmail.trim();
        const submittedUserPassword = userPassword.trim();
        let isFormValid = true;

        for (const fieldName in INPUT_FIELD_NAMES) {
            const fieldNameValue = INPUT_FIELD_NAMES[fieldName];
            const trimmerValue = state[fieldNameValue].trim();
            if (trimmerValue === "") isFormValid = false;
            dispatch({
                type: ACTIONS.SET_FORM_ERROR,
                payload: {
                    fieldName: fieldNameValue,
                    value: trimmerValue === "",
                },
            });
        }

        if (isFormValid) {
            const isUsernameValid = /^[a-z][\w]*$/gi.test(
                submittedUsernameOrEmail
            );
            const isUserEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
                submittedUsernameOrEmail
            );
            const isUserPasswordValid =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    submittedUserPassword
                );
            if ((isUsernameValid || isUserEmailValid) && isUserPasswordValid) {
                verifyUser(
                    submittedUsernameOrEmail,
                    submittedUserPassword,
                    isUsernameValid
                );
                console.log("username", submittedUsernameOrEmail);
                console.log("password", submittedUserPassword);
            } else {
                toast.error("Invalid login credentials", { duration: 1600 });
            }
        }
    };

    const handelInputChange = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: ACTIONS.SET_FIELD,
            payload: {
                fieldName: name,
                value,
            },
        });
    };

    const handelBlurInput = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: ACTIONS.SET_FORM_ERROR,
            payload: {
                fieldName: name,
                value: value === "",
            },
        });
    };

    const toggleShowPassword = () => {
        dispatch({
            type: ACTIONS.SET_SHOW_PASSWORD,
            payload: !showPassword,
        });
    };
    const formFields = [
        {
            name: INPUT_FIELD_NAMES.USERNAME_OR_EMAIL,
            icon: <StyledComponent.UserIcon />,
            placeholder: "Username or Email",
            type: "text",
            error: usernameOrEmailError,
        },
        {
            name: INPUT_FIELD_NAMES.USER_PASSWORD,
            icon: <StyledComponent.PasswordIcon />,
            placeholder: "Password",
            type: `${showPassword ? "text" : "password"}`,
            error: userPasswordError,
            showPassword,
        },
    ];
    return (
        <StyledComponent.SignInFormContainer onSubmit={handleSubmit}>
            <StyledComponent.SigninInputFieldListContainer>
                {formFields.map(
                    ({
                        name,
                        icon,
                        placeholder,
                        type,
                        error,
                        showPassword,
                    }) => (
                        <StyledComponent.SignInInputFieldItem>
                            <StyledComponent.SignInInputFieldContainer>
                                {icon}
                                <StyledComponent.SignInInputField
                                    type={type}
                                    name={name}
                                    value={state[name]}
                                    placeholder={placeholder}
                                    onBlur={handelBlurInput}
                                    onChange={handelInputChange}
                                    onPaste={(event) =>
                                        (name
                                            .toLowerCase()
                                            .includes("password") ||
                                            type === "password") &&
                                        event.preventDefault()
                                    }
                                    onCopy={(event) =>
                                        (name
                                            .toLocaleLowerCase()
                                            .includes("password") ||
                                            type === "password") &&
                                        event.preventDefault()
                                    }
                                />
                                {name.toLowerCase().includes("password") &&
                                    state[name].trim() !== "" && (
                                        <StyledComponent.ToggleSigninPasswordContainer
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? (
                                                <StyledComponent.HidePasswordIcon title="Hide Password" />
                                            ) : (
                                                <StyledComponent.PasswordShowIcon title="Show Password" />
                                            )}
                                        </StyledComponent.ToggleSigninPasswordContainer>
                                    )}
                            </StyledComponent.SignInInputFieldContainer>
                            {error && (
                                <StyledComponent.SignInInputError>
                                    Field can not be empty.
                                </StyledComponent.SignInInputError>
                            )}
                        </StyledComponent.SignInInputFieldItem>
                    )
                )}
                <StyledComponent.SignInInputFieldItem>
                    <StyledComponent.SignInBtn type="submit">
                        Sign In
                    </StyledComponent.SignInBtn>
                </StyledComponent.SignInInputFieldItem>
            </StyledComponent.SigninInputFieldListContainer>
        </StyledComponent.SignInFormContainer>
    );
};

export default SignIn;
