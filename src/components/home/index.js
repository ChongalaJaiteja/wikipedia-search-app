import { useState } from "react";
import * as StyledComponent from "./styledComponent";
import { WikipediaContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import PopupModel from "../popupModel";
import Authentication from "../authentication";
import SearchSuggestion from "../searchSuggestion";

const Home = () => {
    // Initialize the React Router navigation hook
    const navigate = useNavigate();

    // Define a state variable for the search input and a function to update it
    const [searchInput, onChangeInput] = useState("");
    const [showModel, setShowModel] = useState(false);

    // Define a function to handle form submission
    const onSubmit = (event) => {
        event.preventDefault();
        // Redirect to the Wikipedia search page with the search query and type parameters
        navigate(`/wikipedia?search_query=${searchInput.trim()}&type=ALL`);
    };

    // Define a function to render the options in the home component
    const renderHomeOptions = () => (
        <WikipediaContext.Consumer>
            {(value) => {
                const { toggleTheme, isLightTheme } = value;
                return (
                    <StyledComponent.HomeOptionsContainer>
                        {/* Link to the "History" page */}
                        <StyledComponent.HomeOptions>
                            <StyledComponent.StyledLink to="/history">
                                History
                            </StyledComponent.StyledLink>
                        </StyledComponent.HomeOptions>

                        <StyledComponent.HomeOptions title="Login">
                            <StyledComponent.LoginBtn
                                onClick={() => setShowModel(true)}
                            >
                                Login / Signup
                            </StyledComponent.LoginBtn>
                        </StyledComponent.HomeOptions>
                        {/* Button to toggle between light and dark mode */}
                        <StyledComponent.HomeOptions onClick={toggleTheme}>
                            {isLightTheme ? (
                                <StyledComponent.DarkModeIcon title="Dark Mode" />
                            ) : (
                                <StyledComponent.LightModeIcon title="Light Mode" />
                            )}
                        </StyledComponent.HomeOptions>
                    </StyledComponent.HomeOptionsContainer>
                );
            }}
        </WikipediaContext.Consumer>
    );

    return (
        <StyledComponent.HomeBgContainer>
            {/* Render the home options */}
            {showModel && (
                <PopupModel closeModel={() => setShowModel(false)}>
                    <Authentication closeModel={() => setShowModel(false)} />
                </PopupModel>
            )}
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
                        onChange={(event) => onChangeInput(event.target.value)}
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
    );
};
export default Home;
