import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Elections = () => {
  const [elections, setElections] = useState({});
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    axios
      .get('https://voting-management.onrender.com/api/public/pastElections')
      .then((res) => {
        setElections(res.data);
      })
      .catch((err) => {
        console.error("Error fetching elections:", err.message);
      });
  }, []);

  const toggleCollapse = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Elections</h1>
      <p className="text-gray-700 mb-6">{elections.msg}</p>

      {elections.elections && elections.elections.length > 0 ? (
        <div className="space-y-6">
          {elections.elections.map((election, index) => {
            const candidates = election.electionData || [];

            // Determine winner (if any)
            let winnerName = '';
            if (candidates.length > 0) {
              const winner = candidates.reduce((max, c) => c.votes > max.votes ? c : max, candidates[0]);
              winnerName = winner.candidateName;
            }

            const xAxis = [{ scaleType: 'band', data: candidates.map(c => c.candidateName) }];
            const series = [{ data: candidates.map(c => c.votes), label: 'Votes', color: '#1976d2' }];

            return (
              <div key={index} className="border shadow-sm p-4 bg-white">
                {/* --- Top Section --- */}
                <div className="flex justify-center items-start">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{election.electionId}</h2>
                    <p className="text-gray-600">
                      <span className='text-black text-lg'>Title:</span><br />
                      {election.title}
                    </p>
                    <p className="text-gray-600">
                      <span className='text-black text-lg'>Description:</span><br />
                      {election.description}
                    </p>
                    <p className="text-gray-600">
                      <span className='text-black text-lg'>Start Date: </span>
                      {new Date(election.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      <span className='text-black text-lg'>End Date: </span>
                      {new Date(election.endDate).toLocaleDateString()}
                    </p>
                    <p className={`mt-1 text-sm font-medium ${election.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                      Status: {election.status}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCollapse(index)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {expandedIndex === index ? 'Hide Result' : 'Show Result'}
                  </button>
                </div>

                {/* --- Collapsible Result Section --- */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight: expandedIndex === index ? '600px' : '0px',
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                >
                  <div className="mt-4">
                    {candidates.length === 0 ? (
                      <p className="text-gray-500">No participant in this election.</p>
                    ) : (
                      <>
                        <h3 className="font-semibold text-green-700 mb-2">Winner: {winnerName}</h3>
                        <BarChart
                          xAxis={xAxis}
                          series={series}
                          width={500}
                          height={300}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No elections available.</p>
      )}
    </div>
  );
};

export default Elections;
