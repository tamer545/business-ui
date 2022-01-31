import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function MenuAppBar(props) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Business UI
                    </Typography>
                    <MenuItem onClick={() => navigate('/business')}>
                        <Typography textAlign="center">Meeting Liste</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/newMeetings')}>
                        <Typography textAlign="center">Neues Meeting</Typography>
                    </MenuItem>
                    {props.authenticated ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {props.user}
                                <MenuItem onClick={handleClose}>Abmelden</MenuItem>
                            </Menu>
                        </div>
                    ) : <Button
                        href={"/login"}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        Anmelden
                    </Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}