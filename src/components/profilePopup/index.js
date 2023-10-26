import * as StyledComponent from "./styledComponent";
import { useAuthContext } from "../../authContext";
import { useState } from "react";

const ProfilePopup = ({ isWikipediaPage }) => {
    const [showProfileMenu, setProfileMenu] = useState(false);
    const { isSignedIn, onSignout } = useAuthContext();

    return (
        <StyledComponent.ProfilePopUpBgContainer>
            {isSignedIn && (
                <>
                    <StyledComponent.UserProfileAvatar
                        src="/broken-image.jpg"
                        onClick={() => setProfileMenu((prev) => !prev)}
                    />
                    {showProfileMenu && (
                        <StyledComponent.ProfilePopUpContainer>
                            <StyledComponent.StyledLink to="/profile">
                                Profile
                            </StyledComponent.StyledLink>
                            {isWikipediaPage && (
                                <StyledComponent.StyledLink to="/history">
                                    History
                                </StyledComponent.StyledLink>
                            )}
                            <StyledComponent.StyledLink to="/bookmarks">
                                Bookmarks
                            </StyledComponent.StyledLink>
                            <StyledComponent.SignOutBtn onClick={onSignout}>
                                Sign out
                            </StyledComponent.SignOutBtn>
                        </StyledComponent.ProfilePopUpContainer>
                    )}
                </>
            )}
        </StyledComponent.ProfilePopUpBgContainer>
    );
};

export default ProfilePopup;
