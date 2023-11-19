import { Component } from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: 'admin',
    password: 'abcd',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false
  }
  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    window.location.replace("/home");
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = { username: 'rahul', password: 'rahul@2021' }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onEnterUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    const { showSubmitError, errorMsg, username, password } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      window.location.replace("/home");
    }

    return (
      <div className="jobby-app-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="userName">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                placeholder="Username"
                className="user-input"
                value={username}
                onChange={this.onEnterUsername}
              />
            </div>
            <div className="input-container my-2">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="user-input"
                id="password"
                type={`${this.state.showPassword ? 'text' : 'password'}`}
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="true"
                checked={this.state.showPassword}
                id="flexCheckDefault"
                onChange={(e) => this.setState({ showPassword: e.target.checked })}
              />
              <label class="form-check-label" htmlFor="flexCheckDefault">
                Show Password
              </label>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
