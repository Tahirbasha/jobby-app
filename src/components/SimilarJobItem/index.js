import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails

  return (
    <li className="similar-list-docs">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-url"
        />
        <div>
          <h1 className="company-logo-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <span className="count-rating">{rating}</span>
          </div>
        </div>
      </div>
      <h1 className="similar-desc-heading">Description</h1>
      <span className="similar-desc">{jobDescription}</span>
      <div className="location-container-flex-justify">
        <div className="responsive">
          <GoLocation className="location-logo" />
          <span className="location-desc">{location}</span>
        </div>
        <div className="responsive">
          <BsBriefcaseFill className="location-logo-brief" />
          <span className="location-desc">{employmentType}</span>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
