import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const { setshowRecruiterLogin } = useContext(AppContext)

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">

        {/* Logo */}
        <img
          className="cursor-pointer h-10"
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="logo"
        />

        {/* Right Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/applications" className="text-sm font-medium">
              Applied Jobs
            </Link>
            <span className="text-gray-400">|</span>
            <p className="max-sm:hidden text-sm font-medium">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setshowRecruiterLogin(true)}
              className="text-black"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="rounded-full bg-red-500 text-white px-6 sm:px-9 py-2"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
