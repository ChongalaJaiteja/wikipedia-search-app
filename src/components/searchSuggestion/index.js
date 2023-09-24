import { useState, useEffect } from "react";

import * as StyledComponent from "./styledComponent";

const SearchSuggestion = (props) => {
    const { searchInput } = props;

    console.log(searchInput);

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
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const id = setTimeout(() => {
            fetchSuggestions();
        }, 2000);
    }, [searchInput]);

    return <h1>search</h1>;
};

export default SearchSuggestion;
