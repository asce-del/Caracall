import React from "react"
import {AppBar, Toolbar, Typography} from "@material-ui/core";

import "./Header.css"

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6">Scroll to Elevate App Bar</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header