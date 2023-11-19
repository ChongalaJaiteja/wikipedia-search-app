// Import necessary modules and components
import { useState } from "react";
import * as StyleComponent from "./styledComponent"; // Import styled components for styling
import { useModelState } from "../../modelStateContext"; // Import custom hook for model state context
import SignIn from "../signin"; // Import the SignIn component for signing in
import Signup from "../signup"; // Import the Signup component for signing up

// Define tabs for switching between Sign In and Sign Up forms
const tabs = [
    { tabId: "SIGNIN", label: "Sign in" },
    { tabId: "SIGNUP", label: "Sign up" },
];

// Define the Authentication component responsible for displaying the authentication forms
const Authentication = () => {
    // Initialize state to manage the current active tab (default: Sign In)
    const [currentTab, setCurrentTab] = useState(tabs[0].tabId);

    // Use the 'useModelState' hook to access model state functions
    const { closeModel } = useModelState();

    // Define a function to handle tab clicks and switch between Sign In and Sign Up
    const handleTabClick = (tabId) => {
        setCurrentTab(tabId);
    };

    // Define a function to render the appropriate user form based on the current tab
    const renderUserForm = () => {
        if (currentTab === tabs[0].tabId) return <SignIn />; // Render Sign In form
        return <Signup />; // Render Sign Up form
    };

    return (
        <StyleComponent.AuthenticationBgContainer>
            <StyleComponent.AuthenticationHeader>
                <StyleComponent.AuthenticationMessage>
                    Please{" "}
                    {currentTab[0].toUpperCase() +
                        currentTab.slice(1).toLocaleLowerCase()}{" "}
                    To Continue
                </StyleComponent.AuthenticationMessage>
                <StyleComponent.CloseAuthenticationPopup onClick={closeModel} />
            </StyleComponent.AuthenticationHeader>
            <StyleComponent.AuthenticationCard>
                <StyleComponent.AuthenticationCardTabsContainer>
                    {tabs.map((tab) => (
                        <StyleComponent.AuthenticationCardTabItem
                            key={tab.tabId}
                        >
                            <StyleComponent.AuthenticationTabButton
                                id={tab.tabId}
                                onClick={() => handleTabClick(tab.tabId)}
                                selected={currentTab === tab.tabId}
                            >
                                {tab.label}
                            </StyleComponent.AuthenticationTabButton>
                        </StyleComponent.AuthenticationCardTabItem>
                    ))}
                </StyleComponent.AuthenticationCardTabsContainer>
                {renderUserForm()}
            </StyleComponent.AuthenticationCard>
        </StyleComponent.AuthenticationBgContainer>
    );
};

// Export the Authentication component
export default Authentication;
