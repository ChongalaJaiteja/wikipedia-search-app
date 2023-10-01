import * as StyledComponents from "./styledComponent";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { WikipediaContext } from "../../Context";
import SearchOption from "../searchOption";
import AllSearchResults from "../allSearchResults";
import ImageSearch from "../imageSearch";

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
        <WikipediaContext.Consumer>
            {(value) => {
                const { isLightTheme, toggleTheme } = value;

                return (
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
                                onChange={(event) =>
                                    setSearchInput(event.target.value)
                                }
                                value={searchInput}
                            />
                        </StyledComponents.NavSearchFormContainer>
                        <StyledComponents.NavBarToggleThemeContainer
                            onClick={toggleTheme}
                        >
                            {isLightTheme ? (
                                <StyledComponents.NavDarkModeIcon title="dark mode" />
                            ) : (
                                <StyledComponents.NavLightModeIcon title="light mode" />
                            )}
                        </StyledComponents.NavBarToggleThemeContainer>
                    </StyledComponents.NavBar>
                );
            }}
        </WikipediaContext.Consumer>
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
