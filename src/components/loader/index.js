import * as StyledComponents from "./styledComponent";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => (
    <StyledComponents.LoaderContainer>
        <ScaleLoader color="hsla(213, 70%, 71%, 1)" />
    </StyledComponents.LoaderContainer>
);

export default Loader;
