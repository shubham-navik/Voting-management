import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MiddleContent from './MiddleContent'
// import LeftComponents from '/LeftComponents'
import Candidates from '../Candidates'
import Results from '../Results'
import About from '../About'
import Candidate from '../Candidate'
import Elections from '../Elections'
import Profile from '../Profile'

const VariableComponent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MiddleContent />} />
        <Route path='/candidates' element={<Candidates />} />
        <Route path='/election' element={<Elections />} />
        <Route path='/candidate' element={<Candidate/>} />
        <Route path='/results' element={<Results />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        {/* <Route path='/path' element={<LeftComponents />} /> */}
      </Routes>
    </div>
  );
};

export default VariableComponent;
