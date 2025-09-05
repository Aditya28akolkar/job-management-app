import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Recruiterlogin = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('login') // login | signup
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')  
  const [image, setImage] = useState(false)  
  const [isTextData, setIsTextData] = useState(false)  

  const { setshowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

  // ✅ Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (state === "signup" && !isTextData) {
     return setIsTextData(true)
      
    }

    try {
      if (state === "login") {
        const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })
        if (data.success) {
         
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token)
          localStorage.setItem('recruiterLoggedIn', 'true')

          toast.success("Login successful!")
          setshowRecruiterLogin(false) 
          navigate('/dashboard')
        } else {
          toast.error(data.message || "Invalid credentials")
        }
      }

      if (state === "signup" && isTextData) {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("image", image)

        const { data } = await axios.post(backendUrl + '/api/company/register', formData)

        if (data.success) {
         
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token)
          localStorage.setItem('recruiterLoggedIn', 'true')

         
          setshowRecruiterLogin(false) 
          navigate('/dashboard')
        } else {
          toast.error(data.message )
        }
      }
     
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Try again!")
    }
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/40 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-gray-300 p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-black font-medium '>Recruiter {state}</h1>
        <p className='text-sm'>Please {state === 'login' ? 'signin' : 'signup'} to continue</p>
        
        {state === "signup" && isTextData ? (
          <div className='flex items-center gap-4 my-10'>
            <label htmlFor="image">
              <img 
                className='w-16 h-16 object-cover rounded-full' 
                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                alt="" 
              />
              <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden required />
            </label>
            <p>Upload Company <br />logo</p>
          </div>
        ) : (
          <>
            {state === 'signup' && (
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.person_icon} alt="" />
                <input 
                  className='outline-none text-sm' 
                  onChange={e => setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  placeholder='Company Name' 
                  required={state === 'signup' && !isTextData}
                />
              </div>
            )}

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.email_icon} alt="" />
              <input 
                className='outline-none text-sm' 
                onChange={e => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                placeholder='Email Id' 
                required={state === 'login' || (state === 'signup' && !isTextData)}
              />
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.lock_icon} alt="" />
              <input 
                className='outline-none text-sm' 
                onChange={e => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                placeholder='Password' 
                required={state === 'login' || (state === 'signup' && !isTextData)}
              />
            </div>
          </>
        )}

        {state === "login" && <p className='text-sm text-black mt-2 cursor-pointer'>Forget Password?</p>}    

        <button type='submit' className='mt-4 bg-red-400 w-full text-white py-2 rounded-full'>
          {state === 'login' ? 'Login' : isTextData ? 'Create Account' : 'Next'}
        </button>

        {state === 'login' ? (
          <p className='mt-5 text-center'>
            Don't have an account? <span className='text-black cursor-pointer' onClick={() => {setState("signup"); setIsTextData(false)}}>Sign up</span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account? <span className='text-black cursor-pointer' onClick={() => {setState("login"); setIsTextData(false)}}>Login</span>
          </p>
        )}
    
        <img onClick={() => setshowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
      </form>
    </div>
  )
}

export default Recruiterlogin
