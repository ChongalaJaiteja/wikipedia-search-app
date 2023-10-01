import { useState } from "react";
import * as StyledComponent from "./styledComponent";
import SocialMediaPlatform from "../socialMediaPlatform";

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

const ShareModel = ({ closeModel, link }) => {
    const [copyWikiUrl, setCopyWikiUrl] = useState(false);

    const onCopyWikiUrl = () => {
        navigator.clipboard.writeText(link).then(() => setCopyWikiUrl(true));
        setTimeout(() => setCopyWikiUrl(false), 1020);
    };

    return (
        <>
            <StyledComponent.SharePopupHeaderContainer>
                <StyledComponent.MainHeading>Share</StyledComponent.MainHeading>
                <StyledComponent.PopUpCloseIcon onClick={closeModel} />
            </StyledComponent.SharePopupHeaderContainer>

            <StyledComponent.SharePlatformsBgContainer>
                {socialMediaList.map((eachSocialMedia) => (
                    <SocialMediaPlatform
                        key={eachSocialMedia.id}
                        socialMediaDetails={eachSocialMedia}
                        wikipediaLink={link}
                    />
                ))}
            </StyledComponent.SharePlatformsBgContainer>

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

export default ShareModel;
