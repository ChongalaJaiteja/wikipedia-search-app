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
        id: "LINKENDIN",
        name: "Linkedin",
        StyledIcon: "LinkedinIcon",
    },
];
const SharePopupModel = (props) => {
    const { closeModel, link } = props;
    const handelPropagation = (event) => event.stopPropagation();

    const [copyWikiUrl, setCopyWikiUrl] = useState(false);

    const onCopyWikiUrl = () => {
        navigator.clipboard.writeText(link).then(() => setCopyWikiUrl(true));
    };

    return (
        <StyledComponent.PopupBgContainer onClick={closeModel}>
            <StyledComponent.PopupModel onClick={handelPropagation}>
                <StyledComponent.PopupHeaderContainer>
                    <StyledComponent.MainHeading>
                        Share
                    </StyledComponent.MainHeading>
                    <StyledComponent.PopUpCloseIcon onClick={closeModel} />
                </StyledComponent.PopupHeaderContainer>

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
                    <StyledComponent.WikiUrl>{link}</StyledComponent.WikiUrl>
                    <StyledComponent.CopyWikiUrlBtn
                        onClick={onCopyWikiUrl}
                        copied={copyWikiUrl.toString()}
                    >
                        {copyWikiUrl ? "Copied" : "Copy"}
                    </StyledComponent.CopyWikiUrlBtn>
                </StyledComponent.WikipediaLinkContainer>
            </StyledComponent.PopupModel>
        </StyledComponent.PopupBgContainer>
    );
};

export default SharePopupModel;
