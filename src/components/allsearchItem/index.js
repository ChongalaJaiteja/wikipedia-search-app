import * as StyledComponent from "./styledComponent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAuthContext } from "../../authContext";
import toast from "react-hot-toast";

const AllSearchItem = ({ searchItemDetails, onShareLink }) => {
    const { title, pageid, snippet } = searchItemDetails;
    const link = `https://en.wikipedia.org/wiki/${title}`;
    const { isSignedIn, onSignout, onSignin, jwtToken } = useAuthContext();
    const addHistory = async () => {
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/history`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                    title,
                    link,
                }),
            };
            await fetch(url, options);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <StyledComponent.SearchItem>
                <StyledComponent.SearchItemContentContainer>
                    <StyledComponent.SearchItemHeader>
                        <StyledComponent.SearchItemTitle
                            href={link}
                            target="_blank"
                            onClick={addHistory}
                        >
                            {title}
                        </StyledComponent.SearchItemTitle>
                        <StyledComponent.SearchItemUrl
                            href={link}
                            target="_blank"
                            onClick={addHistory}
                        >
                            {link}
                        </StyledComponent.SearchItemUrl>
                    </StyledComponent.SearchItemHeader>

                    <StyledComponent.SearchItemDescription
                        dangerouslySetInnerHTML={{ __html: snippet + "..." }}
                    ></StyledComponent.SearchItemDescription>
                </StyledComponent.SearchItemContentContainer>

                <StyledComponent.SearchItemFooter>
                    <Tooltip title="Share">
                        <IconButton>
                            <StyledComponent.ShareIconContainer
                                onClick={() => onShareLink(link)}
                            >
                                <StyledComponent.ShareIcon />
                                <StyledComponent.ShareText>
                                    Share
                                </StyledComponent.ShareText>
                            </StyledComponent.ShareIconContainer>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Bookmark">
                        <IconButton>
                            <StyledComponent.BookmarkIcon />
                            <StyledComponent.BookmarkText>
                                Bookmark
                            </StyledComponent.BookmarkText>
                        </IconButton>
                    </Tooltip>
                </StyledComponent.SearchItemFooter>
            </StyledComponent.SearchItem>
        </>
    );
};

export default AllSearchItem;
