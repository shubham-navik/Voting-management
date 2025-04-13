import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';

const Profile = () => {
    const [voter, setVoter] = useState({});
    
    useEffect(() => {
        axios.get('http://localhost:4000/api/voter/profile')
            .then((res) => {
            setVoter(res.data.voter)
        })
    },[])
  return (
      <div>
          <h1> Voter Name : {voter.name}</h1>
          <p> Voter Email : {voter.email}</p>
    </div>
  )
}

export default Profile