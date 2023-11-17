import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'
import Jobs from './components/Jobs'
import './App.css'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/jobs" element={<Jobs/>} />
    <Route path="/jobs/:id" element={<JobItemDetails/>} />
    <Route element={<NotFound/>} />
  </Routes>
)

export default App;
