import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#e11d48', height: '10vh', zIndex: 50 }}>
      <Toolbar className="flex justify-between w-full">
        {/* Logo / Title */}
        <Typography variant="h6" component="div" className="font-bold text-xl">
          📊 VoteRight (Election Commission of India)
        </Typography>

        {/* Nav Links */}
        <Box className="flex space-x-6 text-sm md:text-base">
          <Button component={Link} to="/" sx={{ color: 'white', '&:hover': { color: '#fca5a5' } }}>
            Home
          </Button>
          <Button component={Link} to="/candidates" sx={{ color: 'white', '&:hover': { color: '#fca5a5' } }}>
            Candidates
          </Button>
          <Button component={Link} to="/results" sx={{ color: 'white', '&:hover': { color: '#fca5a5' } }}>
            Results
          </Button>
          <Button component={Link} to="/about" sx={{ color: 'white', '&:hover': { color: '#fca5a5' } }}>
            About
          </Button>
        </Box>

        {/* Logout Button */}

        {token
          ? (<Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login')
            }}
            variant="contained"
            sx={{
              backgroundColor: '#dc2626',
              '&:hover': {
                backgroundColor: '#b91c1c',
              },
              textTransform: 'none',
              fontSize: { xs: '0.75rem', md: '1rem' },
              px: 2,
              py: 1,
              borderRadius: '6px',
            }}
          >
            Logout</Button>)
          : (<div className='flex space-x-4'>
                      <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login')
            }}
            variant="contained"
            sx={{
              backgroundColor: '#dc2626',
              '&:hover': {
                backgroundColor: '#b91c1c',
              },
              textTransform: 'none',
              fontSize: { xs: '0.75rem', md: '1rem' },
              px: 2,
              py: 1,
              borderRadius: '6px',
            }}
          >
            Login
            </Button>
            <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/register')
            }}
            variant="contained"
            sx={{
              backgroundColor: '#dc2626',
              '&:hover': {
                backgroundColor: '#b91c1c',
              },
              textTransform: 'none',
              fontSize: { xs: '0.75rem', md: '1rem' },
              px: 2,
              py: 1,
              borderRadius: '6px',
            }}
          >
            Register
          </Button>
            </div>)
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
