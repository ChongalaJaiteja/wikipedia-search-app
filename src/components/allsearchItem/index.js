import * as StyledComponent from "./styledComponent";

const AllSearchItem = (props) => {
    const { searchItemDetails } = props;
    const { title, pageid, snippet } = searchItemDetails;
    const link = `https://en.wikipedia.org/wiki/${title}`;
    return (
        <StyledComponent.SearchItem>
            <StyledComponent.SearchItemTitle href={link} target="_blank">
                {title}
            </StyledComponent.SearchItemTitle>
            <StyledComponent.SearchItemUrl href={link} target="_blank">
                {link}
            </StyledComponent.SearchItemUrl>
            <StyledComponent.SearchItemDescription
                dangerouslySetInnerHTML={{ __html: snippet + "..." }}
            ></StyledComponent.SearchItemDescription>
        </StyledComponent.SearchItem>
    );
};

export default AllSearchItem;
