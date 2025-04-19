import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  TableContainer
} from '@mui/material';

const Dashboard = () => {
  const [participatedElections, setParticipatedElections] = useState([]);

  useEffect(() => {
    axios
      .get('https://voting-management.onrender.com/api/voter/votedElections', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        setParticipatedElections(res.data.participatedElections);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Profile />

      <Box mt={6}>
        <Typography variant="h5" fontWeight={600} gutterBottom color="primary">
          🗳️ Voted Elections
        </Typography>

        {Array.isArray(participatedElections) && participatedElections.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 400, borderRadius: 2 }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#1565c0', color: 'white' }}>
                    <strong>Election ID</strong>
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#1565c0', color: 'white' }}>
                    <strong>Title</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participatedElections.map((election, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' },
                      '&:nth-of-type(odd)': { backgroundColor: '#ffffff' },
                      '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                  >
                    <TableCell>{election.electionId}</TableCell>
                    <TableCell>{election.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" color="text.secondary" mt={2}>
            You haven’t voted in any elections yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
