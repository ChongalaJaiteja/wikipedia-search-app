import * as StyledComponent from "./styledComponent";

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
                        <StyledComponent.ShareIcon />
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
