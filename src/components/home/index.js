import { useState } from "react";
import * as StyledComponent from "./styledComponent";
import { useNavigate } from "react-router-dom";
import { useModelState } from "../../modelStateContext";
import { useWikipediaContext } from "../../wikipediaContext";
import PopupModel from "../popupModel";
import Authentication from "../authentication";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// import SearchSuggestion from "../searchSuggestion";

const Home = () => {
    // Initialize the React Router navigation hook
    const navigate = useNavigate();

    // Define a state variable for the search input and a function to update it
    const [searchInput, onChangeInput] = useState("");
    const { openModel } = useModelState();
    const { isLightTheme, toggleTheme } = useWikipediaContext();

    // Define a function to handle form submission
    const onSubmit = (event) => {
        event.preventDefault();
        // Redirect to the Wikipedia search page with the search query and type parameters
        navigate(`/wikipedia?search_query=${searchInput.trim()}&type=ALL`);
    };

    // Define a function to render the options in the home component
    const renderHomeOptions = () => (
        <StyledComponent.HomeOptionsContainer>
            {/* Link to the "History" page */}
            <StyledComponent.HomeOptions>
                <StyledComponent.StyledLink to="/history">
                    History
                </StyledComponent.StyledLink>
            </StyledComponent.HomeOptions>

            <StyledComponent.HomeOptions>
                <Tooltip title="Login / Signup">
                    <IconButton>
                        <StyledComponent.LoginBtn onClick={openModel}>
                            Login / Signup
                        </StyledComponent.LoginBtn>
                    </IconButton>
                </Tooltip>
            </StyledComponent.HomeOptions>
            {/* Button to toggle between light and dark mode */}
            <StyledComponent.HomeOptions onClick={toggleTheme}>
                {isLightTheme ? (
                    <Tooltip title="Dark Mode">
                        <IconButton>
                            <StyledComponent.DarkModeIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Light Mode">
                        <IconButton>
                            <StyledComponent.LightModeIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </StyledComponent.HomeOptions>
        </StyledComponent.HomeOptionsContainer>
    );

    return (
        <>
            <PopupModel>
                <Authentication />
            </PopupModel>
            <StyledComponent.HomeBgContainer>
                {/* Render the home options */}
                {renderHomeOptions()}
                <StyledComponent.SearchBgContainer>
                    <StyledComponent.WikipediaImage
                        src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png"
                        alt="wikipedia-img"
                    />
                    <StyledComponent.SearchFormContainer onSubmit={onSubmit}>
                        {/* Input field for searching */}
                        <StyledComponent.SearchInput
                            type="search"
                            placeholder="Enter a Keyword"
                            onChange={(event) =>
                                onChangeInput(event.target.value)
                            }
                            value={searchInput}
                            autoFocus={true}
                        />
                        {/* Uncomment the following lines to display search suggestions */}
                        {/* {searchInput && (
                        <SearchSuggestion searchInput={searchInput} />
                    )} */}
                    </StyledComponent.SearchFormContainer>
                </StyledComponent.SearchBgContainer>
            </StyledComponent.HomeBgContainer>
        </>
    );
};
export default Home;
