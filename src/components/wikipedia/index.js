import * as StyledComponents from "./styledComponent";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWikipediaContext } from "../../wikipediaContext";
import SearchOption from "../searchOption";
import AllSearchResults from "../allSearchResults";
import ImageSearch from "../imageSearch";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const searchOptionsList = [
    { id: "ALL", option: "All" },
    { id: "IMAGES", option: "Images" },
    // { id: "HISTORY", option: "History" },
];

const Wikipedia = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const searchQuery = query.get("search_query");
    const searchQueryType = query.get("type");

    const [searchInput, setSearchInput] = useState(searchQuery);
    const [currentSearchOptionId, setSearchOptionId] =
        useState(searchQueryType);
    const { isLightTheme, toggleTheme } = useWikipediaContext();

    const onSubmitSearchInput = (event) => {
        event.preventDefault();
        navigate(`/wikipedia?search_query=${searchInput.trim()}&type=ALL`);
    };

    const onSelectSearchOption = (id) => {
        setSearchOptionId(id);
        setQuery({ search_query: searchInput, type: id });
    };

    useEffect(() => {
        if (query) {
            setSearchInput(searchQuery);
            setSearchOptionId(searchQueryType);
        }
    }, [query]);

    const renderNavBar = () => (
        <StyledComponents.NavBar>
            <StyledComponents.StyledLogoLink to="/wikipedia-search-app">
                <StyledComponents.WikipediaNavLogo title="wikipedia" />
            </StyledComponents.StyledLogoLink>
            <StyledComponents.NavSearchFormContainer
                onSubmit={onSubmitSearchInput}
            >
                <StyledComponents.NavSearchInput
                    type="search"
                    placeholder="Enter a Keyword"
                    onChange={(event) => setSearchInput(event.target.value)}
                    value={searchInput}
                />
            </StyledComponents.NavSearchFormContainer>
            <StyledComponents.NavBarToggleThemeContainer onClick={toggleTheme}>
                {isLightTheme ? (
                    <Tooltip title="dark mode">
                        <IconButton>
                            <StyledComponents.NavDarkModeIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="light mode">
                        <IconButton>
                            <StyledComponents.NavLightModeIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </StyledComponents.NavBarToggleThemeContainer>
        </StyledComponents.NavBar>
    );

    const RenderSearchResults = () => {
        switch (currentSearchOptionId) {
            case "ALL":
                return <AllSearchResults />;
            case "IMAGES":
                return <ImageSearch />;
            // case "HISTORY":
            //     console.log("history");
            //     break;
            default:
                navigate("/*");
        }
    };

    const renderSearchFilter = () => (
        <StyledComponents.SearchOptionsBgContainer>
            {searchOptionsList.map((eachSearchOption) => (
                <SearchOption
                    isCurrentSearchOption={
                        currentSearchOptionId === eachSearchOption.id
                    }
                    key={eachSearchOption.id}
                    searchOptionDetails={eachSearchOption}
                    onSelectSearchOption={onSelectSearchOption}
                />
            ))}
        </StyledComponents.SearchOptionsBgContainer>
    );

    return (
        <StyledComponents.WikipediaMainBgContainer>
            {renderNavBar()}
            {renderSearchFilter()}
            {RenderSearchResults()}
        </StyledComponents.WikipediaMainBgContainer>
    );
};
export default Wikipedia;
