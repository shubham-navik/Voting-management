import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Link,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const OngoingElection = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchElections = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/public/ongoingElections');
      setElections(res.data.elections || []);
      toast.success('Ongoing elections loaded');
    } catch (err) {
      toast.error('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom color="primary">
        🗳️ Ongoing Elections
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <CircularProgress color="primary" />
      ) : elections.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No ongoing elections at the moment.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {elections.map((election, idx) => (
            <Grid item xs={12} key={idx}>
              <Card sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {election.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {election.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ends on: {new Date(election.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {election.status}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Button
                    variant="contained"
                    color="primary"
                    href={`/election/${election.electionId}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="body2" color="text.secondary">
        Want to know more about how elections work in India? Visit the{' '}
        <Link
          href="https://eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          official Election Commission of India website
        </Link>
        .
      </Typography>
    </Container>
  );
};

export default OngoingElection;
