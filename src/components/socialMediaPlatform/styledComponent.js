import styled from "styled-components";
import { BsWhatsapp, BsFacebook, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";

export const WhatsappIcon = styled(BsWhatsapp)`
    color: white;
    background-color: rgb(40, 239, 40);
    border-radius: 10px;
    padding: 0.22em;
    cursor: pointer;
    font-size: clamp(1rem, 1vw + 1.6rem, 2rem);
`;
export const FacebookIcon = styled(BsFacebook)`
    color: white;
    background-color: rgb(19, 132, 223);
    border-radius: 10px;
    padding: 0.22em;
    cursor: pointer;
    font-size: clamp(1rem, 1vw + 1.6rem, 2rem);
`;

export const TwitterIcon = styled(FaXTwitter)`
    color: white;
    background-color: black;
    border-radius: 10px;
    padding: 0.22em;
    cursor: pointer;
    font-size: clamp(1rem, 1vw + 1.6rem, 2rem);
`;

export const EmailIcon = styled(AiOutlineMail)`
    color: white;
    background-color: grey;
    border-radius: 10px;
    padding: 0.22em;
    cursor: pointer;
    font-size: clamp(1rem, 1vw + 1.6rem, 2rem);
`;

export const LinkedinIcon = styled(BsLinkedin)`
    color: white;
    background-color: rgb(19, 132, 223);
    border-radius: 10px;
    padding: 0.22em;
    cursor: pointer;
    font-size: clamp(1rem, 1vw + 1.6rem, 2rem);
`;

export const SocialMediaPlatformItem = styled.li`
    text-align: center;
    &:hover {
        transform: scale(1.01);
    }
`;

export const SocialMediaName = styled.p`
    font-size: clamp(0.1rem, 1vw + 0.42rem, 0.73rem);
    margin: 0;
    margin-top: 0.25em;
`;
