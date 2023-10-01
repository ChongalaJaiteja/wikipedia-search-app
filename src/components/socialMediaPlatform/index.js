import * as StyledComponent from "./styledComponent";

const SocialMediaPlatform = ({ socialMediaDetails, wikipediaLink }) => {
    const { name, StyledIcon, id } = socialMediaDetails;

    const socialMediaIcons = {
        WhatsappIcon: StyledComponent.WhatsappIcon,
        FacebookIcon: StyledComponent.FacebookIcon,
        TwitterIcon: StyledComponent.TwitterIcon,
        EmailIcon: StyledComponent.EmailIcon,
        LinkedinIcon: StyledComponent.LinkedinIcon,
    };

    const CurrentSocialMediaIcon = socialMediaIcons[StyledIcon];
    const encodeUrl = wikipediaLink.split(" ").join("_");
    let socialMediaUrl = "";
    switch (id) {
        case "WHATSAPP":
            socialMediaUrl = `https://api.whatsapp.com/send?text=${encodeUrl}`;
            break;
        case "FACEBOOK":
            socialMediaUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`;
            break;
        case "X":
            socialMediaUrl = `https://twitter.com/intent/tweet?url=${encodeUrl}`;
            break;
        case "EMAIL":
            const emailSubject = "Check out this link";
            socialMediaUrl = `mailto:?subject=${emailSubject}&body=${encodeUrl}`;
            break;
        case "LINKEDIN":
            socialMediaUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl}`;
            break;
        default:
            socialMediaUrl = null;
    }
    const navigateToSocialMedia = () => {
        window.open(socialMediaUrl);
    };

    return (
        <StyledComponent.SocialMediaPlatformItem
            onClick={navigateToSocialMedia}
            title={name}
        >
            <CurrentSocialMediaIcon />
            <StyledComponent.SocialMediaName>
                {name}
            </StyledComponent.SocialMediaName>
        </StyledComponent.SocialMediaPlatformItem>
    );
};

export default SocialMediaPlatform;
