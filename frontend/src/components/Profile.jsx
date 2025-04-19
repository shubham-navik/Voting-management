import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [voter, setVoter] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
  useEffect(() => {
    axios.get('https://voting-management.onrender.com/api/voter/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      setVoter(res.data.voter);
    //   setLoading(false);
    })
    .catch((err) => {
    //   setError("Failed to load profile.");
    //   setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Voter Name: {voter.name}</h1>
      <p>Voter Email: {voter.email}</p>
    </div>
  );
};

export default Profile;
