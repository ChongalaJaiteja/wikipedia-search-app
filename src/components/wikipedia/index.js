import * as StyledComponents from "./styledComponent";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWikipediaContext } from "../../wikipediaContext";
import SearchOption from "../searchOption";
import AllSearchResults from "../allSearchResults";
import ImageSearch from "../imageSearch";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ProfilePopup from "../profilePopup";
import { useAuthContext } from "../../authContext";
import { useModelState } from "../../modelStateContext";
import PopupModel from "../popupModel";
import Authentication from "../authentication";
import toast from "react-hot-toast";

const searchOptionsList = [
    { id: "ALL", option: "All" },
    { id: "IMAGES", option: "Images" },
];

const Wikipedia = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const searchQuery = query.get("search_query");
    const searchQueryType = query.get("type");

    const [searchInput, setSearchInput] = useState(searchQuery);
    const [currentSearchOptionId, setSearchOptionId] =
        useState(searchQueryType);
    const [showSearchInputSm, setShowSearchInputSm] = useState(false);

    const { isLightTheme, toggleTheme } = useWikipediaContext();
    const { isSignedIn } = useAuthContext();
    const { openModel } = useModelState();

    const onSubmitSearchInput = (event) => {
        event.preventDefault();
        setShowSearchInputSm(false);
        navigate(
            `/wikipedia-search-app/wikipedia?search_query=${searchInput.trim()}&type=ALL`
        );
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

    const onClickSigninBtn = () => {
        openModel();
        navigate("/wikipedia-search-app");
    };
    const renderNavBar = () => (
        <StyledComponents.NavBar>
            <StyledComponents.NavSearchFormContainer
                onSubmit={onSubmitSearchInput}
                onBlur={() => setShowSearchInputSm(false)}
            >
                {!showSearchInputSm && (
                    <>
                        <StyledComponents.StyledLogoLink to="/wikipedia-search-app">
                            <StyledComponents.WikipediaNavLogo title="wikipedia" />
                        </StyledComponents.StyledLogoLink>

                        <StyledComponents.NavSearchInput
                            type="search"
                            placeholder="Enter a Keyword"
                            onChange={(event) =>
                                setSearchInput(event.target.value)
                            }
                            value={searchInput}
                        />

                        <StyledComponents.NavBarOptionsBgContainer>
                            <StyledComponents.NavSearchIcon
                                onClick={() => setShowSearchInputSm(true)}
                            />
                            <StyledComponents.NavBarToggleThemeContainer
                                onClick={toggleTheme}
                            >
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
                            {isSignedIn ? (
                                <ProfilePopup isWikipediaPage={true} />
                            ) : (
                                <Tooltip title="Signin">
                                    <IconButton onClick={onClickSigninBtn}>
                                        <StyledComponents.SigninTextSm>
                                            Sign in
                                        </StyledComponents.SigninTextSm>
                                        <StyledComponents.SigninBtn>
                                            Sign in
                                        </StyledComponents.SigninBtn>
                                    </IconButton>
                                </Tooltip>
                            )}
                        </StyledComponents.NavBarOptionsBgContainer>
                    </>
                )}

                {showSearchInputSm && (
                    <>
                        <StyledComponents.NavSearchIcon />
                        <StyledComponents.NavBarSearchInputSm
                            autoFocus={true}
                            type="search"
                            placeholder="Enter a Keyword"
                            onChange={(event) =>
                                setSearchInput(event.target.value)
                            }
                            value={searchInput}
                        />
                    </>
                )}
            </StyledComponents.NavSearchFormContainer>
        </StyledComponents.NavBar>
    );

    const RenderSearchResults = () => {
        switch (currentSearchOptionId) {
            case "ALL":
                return <AllSearchResults />;
            case "IMAGES":
                return <ImageSearch />;
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
        <>
            <StyledComponents.WikipediaMainBgContainer>
                {renderNavBar()}
                {renderSearchFilter()}
                {RenderSearchResults()}
            </StyledComponents.WikipediaMainBgContainer>
        </>
    );
};
export default Wikipedia;
