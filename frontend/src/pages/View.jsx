import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const View = () => {
  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <table className="w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">User name</th>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Job title</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Resume</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {viewApplicationsPageData.map((applicant, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-center">{index + 1}</td>

              {/* User info */}
              <td className="py-2 px-4 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={applicant.imgSrc}
                  alt={applicant.name}
                />
                <span className="font-medium">{applicant.name}</span>
              </td>

              {/* Title */}
              <td className="py-2 px-4">{applicant.title}</td>

              {/* Job title */}
              <td className="py-2 px-4">{applicant.jobTitle}</td>

              {/* Location */}
              <td className="py-2 px-4">{applicant.location}</td>

              {/* Resume button */}
              <td className="py-2 px-4">
                <a
                  href={applicant.resumeLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-50 text-violet-500 px-3 py-1 rounded inline-flex gap-2 items-center hover:bg-blue-100"
                >
                  Resume{" "}
                  <img src={assets.resume_download_icon} alt="Download" />
                </a>
              </td>

              {/* Dropdown menu (fixed with group) */}
              {/* Dropdown menu */}
<td className="py-2 px-4">
  <div className="relative inline-block text-left group">
    <button className="text-gray-600 px-2 py-1 rounded hover:bg-gray-100">
      ...
    </button>
    <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-10">
      <button className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">
        Accept
      </button>
      <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
        Reject
      </button>
    </div>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
