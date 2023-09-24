import { useState } from "react";
import SharePopupModel from "../sharePopupModel";
import * as StyledComponent from "./styledComponent";

const AllSearchItem = (props) => {
    const { searchItemDetails } = props;
    const { title, pageid, snippet } = searchItemDetails;
    const link = `https://en.wikipedia.org/wiki/${title}`;
    const [showModel, setShowModel] = useState(false);
    const closeModel = (event) => {
        event.stopPropagation();
        setShowModel(false);
    };
    return (
        <>
            {showModel && (
                <SharePopupModel closeModel={closeModel} link={link} />
            )}
            <StyledComponent.SearchItem>
                <StyledComponent.TitleShareContainer>
                    <StyledComponent.SearchItemTitle
                        href={link}
                        target="_blank"
                    >
                        {title}
                    </StyledComponent.SearchItemTitle>
                    <StyledComponent.ShareIconContainer
                        onClick={() => setShowModel(true)}
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
