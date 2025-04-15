import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Divider,
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PeopleIcon from '@mui/icons-material/People';
import BallotIcon from '@mui/icons-material/Ballot';
import PollIcon from '@mui/icons-material/Poll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const LeftContent = () => {
  const [open, setOpen] = useState(true);
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <BallotIcon />, path: '/dashboard' },
    { text: 'Cast Vote', icon: <HowToVoteIcon />, path: '/cast-vote' },
    { text: 'Upcoming Elections', icon: <PollIcon />, path: '/upcoming-elections' },
    { text: 'Ongoing Elections', icon: <PollIcon />, path: '/ongoing-elections' },
    { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
    { text: 'Results', icon: <PollIcon />, path: '/results' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];
  

  return (
      <Box sx={{
          display: 'flex',
        backgroundColor:'#fecdd3'
     } }>
      {/* Always-visible toggle button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          top: 80,
          left: open ? drawerWidth + 16 : 16,
          zIndex: 1301, // higher than drawer
          backgroundColor: 'rose-200',
          border: '1px solid #ccc',
          boxShadow: 2,
        }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
            backgroundColor:'#FEE2E2',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LeftContent;
