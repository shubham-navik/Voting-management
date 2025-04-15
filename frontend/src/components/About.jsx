import React from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  Link,
  Paper,
} from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4,borderRadius: 0 }}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ color: '#1e88e5', fontWeight: 'bold' }}>
            About the Election Commission of India
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
            The <strong>Election Commission of India (ECI)</strong> is an autonomous constitutional authority
            responsible for administering election processes in India. It ensures free, fair, and transparent
            elections to the Parliament, State Legislatures, and the offices of the President and Vice President.
            Established on <strong>January 25, 1950</strong>, ECI plays a vital role in upholding India's democracy.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 'medium' }}>
            Constitutional Mandate
          </Typography>
          <Typography variant="body1" paragraph>
            Under <strong>Article 324</strong> of the Constitution, ECI has the power to supervise and control the
            entire election process. It guarantees independent functioning, free from executive interference.
          </Typography>

          <Typography variant="h5" sx={{ color: '#d81b60', fontWeight: 'medium' }}>
            Structure & Composition
          </Typography>
          <Typography variant="body1" paragraph>
            The ECI consists of:
            <ul>
              <li><strong>Chief Election Commissioner (CEC)</strong></li>
              <li>Two <strong>Election Commissioners</strong></li>
            </ul>
            All decisions are taken by majority vote ensuring balance and accountability.
          </Typography>

          <Typography variant="h5" sx={{ color: '#f57c00', fontWeight: 'medium' }}>
            Vision & Mission
          </Typography>
          <Typography variant="body1" paragraph>
            The ECI strives to:
            <ul>
              <li>Promote <strong>free and fair</strong> elections</li>
              <li>Encourage <strong>voter awareness</strong></li>
              <li>Use technology for transparency</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#6a1b9a', fontWeight: 'medium' }}>
            Key Innovations
          </Typography>
          <Typography variant="body1" paragraph>
            ECI continuously modernizes the electoral process:
            <ul>
              <li><strong>Electronic Voting Machines (EVMs)</strong></li>
              <li><strong>VVPAT</strong> (Voter Verified Paper Audit Trail)</li>
              <li><strong>SVEEP</strong> (Systematic Voters’ Education & Electoral Participation)</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: '#00838f', fontWeight: 'medium' }}>
            Headquarters
          </Typography>
          <Typography variant="body1" paragraph>
            Located at <strong>Nirvachan Sadan</strong>, Ashoka Road, New Delhi - the epicenter of India’s electoral activities.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom sx={{ color: '#1a237e' }}>
            Useful Links
          </Typography>
          <Typography variant="body1">
            ➤ <Link href="https://eci.gov.in" target="_blank" rel="noopener" underline="hover" color="primary">
              Official ECI Website
            </Link><br />
            ➤ <Link href="https://www.nvsp.in/" target="_blank" rel="noopener" underline="hover" color="primary">
              National Voter Services Portal (NVSP)
            </Link><br />
            ➤ <Link href="https://voterportal.eci.gov.in/" target="_blank" rel="noopener" underline="hover" color="primary">
              Voter Portal (Registration/Corrections)
            </Link><br />
            ➤ <Link href="https://eci.gov.in/contact-us/" target="_blank" rel="noopener" underline="hover" color="primary">
              Contact ECI
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
