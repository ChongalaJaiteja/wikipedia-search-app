import * as StyledComponent from "./styledComponent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const AllSearchItem = ({ searchItemDetails, onShareLink }) => {
    const { title, pageid, snippet } = searchItemDetails;
    const link = `https://en.wikipedia.org/wiki/${title}`;

    return (
        <>
            <StyledComponent.SearchItem>
                <StyledComponent.TitleShareContainer>
                    <StyledComponent.SearchItemTitle
                        href={link}
                        target="_blank"
                    >
                        {title}
                    </StyledComponent.SearchItemTitle>
                    <StyledComponent.ShareIconContainer
                        onClick={() => onShareLink(link)}
                    >
                        <Tooltip title="Share">
                            <IconButton>
                                <StyledComponent.ShareIcon />
                            </IconButton>
                        </Tooltip>
                        <StyledComponent.ShareText>
                            Share
                        </StyledComponent.ShareText>
                    </StyledComponent.ShareIconContainer>
                </StyledComponent.TitleShareContainer>
                <StyledComponent.SearchItemUrl href={link} target="_blank">
                    {link}
                </StyledComponent.SearchItemUrl>
                <StyledComponent.SearchItemDescription
                    dangerouslySetInnerHTML={{ __html: snippet + "..." }}
                ></StyledComponent.SearchItemDescription>
            </StyledComponent.SearchItem>
        </>
    );
};

export default AllSearchItem;
