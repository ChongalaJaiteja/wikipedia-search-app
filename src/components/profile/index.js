import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as StyledComponent from "./styledComponent";

function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
            />
        </Box>
    );
}

const Profile = () => {
    return (
        <StyledComponent.ProfileBgContainer>
            <StyledComponent.ProfileCard>
                <StyledComponent.ProfileIcon />
                {BasicTextFields()}
            </StyledComponent.ProfileCard>
        </StyledComponent.ProfileBgContainer>
    );
};

export default Profile;
