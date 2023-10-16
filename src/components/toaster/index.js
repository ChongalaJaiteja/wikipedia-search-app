import * as StyledComponent from "./styledComponent";
import { useWikipediaContext } from "../../wikipediaContext";

const Toaster = () => {
    const { isLightTheme } = useWikipediaContext();
    return (
        <StyledComponent.StyledToaster
            position="top-center"
            containerStyle={{
                top: 34,
            }}
            gutter={13}
            reverseOrder={false}
            toastOptions={{
                duration: 2000,
                style: {
                    fontSize: "0.8rem",
                    padding: "10px",
                    color: `${isLightTheme ? "black" : "white"}`,
                    background: `${isLightTheme ? "white" : "#1E1E1E"}`,
                },
            }}
        />
    );
};

export default Toaster;
