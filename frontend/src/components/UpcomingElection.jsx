import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingElection = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/public/upcomingElections')
      .then((res) => {
        setUpcomingElections(res.data.elections);
      })
      .catch((err) => {
        console.error('Failed to fetch upcoming elections:', err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Upcoming Elections</h1>

      <div className="gap-4 grid">
        {upcomingElections.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No upcoming elections found.</p>
        ) : (
          upcomingElections.map((election, index) => (
            <div
              key={index}
              className=" w-full border border-rose-200 shadow-md bg-white p-5 transition hover:shadow-lg hover:border-rose-400"
            >
              <h2 className="text-xl font-semibold text-rose-700 mb-2">{election.title}</h2>
              <p>{ election.electionId}</p>
              <p className="text-gray-700 mb-1">
                <strong>Description:</strong> {election.description}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Start Date (MM/DD/YYYY):</strong> {new Date(election.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>End Date:</strong> {new Date(election.endDate).toLocaleDateString()}
              </p>
              <p>Status : <span className='font-bold text-blue-500'>{election.status}</span></p>
              <br/>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-t border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-rose-100 text-gray-800">
                      <th className="text-left px-4 py-2">Candidate Name</th>
                      <th className="text-left px-4 py-2">Party</th>
                    </tr>
                  </thead>
                  <tbody>
                    {election.electionData.map((candidate, cIndex) => (
                      <tr key={cIndex} className="border-b border-gray-200">
                        <td className="px-4 py-2">{candidate.candidateName}</td>
                        <td className="px-4 py-2">{candidate.party}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingElection;
