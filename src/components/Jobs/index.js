import { useState } from 'react'
import Header from '../Header'
import JobProfileSection from '../JobProfileSection'
import './index.css'

const Jobs = () =>  {
const [jobsState, setJobsState] =   useState({isSideNavOpen: false});
const handleSideNavToggle = (val) => {
    setJobsState({isSideNavOpen: val});
}
  return(
    <>
      <Header toggleSideNav={handleSideNavToggle}/>
      <div className="job-profile-container">
        <JobProfileSection isSideNavOpen={jobsState.isSideNavOpen}/>
      </div>
    </>
  );
}

export default Jobs
