import { useState } from "react";
import { useModelState } from "../../modelStateContext";
import * as StyledComponent from "./styledComponent";
import SocialMediaPlatform from "../socialMediaPlatform";

// Define a list of social media platforms for sharing.
const socialMediaList = [
    {
        id: "WHATSAPP",
        name: "WhatsApp",
        StyledIcon: "WhatsappIcon",
    },
    {
        id: "FACEBOOK",
        name: "Facebook",
        StyledIcon: "FacebookIcon",
    },
    {
        id: "X",
        name: "X",
        StyledIcon: "TwitterIcon",
    },
    {
        id: "EMAIL",
        name: "Email",
        StyledIcon: "EmailIcon",
    },
    {
        id: "LINKEDIN",
        name: "Linkedin",
        StyledIcon: "LinkedinIcon",
    },
];

// ShareModel component is responsible for rendering a share options modal.
const ShareModel = ({ link }) => {
    // Define a state variable to track if the Wikipedia link is copied.
    const [copyWikiUrl, setCopyWikiUrl] = useState(false);

    // Access the closeModel function from the modelStateContext.
    const { closeModel } = useModelState();

    // Function to handle copying the Wikipedia link to the clipboard.
    const onCopyWikiUrl = () => {
        navigator.clipboard.writeText(link).then(() => setCopyWikiUrl(true));
        setTimeout(() => setCopyWikiUrl(false), 1020);
    };

    return (
        <>
            {/* Header section of the share modal. */}
            <StyledComponent.SharePopupHeaderContainer>
                <StyledComponent.MainHeading>Share</StyledComponent.MainHeading>
                <StyledComponent.PopUpCloseIcon onClick={closeModel} />
            </StyledComponent.SharePopupHeaderContainer>

            {/* Container for displaying social media sharing options. */}
            <StyledComponent.SharePlatformsBgContainer>
                {socialMediaList.map((eachSocialMedia) => (
                    <SocialMediaPlatform
                        key={eachSocialMedia.id}
                        socialMediaDetails={eachSocialMedia}
                        wikipediaLink={link}
                    />
                ))}
            </StyledComponent.SharePlatformsBgContainer>

            {/* Container for displaying the Wikipedia link and copy button. */}
            <StyledComponent.WikipediaLinkContainer>
                <StyledComponent.WikiUrl title={link}>
                    {link}
                </StyledComponent.WikiUrl>
                <StyledComponent.CopyWikiUrlBtn
                    onClick={onCopyWikiUrl}
                    copied={copyWikiUrl.toString()}
                >
                    {copyWikiUrl ? "Copied" : "Copy"}
                </StyledComponent.CopyWikiUrlBtn>
            </StyledComponent.WikipediaLinkContainer>
        </>
    );
};

export default ShareModel; // Export the ShareModel component.
