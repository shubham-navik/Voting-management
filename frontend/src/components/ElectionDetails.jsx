import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

const ElectionDetails = () => {
  const { id } = useParams(); // get election ID from route
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const res = await axios.get(`https://voting-management.onrender.com/api/public/getElectionDetails/${id}`);
        setElection(res.data.election);
      } catch (err) {
        console.error("Failed to fetch election details:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!election) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Election not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" mt={4} gutterBottom color="primary">
        {election.title}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="subtitle1"><strong>Election ID:</strong> {election.electionId}</Typography>
        <Typography variant="subtitle1"><strong>Status:</strong> <span style={{ color: "#2e7d32" }}>{election.status}</span></Typography>
        <Typography variant="subtitle1"><strong>Start Date:</strong> {new Date(election.startDate).toLocaleString()}</Typography>
        <Typography variant="subtitle1"><strong>End Date:</strong> {new Date(election.endDate).toLocaleString()}</Typography>
        <Typography variant="subtitle1"><strong>Year:</strong> {election.participatedYear}</Typography>
        <Typography variant="subtitle1"><strong>Total Contestants:</strong> {election.totalContestants}</Typography>
      </Paper>

      <Typography variant="h6" gutterBottom color="secondary">
        Contestants
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}><strong>Rank</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}><strong>Candidate Name</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}><strong>Email</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}><strong>Party</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}><strong>Votes</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {election.contestants.map((c, index) => (
              <TableRow
                key={c.contestantId}
                hover
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#ffffff",
                  },
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <TableCell>{c.rank}</TableCell>
                <TableCell sx={{ color: "#1565c0" }}>{c.candidateName}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell sx={{ color: "#8e24aa" }}>{c.party}</TableCell>
                <TableCell sx={{ color: "#d84315" }}>{c.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ElectionDetails;
