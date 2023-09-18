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
    // const [searchResults, setSearchResults] = useState([]);
    // const [isLoading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const onSubmitSearchInput = (event) => {
        event.preventDefault();
        navigate(`/wikipedia?search_query=${searchInput}&type=ALL`);
    };

    const changeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const onSelectSearchOption = (id) => {
        setSearchOptionId(id);
        setQuery({ search_query: searchInput, type: id });
    };

    // const fetchData = async () => {
    //     let apiUrl;
    //     // console.log("search type", currentSearchOptionId);
    //     switch (currentSearchOptionId) {
    //         case "ALL":
    //             apiUrl = `https://apis.ccbp.in/wiki-search?search=${query.get(
    //                 "search_query"
    //             )}`;
    //             break;
    //         case "IMAGES":
    //             apiUrl = "image";
    //             break;
    //         // case "HISTORY":
    //         //     console.log("history");
    //         //     break;
    //         default:
    //             alert("Error");
    //     }
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch(apiUrl);
    //         let data = await response.json();
    //         if (currentSearchOptionId === "ALL") data = data.search_results;
    //         setSearchResults(data);
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        if (query) {
            setSearchInput(searchQuery);
            setSearchOptionId(searchQueryType);
            // fetchData();
        }
    }, [query]);

    const renderNavBar = () => (
        <WikipediaContext.Consumer>
            {(value) => {
                const { isLightTheme, toggleTheme } = value;

                return (
                    <StyledComponents.NavBar>
                        <StyledComponents.StyledLogoLink to="/">
                            <StyledComponents.WikipediaNavLogo title="wikipedia" />
                        </StyledComponents.StyledLogoLink>
                        <StyledComponents.NavSearchFormContainer
                            onSubmit={onSubmitSearchInput}
                        >
                            <StyledComponents.NavSearchInput
                                type="search"
                                placeholder="Enter a Keyword"
                                onChange={changeSearchInput}
                                value={searchInput}
                            />
                        </StyledComponents.NavSearchFormContainer>
                        <StyledComponents.NavBarToggleThemeContainer
                            onClick={toggleTheme}
                        >
                            {isLightTheme ? (
                                <StyledComponents.DarkModeIcon />
                            ) : (
                                <StyledComponents.LightModeIcon />
                            )}
                        </StyledComponents.NavBarToggleThemeContainer>
                    </StyledComponents.NavBar>
                );
            }}
        </WikipediaContext.Consumer>
    );

    // const RenderLoader = () => (
    //     <>
    //         <StyledComponents.LoaderContainer>
    //             <ScaleLoader color="hsla(213, 70%, 71%, 1)" />
    //         </StyledComponents.LoaderContainer>
    //     </>
    // );

    // const RenderAllSearchResults = () => (
    //     <ul>
    //         {searchResults.map((eachSearch) => (
    //             <AllSearchItem key={uuidv4()} searchItemDetails={eachSearch} />
    //         ))}
    //     </ul>
    // );

    const RenderSearchResults = () => {
        // if (error) {
        //     console.log(error);
        //     return <h1>error</h1>;
        // }

        // if (searchResults.length === 0) {
        //     return <h1>Not found</h1>;
        // }

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
