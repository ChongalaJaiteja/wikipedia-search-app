import * as StyledComponent from "./styledComponent";
import { useModelState } from "../../modelStateContext";
import { useWikipediaContext } from "../../wikipediaContext";

const PopupModel = ({ children }) => {
    const handelPropagation = (event) => event.stopPropagation();
    const { showModel, closeModel } = useModelState();
    const { isLightTheme } = useWikipediaContext();
    const Toaster = () => (
        <StyledComponent.StyledToaster
            position="top-center"
            containerStyle={{
                top: 38,
            }}
            gutter={14}
            reverseOrder={false}
            toastOptions={{
                duration: 2000,
                style: {
                    padding: "10px",
                    color: `${isLightTheme ? "black" : "white"}`,
                    background: `${isLightTheme ? "white" : "#1E1E1E"}`,
                },
            }}
        />
    );

    return (
        <>
            {showModel && (
                <StyledComponent.PopupBgContainer>
                    <StyledComponent.PopupModel onClick={handelPropagation}>
                        {children}
                    </StyledComponent.PopupModel>
                    {Toaster()}
                </StyledComponent.PopupBgContainer>
            )}
        </>
    );
};

export default PopupModel;
