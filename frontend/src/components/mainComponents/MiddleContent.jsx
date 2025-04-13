import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const MiddleContent = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/public/getElectionResult/67d9dfee13baebd11236bd69")
      .then((res) => {
        console.log(res.data.results);
        setResults(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // X-axis shows "Party (Candidate)" for each bar
  const xAxisLabels = results.map(
    (result) => `${result.partyName}`
  );

  const votes = results.map((result) => result.votes);

  return (
    <BarChart
      series={[
        {
          label: 'Votes',
          data: votes,
        },
      ]}
      height={300}
      width={600}
      xAxis={[{ data: xAxisLabels, scaleType: 'band', label: 'Party' }]}
      yAxis={[{ label: 'Votes' }]}
      slotProps={{
        bar: {
          barCategoryGap: 20,
          barGap: 5,
        },
      }}
    />
  );
};

export default MiddleContent;
