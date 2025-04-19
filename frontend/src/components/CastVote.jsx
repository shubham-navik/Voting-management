import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  CardContent,
  Container,
  TableContainer,
  Divider,
} from '@mui/material';

const CastVote = () => {
  const [elections, setElections] = useState([]);

  const fetchElections = () => {
    axios
      .get('https://voting-management.onrender.com/api/public/ongoingElections')
      .then((res) => {
        setElections(res.data.elections);
        toast.success('Fetched ongoing elections');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleVote = (electionId, candidateId) => {
    axios
      .post(
        'https://voting-management.onrender.com/api/voter/vote',
        { electionId, candidateId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // if token needed
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg || 'Vote cast successfully!');
        fetchElections();
      })
      .catch((err) => {
        toast.error(err.response?.data?.msg || err.message);
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {elections.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No ongoing elections at the moment.
        </Typography>
      ) : (
        elections.map((election, index) => (
          <Card key={index} variant="outlined" sx={{ mb: 4, backgroundColor: '#f0f8ff' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                {election.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {election.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Ends on: <strong>{new Date(election.endDate).toLocaleString()}</strong>
              </Typography>
              <Typography variant="body2" color="secondary">
                Status: {election.status}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                    <TableRow>
                      <TableCell>Candidate Name</TableCell>
                      <TableCell>Votes</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {election.electionData.map((candidate, i) => (
                      <TableRow key={i}>
                        <TableCell>{candidate.candidateName}</TableCell>
                        <TableCell>{candidate.votes}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleVote(election.electionId, candidate.candidateId)}
                          >
                            Vote
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default CastVote;
