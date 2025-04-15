import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MiddleContent from './MiddleContent';
// import LeftComponents from '/LeftComponents'
import Candidates from '../Candidates';
import Results from '../Results';
import About from '../About';
import Candidate from '../Candidate';
import Elections from '../Elections';
import Profile from '../Profile';
import Ragister from '../Ragister';
import Login from '../Login';
import UpcomingElection from '../UpcomingElection';
import OngoingElection from '../OngoingElection';
import CastVote from '../CastVote';

const VariableComponent = () => {
  // const token = localStorage.getItem('token');

  return (
    <div>
      
        <Routes>
          <Route path='/' element={<MiddleContent />} />
          <Route path='/candidates' element={<Candidates />} />
          <Route path='/results' element={<Elections />} />
          <Route path='/candidate' element={<Candidate />} />
          <Route path='/results' element={<Results />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/upcoming-elections' element={<UpcomingElection />}/>
          <Route path='/ongoing-elections' element={<OngoingElection />}/>
          <Route path='/cast-vote' element={<CastVote />}/>
          <Route path='/register' element={<Ragister />} />
          <Route path='/login' element={<Login />} />  
            {/* <Route path='/path' element={<LeftComponents />} /> */}
        </Routes>
      

      
    </div>
  );
};

export default VariableComponent;
