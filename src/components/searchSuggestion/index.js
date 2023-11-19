import { useState, useEffect } from "react";

import * as StyledComponent from "./styledComponent";

// SearchSuggestion component is responsible for fetching search suggestions.
const SearchSuggestion = (props) => {
    const { searchInput } = props;

    // Log the searchInput for debugging purposes.
    console.log(searchInput);

    // Function to fetch search suggestions.
    const fetchSuggestions = async () => {
        const url = `https://bing-autosuggest1.p.rapidapi.com/suggestions?q=${searchInput}%3CREQUIRED%3E`;
        const options = {
            method: "GET",
            headers: {
                "X-BingApis-SDK": "true",
                "X-RapidAPI-Key":
                    "a8238a2460msh79cb8ef2f578effp19b16fjsn1696f7c57b91",
                "X-RapidAPI-Host": "bing-autosuggest1.p.rapidapi.com",
            },
        };

        try {
            // Send a request to fetch suggestions.
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result); // Log the fetched results.
        } catch (error) {
            console.error(error); // Log any errors that occur during the fetch.
        }
    };

    useEffect(() => {
        // Set a timer to delay fetching suggestions for 2 seconds after the searchInput changes.
        const id = setTimeout(() => {
            fetchSuggestions();
        }, 2000);
    }, [searchInput]);

    return <h1>search</h1>; // Render a placeholder "search" element.
};

export default SearchSuggestion; // Export the SearchSuggestion component.
