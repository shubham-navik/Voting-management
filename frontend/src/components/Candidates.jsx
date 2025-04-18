import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/public/getAllCandidates")
      .then((res) => {
        setCandidates(res.data.allCandidates);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCandidateClick = (id) => {
    navigate("/candidate-profile/" + id);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" mt={4} mb={3} color="primary">
        All Candidates
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Candidate ID</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Name</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Party Name</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Party ID</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Email</strong></TableCell>
              <TableCell sx={{ backgroundColor: "#1565c0", color: "white" }}><strong>Participated Elections</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate, index) => (
              <TableRow
                key={candidate._id}
                hover
                sx={{
                  "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                  "&:nth-of-type(odd)": { backgroundColor: "#ffffff" },
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell
                  onClick={() => handleCandidateClick(candidate._id)}
                  sx={{
                    cursor: "pointer",
                    color: "#1976d2",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {candidate._id}
                </TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell sx={{ color: "#8e24aa" }}>{candidate.party?.name || "N/A"}</TableCell>
                <TableCell>{candidate.party?.id || "N/A"}</TableCell>
                <TableCell>{candidate.email || "N/A"}</TableCell>
                <TableCell>{candidate.participatedElections|| 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Candidate;
