// Import necessary modules and components
import * as StyledComponent from "./styledComponent"; // Import styled components from "styledComponent"
import IconButton from "@mui/material/IconButton"; // Import IconButton component from Material-UI
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip component from Material-UI
import { useAuthContext } from "../../authContext"; // Import the custom hook for authentication context
import toast from "react-hot-toast"; // Import the 'react-hot-toast' library for notifications

// Define the AllSearchItem component that displays search results
const AllSearchItem = ({ searchItemDetails, onShareLink }) => {
    // Extract relevant data from the 'searchItemDetails' prop
    const { title, pageid, snippet } = searchItemDetails;
    const link = `${process.env.REACT_APP_WIKI_PAGE_URL}/${title}`;

    // Use the 'useAuthContext' hook to access authentication-related data
    const { isSignedIn, onSignout, onSignin, jwtToken } = useAuthContext();

    // Define a function 'addHistory' to add the current search item to the user's history
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
            {/* Render the search item using styled components */}
            <StyledComponent.SearchItem>
                <StyledComponent.SearchItemContentContainer>
                    <StyledComponent.SearchItemHeader>
                        {/* Render the search item title and link, and handle history addition on click */}
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

                    {/* <Tooltip title="Bookmark">
                        <IconButton>
                            <StyledComponent.BookmarkIcon />
                            <StyledComponent.BookmarkText>
                                Bookmark
                            </StyledComponent.BookmarkText>
                        </IconButton>
                    </Tooltip> */}
                </StyledComponent.SearchItemFooter>
            </StyledComponent.SearchItem>
        </>
    );
};

// Export the AllSearchItem component
export default AllSearchItem;
