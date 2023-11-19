import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiLocationMarker, HiMail } from 'react-icons/hi'
import { BsCash } from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const { jobDetails } = props
  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-items">
        <div className="company-container">
          <div>
            <img src={companyLogoUrl} alt="company logo" className="logo-url" />
          </div>
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="star-icon-container">
              <AiFillStar className="star-icon" />
              <span className="rating-count">{rating}</span>
            </div>
          </div>
        </div>
        <div className="location-container-flex-content">
          <div className="location-desc">
            <div className="star-icon-container">
              <HiLocationMarker className="location-icon" />
              <span className="location-desc description">{location}</span>
            </div>
            <div className="star-icon-container">
              <HiMail className="location-icon left-icon" />
              <span className="emp-type description">{employmentType}</span>
            </div>
            <div className="star-icon-container">
              <BsCash className="location-logo-brief" />
              <span className="package-desc description">{packagePerAnnum}</span>
            </div>
          </div>
        </div>
        <hr className="line" />
        <h1 className="desc-heading">Description</h1>
        <span className="job-description">{jobDescription}</span>
      </li>
    </Link>
  )
}

export default JobCard
