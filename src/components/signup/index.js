/* eslint-disable no-useless-escape */
import React, { useReducer } from "react";
import * as StyledComponent from "./styledComponent";
import toast from "react-hot-toast";

const INPUT_FIELD_NAMES = {
    USERNAME: "username",
    USER_PASSWORD: "userPassword",
    USER_EMAIL: "userEmail",
    USER_CONFIRM_PASSWORD: "userConfirmPassword",
};

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
};

const ACTIONS = {
    SET_FIELD: "set-user-fields",
    SET_FORM_ERROR: "set-form-error",
    SET_SHOW_PASSWORD: "set-show-password",
    RESET_FORM: "reset-form",
};

const ERROR_MESSAGE = {
    EMPTY_INPUT: "Field can not be empty.",
    USER_EMAIL_ERROR: "Invalid Email",
    USERNAME_ERROR:
        "* Should Start with a letter, followed by letters, digits, or underscores",
    USER_PASSWORD_ERROR:
        "* Should contain min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character(@, $, !, %, *, ?, or &).",
    USER_CONFIRM_PASSWORD_ERROR: "* Password Not Matched",
};

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

        case ACTIONS.RESET_FORM:
            return initialState;

        default:
            return state;
    }
};

const Signup = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        username,
        userPassword,
        formError,
        showPassword,
        userEmail,
        userConfirmPassword,
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

        // console.log("Start");
        // console.log("username", username);
        // console.log(isUsernameValid);
        // console.log("userPassword", userPassword);
        // console.log(isUserPasswordValid);
        // console.log("userEmail", userEmail);
        // console.log(isUserEmailValid);

        // if (!isFormValid)
        //     toast.error("Invalid login credentials", { duration: 1600 });

        return isFormValid;
    };

    const verifyUser = async (username, email, password) => {
        try {
            const url = "http://localhost:3001/register/";
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
            } else {
                toast.error(responseText);
            }
        } catch (error) {
            toast.error("Server Error");
        }
    };

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
            // console.log("email", submittedUserEmail);
            // console.log("username", submittedUsername);
            // console.log("password", submittedUserPassword);
            // console.log("confirm password", submittedConfirmPassword);
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
                value: value.trim() === "" && ERROR_MESSAGE.EMPTY_INPUT,
            },
        });
    };

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
                    <StyledComponent.SignupBtn type="submit">
                        Sign Up
                    </StyledComponent.SignupBtn>
                </StyledComponent.SignupInInputFieldItem>
            </StyledComponent.SignupInputFieldListContainer>
        </StyledComponent.SignupFormContainer>
    );
};

export default Signup;
