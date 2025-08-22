import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Application from './pages/Application'
import Recruiterlogin from './components/Recruiterlogin'
import { AppContext } from './context/AppContext'
import ManageJobs from './pages/ManageJobs'
import View from './pages/View'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import 'quill/dist/quill.snow.css' 
const App = () => {
  const {showRecruiterLogin}= useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <Recruiterlogin/>}
<Routes>

  <Route path='/' element={<Home/>} />
  <Route path='/apply-job/:id' element={<Applyjob/>} />
  <Route path='/application' element={<Application/>} />
  <Route path='/dashboard' element={<Dashboard/>}>
  <Route path='add-job' element={<Addjob/>}/>
  <Route path='view-applications' element={<View/>}/>
  <Route path="/dashboard/manage-job" element={<ManageJobs />} />
  </Route>
  
</Routes>


    </div>
  )
}

export default App