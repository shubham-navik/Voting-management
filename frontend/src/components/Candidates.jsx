import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/public/getAllCandidates')
      .then((res) => {
        setCandidates(res.data.allCandidates);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const cellStyle = {
    border: '1px solid black',
    padding: '10px',
  };

  const evenRowStyle = { backgroundColor: '#f2f2f2' };
  const oddRowStyle = { backgroundColor: '#ffffff' };

  return (
    <div>
      <h2>Candidates</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Candidate ID</th>
            <th style={cellStyle}>Candidate Name</th>
            <th style={cellStyle}>Party Name</th>
            <th style={cellStyle}>Party ID</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Participated Elections</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr
              key={candidate._id}
              style={index % 2 === 0 ? evenRowStyle : oddRowStyle}
            >
              <td className='hover:cursor-pointer'  style={cellStyle}>{candidate._id}</td>
              <td style={cellStyle}>{candidate.name}</td>
              <td style={cellStyle}>{candidate.party?.name || 'N/A'}</td>
              <td style={cellStyle}>{candidate.party?.id || 'N/A'}</td>
              <td style={cellStyle}>{candidate.email || 'N/A'}</td>
              <td style={cellStyle}>{candidate.participatedElections}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidate;
