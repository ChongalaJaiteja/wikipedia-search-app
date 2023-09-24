import { useState } from "react";
import * as StyledComponent from "./styledComponent";
import { WikipediaContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import SearchSuggestion from "../searchSuggestion";

const Home = () => {
    const navigate = useNavigate();
    const [searchInput, onChangeInput] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        navigate(`/wikipedia?search_query=${searchInput}&type=ALL`);
    };

    const renderHomeOptions = () => (
        <WikipediaContext.Consumer>
            {(value) => {
                const { toggleTheme, isLightTheme } = value;
                return (
                    <StyledComponent.HomeOptionsContainer>
                        <StyledComponent.StyledLink to="/history">
                            History
                        </StyledComponent.StyledLink>
                        <StyledComponent.HomeOptions onClick={toggleTheme}>
                            {isLightTheme ? (
                                <StyledComponent.DarkModeIcon />
                            ) : (
                                <StyledComponent.LightModeIcon />
                            )}
                        </StyledComponent.HomeOptions>
                    </StyledComponent.HomeOptionsContainer>
                );
            }}
        </WikipediaContext.Consumer>
    );

    return (
        <StyledComponent.HomeBgContainer>
            {renderHomeOptions()}
            <StyledComponent.SearchBgContainer>
                <StyledComponent.WikipediaImage
                    src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png"
                    alt="wikipedia-img"
                />
                <StyledComponent.SearchFormContainer onSubmit={onSubmit}>
                    <StyledComponent.SearchInput
                        type="search"
                        placeholder="Enter a Keyword"
                        onChange={(event) => onChangeInput(event.target.value)}
                        value={searchInput}
                    />
                    {/* {searchInput && (
                        <SearchSuggestion searchInput={searchInput} />
                    )} */}
                </StyledComponent.SearchFormContainer>
            </StyledComponent.SearchBgContainer>
        </StyledComponent.HomeBgContainer>
    );
};
export default Home;
