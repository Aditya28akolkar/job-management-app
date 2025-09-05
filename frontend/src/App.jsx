import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Applyjob from "./pages/ApplyJob";
import Application from "./pages/Application";
import Recruiterlogin from "./components/Recruiterlogin";
import { AppContext } from "./context/AppContext";
import ManageJobs from "./pages/ManageJobs";
import View from "./pages/View";
import Dashboard from "./pages/Dashboard";
import Addjob from "./pages/Addjob";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <Recruiterlogin />}
      <ToastContainer />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<Applyjob />} />
        <Route path="/applications" element={<Application />} />

        {/* Protected Dashboard routes */}
        {companyToken && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<Addjob />} />
            <Route path="manage-job" element={<ManageJobs />} />
            <Route path="view-applications" element={<View />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
