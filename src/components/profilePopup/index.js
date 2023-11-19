import * as StyledComponent from "./styledComponent";
import { useAuthContext } from "../../authContext";
import { useState } from "react";

// ProfilePopup component is responsible for rendering a user profile popup menu.
const ProfilePopup = ({ isWikipediaPage }) => {
    // Define a state variable to control the visibility of the profile menu.
    const [showProfileMenu, setProfileMenu] = useState(false);

    // Access the isSignedIn and onSignout functions from the authContext.
    const { isSignedIn, onSignout } = useAuthContext();

    return (
        <StyledComponent.ProfilePopUpBgContainer>
            {isSignedIn && (
                // Render the profile menu if the user is signed in.
                <>
                    <StyledComponent.UserProfileAvatar
                        src="/broken-image.jpg"
                        onClick={() => setProfileMenu((prev) => !prev)}
                    />
                    {showProfileMenu && (
                        // Render the profile menu container if showProfileMenu is true.
                        <StyledComponent.ProfilePopUpContainer>
                            <StyledComponent.StyledLink to="/wikipedia-search-app/profile">
                                Profile
                            </StyledComponent.StyledLink>
                            {isWikipediaPage && (
                                // Render the "History" link if it's a Wikipedia page.
                                <StyledComponent.StyledLink to="/wikipedia-search-app/history">
                                    History
                                </StyledComponent.StyledLink>
                            )}
                            {/* <StyledComponent.StyledLink to="/bookmarks">
                                Bookmarks
                            </StyledComponent.StyledLink> */}
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

export default ProfilePopup; // Export the ProfilePopup component.
