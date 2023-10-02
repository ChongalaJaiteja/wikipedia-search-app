import { useModelState } from "../../modelStateContext";
import PopupModel from "../popupModel";
import ShareModel from "../shareModel";
import * as StyledComponent from "./styledComponent";

const AllSearchItem = ({ searchItemDetails }) => {
    const { title, pageid, snippet } = searchItemDetails;
    const link = `https://en.wikipedia.org/wiki/${title}`;
    // const [showModel, setShowModel] = useState(false);
    const {openModel } = useModelState();

    return (
        <>
            <PopupModel>
                <ShareModel link={link} />
            </PopupModel>
            <StyledComponent.SearchItem>
                <StyledComponent.TitleShareContainer>
                    <StyledComponent.SearchItemTitle
                        href={link}
                        target="_blank"
                    >
                        {title}
                    </StyledComponent.SearchItemTitle>
                    <StyledComponent.ShareIconContainer onClick={openModel}>
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
