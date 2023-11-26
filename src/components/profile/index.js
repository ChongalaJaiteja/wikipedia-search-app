import * as React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import Toaster from "../toaster";
import * as StyledComponent from "./styledComponent";
import { useWikipediaContext } from "../../wikipediaContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../authContext";
import PageView from "../pageView";
import errorImg from "../../asserts/something-went-wrong.avif";

const initialState = {
    loading: true,
    data: [],
    error: { status: false, text: "" },
};

const Profile = () => {
    const { isLightTheme, toggleTheme } = useWikipediaContext();
    const [userProfileData, setUserProfileData] = useState(initialState);
    const [onSubmitLoading, setOnSubmitLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPasswordField, setShowPasswordField] = useState(false);
    const navigate = useNavigate();
    const { loading, data, error } = userProfileData;
    const { username, password } = data[0] || {};
    const [editable, setEditable] = useState(false);
    const { jwtToken } = useAuthContext();

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setUserProfileData((prev) => ({
            ...prev,
            data: [{ ...prev.data[0], [name]: value }],
        }));
    };

    const validateProfile = () => {
        const usernameReg = /^[a-z][\w]*$/gi;
        const passwordReg =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!usernameReg.test(username)) {
            toast.error("Invalid Username");
            return false;
        } else if (showPasswordField) {
            if (
                !(
                    passwordReg.test(currentPassword) &&
                    passwordReg.test(newPassword)
                )
            ) {
                toast.error("Invalid password");
                return false;
            }
        }
        return true;
    };

    const onSubmitProfile = async (event) => {
        event.preventDefault();
        setOnSubmitLoading(true);
        if (validateProfile()) {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/profile`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    method: "POST",
                    body: JSON.stringify({
                        username: username.trim(),
                        password:
                            newPassword !== ""
                                ? newPassword.trim()
                                : password.trim(),
                    }),
                };

                const response = await fetch(url, options);
                const responseText = await response.text();
                if (response.ok) {
                    toast.success(responseText);
                    fetchUserProfile();
                } else if (response.status === 409) {
                    toast.error(responseText);
                }
            } catch (error) {
                console.log(error);
                toast.error("Server Error");
            }
        }
        setEditable(false);
        setOnSubmitLoading(false);
    };

    const FormPropsTextFields = () => {
        return (
            <StyledComponent.StyledBox
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onSubmitProfile}
            >
                <StyledComponent.InputBoxBgContainer>
                    <StyledComponent.InputBox>
                        <StyledComponent.StyledTextField
                            id="standard-read-only-input"
                            label="Username"
                            name="username"
                            defaultValue="username"
                            value={username}
                            InputProps={{
                                readOnly: !editable,
                            }}
                            variant="standard"
                            onChange={onChangeInput}
                        />
                        <StyledComponent.EditButton
                            type="button"
                            onClick={() => setEditable((prev) => !prev)}
                        >
                            <Tooltip title="Edit">
                                <IconButton>
                                    <StyledComponent.EditIcon />
                                </IconButton>
                            </Tooltip>
                        </StyledComponent.EditButton>
                    </StyledComponent.InputBox>
                    {!showPasswordField && (
                        <StyledComponent.ChangePasswordBtn
                            type="button"
                            onClick={() => setShowPasswordField(true)}
                        >
                            Change Password
                        </StyledComponent.ChangePasswordBtn>
                    )}

                    {showPasswordField && (
                        <StyledComponent.PasswordInputsBgContainer>
                            <StyledComponent.StyledTextField
                                id="standard-read-only-input"
                                label="Current Password"
                                type="password"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(event) =>
                                    setCurrentPassword(event.target.value)
                                }
                                variant="standard"
                            />

                            <StyledComponent.StyledTextField
                                id="standard-read-only-input"
                                label="New Password"
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                variant="standard"
                            />
                        </StyledComponent.PasswordInputsBgContainer>
                    )}
                </StyledComponent.InputBoxBgContainer>

                <StyledComponent.BtnBgContainer>
                    {(editable || showPasswordField) && (
                        <StyledComponent.SaveBtn
                            type="submit"
                            disabled={onSubmitLoading}
                        >
                            <StyledComponent.BtnText>
                                Save
                            </StyledComponent.BtnText>
                            {onSubmitLoading && (
                                <ClipLoader
                                    color="rgba(169, 180, 177, 1)"
                                    size={10}
                                />
                            )}
                        </StyledComponent.SaveBtn>
                    )}
                </StyledComponent.BtnBgContainer>
            </StyledComponent.StyledBox>
        );
    };

    const renderProfile = () => {
        return (
            <StyledComponent.ProfileCard>
                <StyledComponent.ProfileIcon />
                {FormPropsTextFields()}
            </StyledComponent.ProfileCard>
        );
    };

    const fetchUserProfile = async () => {
        try {
            setUserProfileData((prev) => ({ ...prev, loading: true }));
            const url = `${process.env.REACT_APP_BASE_URL}/profile`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "GET",
            };
            const response = await fetch(url, options);
            const userData = await response.json();
            console.log(userData);
            if (response.ok) {
                setUserProfileData((prev) => ({ ...prev, data: [userData] }));
            } else {
                setUserProfileData((prev) => ({
                    ...prev,
                    error: { status: true, text: response.error_msg },
                }));
                toast.error("Server Error");
            }
        } catch (error) {
            setUserProfileData((prev) => ({
                ...prev,
                error: { status: true, text: error },
            }));
            console.log(error);
        } finally {
            setUserProfileData((prev) => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const svgLoader = (
        <StyledComponent.LoaderBgContainer>
            <ClipLoader color="#6e7170" />
        </StyledComponent.LoaderBgContainer>
    );

    const images = {
        reload: errorImg,
    };
    const limit = 1;
    const renderViews = {
        fetchData: fetchUserProfile, // Function to fetch Profile data
        loadingView: { isLoading: loading, svgLoader, limit },
        successView: {
            data: data,
            renderResults: renderProfile,
            notFoundImageUrl: "",
        },
        failureView: {
            reloadImageUrl: images.reload,
            reloadText: "Retry",
            error: error.status,
        },
    };

    return (
        <StyledComponent.ProfileBgContainer>
            <Toaster />
            <StyledComponent.ProfileNavBar>
                <Tooltip title="Back" onClick={() => navigate(-1)}>
                    <StyledComponent.ToolTipBtn>
                        <StyledComponent.NavigateBack />
                    </StyledComponent.ToolTipBtn>
                </Tooltip>
                <StyledComponent.ThemeIconBgContainer onClick={toggleTheme}>
                    {isLightTheme ? (
                        <Tooltip title="Dark Mode">
                            <IconButton>
                                <StyledComponent.DarkMode />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Light Mode">
                            <IconButton>
                                <StyledComponent.LightMode />
                            </IconButton>
                        </Tooltip>
                    )}
                </StyledComponent.ThemeIconBgContainer>
            </StyledComponent.ProfileNavBar>
            <PageView renderViews={renderViews} />
        </StyledComponent.ProfileBgContainer>
    );
};

export default Profile;
