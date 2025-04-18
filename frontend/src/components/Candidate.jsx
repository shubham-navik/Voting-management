import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const Candidate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidateProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/public/getCandidateProfile/${id}`
        );
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching candidate profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateProfile();
  }, [id]);

  const handleClick = (electionId) => {
    navigate(`/election-details/${electionId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        No profile found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center" mt={4} color="primary">
        Candidate Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="subtitle1"><strong>Name:</strong> {profile.name}</Typography>
        <Typography variant="subtitle1"><strong>Email:</strong> {profile.email}</Typography>
        <Typography variant="subtitle1"><strong>Party:</strong> {profile.party}</Typography>
        <Typography variant="subtitle1"><strong>Total Participated Elections:</strong> {profile.totalParticipatedElections}</Typography>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Participated Elections
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Election ID</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Title</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Year</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Status</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Contestants</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Rank</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.participatedElections.map((election, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                  "&:nth-of-type(odd)": { backgroundColor: "#ffffff" },
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell
                  onClick={() => handleClick(election.electionId)}
                  sx={{
                    color: "#1976d2",
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {election.electionId}
                </TableCell>
                <TableCell>{election.electionTitle}</TableCell>
                <TableCell>{election.participatedYear}</TableCell>
                <TableCell>{election.status}</TableCell>
                <TableCell>{election.totalContestants}</TableCell>
                <TableCell>{election.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Candidate;
