import { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { BsSearch } from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import JobsFilters from '../JobsFilters'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
    sideNavOpen: false
  }

  componentDidMount() {
    this.getJobDetails()
  }
  componentWillReceiveProps() {
    if (this.props.isSideNavOpen) {
      this.setState({ sideNavOpen: true });
    } else {
      this.setState({ sideNavOpen: false });
    }
  }
  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const { salaryRange, employmentType, searchInput } = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({ searchInput: event.target.value })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalaryRange = salary => {
    this.setState({ salaryRange: salary }, this.getJobDetails)
  }

  changeEmploymentType = (type, value) => {
    if(value) {
      this.setState(
        prev => ({ employmentType: [...prev.employmentType, type] }),
        this.getJobDetails,
      )
    } else {
      const employmentTypes = this.state.employmentType.filter(each => each !== type);
      this.setState(({ employmentType: employmentTypes }), this.getJobDetails);
    }
  }

  renderJobDetails = () => {
    const { jobsList, searchInput } = this.state
    const jobsDisplay = jobsList.length > 0

    return (
      <div className="details-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            testid="searchButton"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {jobsDisplay ? <ul className="job-details-item-container">
          {jobsList.map(eachData => (
            <JobCard key={eachData.id} jobDetails={eachData} />
          ))}
        </ul> :
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-desc">
              We could not find any jobs. Try other filters.
            </p>
          </div>}
      </div>
    );
  }

  renderFailureView = () => (
    <div className="failure-container text-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        testid="button"
        className="jobs-failure-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperClass="loader"
        visible={true}
      />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const { searchInput } = this.state
    return (
      <div className="job-details-container">
        <div className={`render-group-items ${this.state.sideNavOpen ? 'render-sm-group-items' : ''}`}>
          <button
            className="cross-button"
            onClick={() => this.setState({ sideNavOpen: false })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="white" stroke-linecap="round"
                stroke-width="1.5" d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" /></svg>
          </button>
          <JobsFilters
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            getJobDetails={this.getJobDetails}
          />
        </div>
        <div className="responsive-items">
          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
