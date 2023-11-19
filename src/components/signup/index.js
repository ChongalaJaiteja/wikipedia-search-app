/* eslint-disable no-useless-escape */
import React, { useReducer } from "react";
import * as StyledComponent from "./styledComponent";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useModelState } from "../../modelStateContext";

// Define constant values for input field names.
const INPUT_FIELD_NAMES = {
    USERNAME: "username",
    USER_PASSWORD: "userPassword",
    USER_EMAIL: "userEmail",
    USER_CONFIRM_PASSWORD: "userConfirmPassword",
};

// Define the initial state for the signup form.
const initialState = {
    username: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
    formError: {
        username: "",
        userPassword: "",
        userEmail: "",
        userConfirmPassword: "",
    },
    showPassword: {
        userPassword: false,
        userConfirmPassword: false,
    },
    isSignupLoading: false,
};

// Define constant actions to be used in the reducer.
const ACTIONS = {
    SET_FIELD: "set-user-fields",
    SET_FORM_ERROR: "set-form-error",
    SET_SHOW_PASSWORD: "set-show-password",
    RESET_FORM: "reset-form",
    SET_SIGNUP_LOADING: "set-signup-loading",
};

// Define error messages for form validation.
const ERROR_MESSAGE = {
    EMPTY_INPUT: "Field can not be empty.",
    USER_EMAIL_ERROR: "Invalid Email",
    USERNAME_ERROR:
        "* Should Start with a letter, followed by letters, digits, or underscores",
    USER_PASSWORD_ERROR:
        "* Should contain min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character(@, $, !, %, *, ?, or &).",
    USER_CONFIRM_PASSWORD_ERROR: "* Password Not Matched",
};

// Reducer function to handle state updates.
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_FIELD:
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };

        case ACTIONS.SET_SHOW_PASSWORD:
            return {
                ...state,
                showPassword: {
                    ...state.showPassword,
                    [action.payload.fieldName]: action.payload.value,
                },
            };

        case ACTIONS.SET_FORM_ERROR:
            return {
                ...state,
                formError: {
                    ...state.formError,
                    [action.payload.fieldName]: action.payload.value,
                },
            };

        case ACTIONS.SET_SIGNUP_LOADING:
            return { ...state, isSignupLoading: action.payload };
        case ACTIONS.RESET_FORM:
            return initialState;

        default:
            return state;
    }
};

// Signup component is responsible for rendering a sign-up form.
const Signup = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { showModel, closeModel } = useModelState();

    const {
        username,
        userPassword,
        formError,
        showPassword,
        userEmail,
        userConfirmPassword,
        isSignupLoading,
    } = state;

    const {
        username: usernameError,
        userPassword: userPasswordError,
        userEmail: userEmailError,
        userConfirmPassword: userConfirmPasswordError,
    } = formError;

    const {
        userPassword: showUserPassword,
        userConfirmPassword: showUserConfirmPassword,
    } = showPassword;

    // Function to verify the form data and perform sign-up.
    const verifyFormData = (
        userEmail,
        username,
        userPassword,
        userConfirmPassword
    ) => {
        const isUserEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
            userEmail
        );
        const isUsernameValid = /^[a-z][\w]*$/gi.test(username);
        const isUserPasswordValid =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                userPassword
            );

        let isFormValid = true;

        if (!isUserEmailValid) {
            dispatch({
                type: ACTIONS.SET_FORM_ERROR,
                payload: {
                    fieldName: INPUT_FIELD_NAMES.USER_EMAIL,
                    value: ERROR_MESSAGE.USER_EMAIL_ERROR,
                },
            });
            isFormValid = false;
        }

        if (!isUsernameValid) {
            dispatch({
                type: ACTIONS.SET_FORM_ERROR,
                payload: {
                    fieldName: INPUT_FIELD_NAMES.USERNAME,
                    value: ERROR_MESSAGE.USERNAME_ERROR,
                },
            });
            isFormValid = false;
        }

        if (!isUserPasswordValid) {
            dispatch({
                type: ACTIONS.SET_FORM_ERROR,
                payload: {
                    fieldName: INPUT_FIELD_NAMES.USER_PASSWORD,
                    value: ERROR_MESSAGE.USER_PASSWORD_ERROR,
                },
            });
            isFormValid = false;
        }

        if (userPassword !== userConfirmPassword) {
            dispatch({
                type: ACTIONS.SET_FORM_ERROR,
                payload: {
                    fieldName: INPUT_FIELD_NAMES.USER_CONFIRM_PASSWORD,
                    value: ERROR_MESSAGE.USER_CONFIRM_PASSWORD_ERROR,
                },
            });
            isFormValid = false;
        }
        return isFormValid;
    };

    // Function to verify user credentials and perform sign-up.
    const verifyUser = async (username, email, password) => {
        dispatch({ type: ACTIONS.SET_SIGNUP_LOADING, payload: true });
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/register`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            };

            const response = await fetch(url, options);
            const responseText = await response.text();
            if (response.ok) {
                toast.success(responseText);
                dispatch({ type: ACTIONS.RESET_FORM });
                closeModel();
            } else {
                toast.error(responseText);
            }
        } catch (error) {
            toast.error("Server Error");
        } finally {
            dispatch({ type: ACTIONS.SET_SIGNUP_LOADING, payload: false });
        }
    };

    // Function to handle form submission.
    const handleSubmit = (event) => {
        event.preventDefault();
        const submittedUserEmail = userEmail.trim();
        const submittedUsername = username.trim();
        const submittedUserPassword = userPassword.trim();
        const submittedConfirmPassword = userConfirmPassword.trim();
        let isFormValid = true;

        for (const fieldName in INPUT_FIELD_NAMES) {
            const fieldNameValue = INPUT_FIELD_NAMES[fieldName];
            const trimmedValue = state[fieldNameValue].trim();
            if (trimmedValue === "") isFormValid = false;
            dispatch({
                type: ACTIONS.SET_FORM_ERROR,
                payload: {
                    fieldName: fieldNameValue,
                    value: trimmedValue === "" && ERROR_MESSAGE.EMPTY_INPUT,
                },
            });
        }

        if (
            isFormValid &&
            verifyFormData(
                submittedUserEmail,
                submittedUsername,
                submittedUserPassword,
                submittedConfirmPassword
            )
        ) {
            verifyUser(
                submittedUsername,
                submittedUserEmail,
                submittedUserPassword
            );
        }
    };

    // Function to handle input changes.
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

    // Function to handle input blur and validate.
    const handelBlurInput = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: ACTIONS.SET_FORM_ERROR,
            payload: {
                fieldName: name,
                value: value.trim() === "" && ERROR_MESSAGE.EMPTY_INPUT,
            },
        });
    };

    // Function to toggle password visibility.
    const toggleShowPassword = (fieldName) => {
        const value =
            fieldName === INPUT_FIELD_NAMES.USER_PASSWORD
                ? !showUserPassword
                : !showUserConfirmPassword;
        dispatch({
            type: ACTIONS.SET_SHOW_PASSWORD,
            payload: {
                fieldName,
                value,
            },
        });
    };

    // Define form input fields with their configurations.
    const formFields = [
        {
            name: INPUT_FIELD_NAMES.USER_EMAIL,
            icon: <StyledComponent.EmailIcon />,
            placeholder: "Email",
            type: "email",
            error: userEmailError,
        },
        {
            name: INPUT_FIELD_NAMES.USERNAME,
            icon: <StyledComponent.SignupUserIcon />,
            placeholder: "Username",
            type: "text",
            error: usernameError,
        },

        {
            name: INPUT_FIELD_NAMES.USER_PASSWORD,
            icon: <StyledComponent.SignupPasswordIcon />,
            placeholder: "Password",
            type: `${showUserPassword ? "text" : "password"}`,
            error: userPasswordError,
            showPassword: showUserPassword,
        },

        {
            name: INPUT_FIELD_NAMES.USER_CONFIRM_PASSWORD,
            icon: <StyledComponent.SignupPasswordIcon />,
            placeholder: "Confirm Password",
            type: `${showUserConfirmPassword ? "text" : "password"}`,
            error: userConfirmPasswordError,
            showPassword: showUserConfirmPassword,
        },
    ];

    // Render the Signup form.
    return (
        <StyledComponent.SignupFormContainer onSubmit={handleSubmit}>
            <StyledComponent.SignupInputFieldListContainer>
                {formFields.map(
                    ({
                        name,
                        icon,
                        placeholder,
                        type,
                        error,
                        showPassword,
                    }) => (
                        <StyledComponent.SignupInInputFieldItem
                            key={name.toUpperCase()}
                        >
                            <StyledComponent.SignupInputFieldContainer>
                                {icon}
                                <StyledComponent.SignupInputField
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
                                            .toLowerCase()
                                            .includes("password") ||
                                            type === "password") &&
                                        event.preventDefault()
                                    }
                                />
                                {name.toLowerCase().includes("password") &&
                                    state[name].trim() !== "" && (
                                        <StyledComponent.ToggleSignupPasswordContainer
                                            onClick={() =>
                                                toggleShowPassword(name)
                                            }
                                        >
                                            {showPassword ? (
                                                <StyledComponent.HidePasswordIcon title="Hide Password" />
                                            ) : (
                                                <StyledComponent.PasswordShowIcon title="Show Password" />
                                            )}
                                        </StyledComponent.ToggleSignupPasswordContainer>
                                    )}
                            </StyledComponent.SignupInputFieldContainer>

                            {error && (
                                <StyledComponent.SignupInputError>
                                    {error}
                                </StyledComponent.SignupInputError>
                            )}
                        </StyledComponent.SignupInInputFieldItem>
                    )
                )}
                <StyledComponent.SignupInInputFieldItem>
                    <StyledComponent.SignupBtn
                        type="submit"
                        disabled={isSignupLoading}
                        isformloading={isSignupLoading}
                    >
                        <StyledComponent.SignupBtnText>
                            Sign Up
                        </StyledComponent.SignupBtnText>
                        {isSignupLoading && (
                            <ClipLoader
                                color="rgba(169, 180, 177, 1)"
                                size={11}
                            />
                        )}
                    </StyledComponent.SignupBtn>
                </StyledComponent.SignupInInputFieldItem>
            </StyledComponent.SignupInputFieldListContainer>
        </StyledComponent.SignupFormContainer>
    );
};

export default Signup;
