import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const Application = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { backendUrl, userData, userApplications = [], fetchUserData, fetchUserApplications } = useContext(AppContext);

 useEffect(() => {
  let mounted = true;
  const fetchData = async () => {
    if (user) {
      await fetchUserApplications();
      if (mounted) {
        setIsLoading(false);
      }
    }
  };
  fetchData();
  return () => {
    mounted = false;
  };
}, [user, fetchUserApplications]);


  const updateResume = async () => {
    if (!resume) return toast.error("Please select a resume before saving");
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/users/update-resume`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success("✅ Resume updated successfully");
        await fetchUserData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 text-center">
          Loading applications...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || !userData?.resume ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <p className="bg-[#51BEEC] text-white px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  className="hidden"
                />
              </label>
              <button onClick={updateResume} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </>
          ) : (
            <>
              <p>{userData?.resume?.split("/").pop()}</p>
              <button onClick={() => setIsEdit(true)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Edit
              </button>
            </>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
        {userApplications?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((job, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{job.jobId?.companyId?.name}</td>
                    <td className="px-4 py-2 border">{job.jobId?.title}</td>
                    <td className="px-4 py-2 border">{job.jobId?.location}</td>
                    <td className="px-4 py-2 border">{moment(job.date).format("DD-MM-YYYY")}</td>
                    <td className="px-4 py-2 border">{job.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No jobs applied yet.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

// ✅ Make sure to export the component as default
export default Application;
