// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  // Import MenuIcon from @mui/icons-material
import LoginSignupButtons from './LoginSignupButtons';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MK Store
                </Typography>
                <Box>
                    <LoginSignupButtons />
                    {/* Display Avatar when user is logged in */}
                    {/* For simplicity, assuming user is logged in */}
                    {/* <Avatar sx={{ bgcolor: 'primary.main', ml: 1 }}>JD</Avatar> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
