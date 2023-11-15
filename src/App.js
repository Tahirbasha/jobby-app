import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'
import Jobs from './components/Jobs'
import './App.css'

const App = () => (
  <Routes>
    <Route exact path="/login" element={<LoginForm/>} />
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/jobs" element={<Jobs/>} />
    <Route exact path="/jobs/:id" element={<JobItemDetails/>} />
    <Route element={<NotFound/>} />
  </Routes>
)

export default App;
