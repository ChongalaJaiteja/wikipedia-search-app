import { useState } from "react";
import * as StyleComponent from "./styledComponent";
import { useModelState } from "../../modelStateContext";
import SignIn from "../signin";
import Signup from "../signup";

const tabs = [
    { tabId: "SIGNIN", label: "Sign in" },
    { tabId: "SIGNUP", label: "Sign up" },
];

const Authentication = () => {
    const [currentTab, setCurrentTab] = useState(tabs[0].tabId);
    const { closeModel } = useModelState();
    const handleTabClick = (tabId) => {
        setCurrentTab(tabId);
    };

    const renderUserForm = () => {
        if (currentTab === tabs[0].tabId) return <SignIn />;
        return <Signup />;
    };

    return (
        <StyleComponent.AuthenticationBgContainer>
            <StyleComponent.AuthenticationHeader>
                <StyleComponent.AuthenticationMessage>
                    Please Login To Continue
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

export default Authentication;
