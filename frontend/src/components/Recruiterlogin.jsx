import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Recruiterlogin = () => {
  const [state, setState] = useState('login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')  
  const [image, setImage] = useState(false)  
  const [isTextData, setIsTextData] = useState(false)  
const {setshowRecruiterLogin}=useContext(AppContext)
  // ✅ On component mount, check if user is already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('recruiterLoggedIn')
    if (loggedIn) {
      setState('home') // redirect state or mark logged in
    }
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (state === "Sign up" && !isTextData) {
      setIsTextData(true)
      return
    }

    // ✅ Dummy login/signup logic
    if (email && password) {
      localStorage.setItem('recruiterLoggedIn', 'true') // Save login
      alert(`${state === 'login' ? 'Logged in' : 'Account created'} successfully!`)
      setState('home') // Switch state after login
    }
  }

  // ✅ If logged in → Show home/dashboard
  if (state === 'home') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Welcome Recruiter 👋</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('recruiterLoggedIn')
            setState('login')
          }} 
          className="mt-4 bg-red-400 text-white px-4 py-2 rounded-full"
        >
          Logout
        </button>
      </div>
    )
  }
  useEffect(()=>{
document.body.style.overflow='hidden'
return()=>{
  document.body.style.overflow='unset'
}
  },[])

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/40 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-gray-300 p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-black font-medium '>Recruiter {state}</h1>
        <p className='text-sm'>Please {state === 'login' ? 'signin' : 'signup'} to continue</p>
        
        {
          state === "Sign up" && isTextData ? (
            <div className='flex items-center gap-4 my-10'>
              <label htmlFor="image">
                <img 
                  className='w-16 h-16 object-cover rounded-full' 
                  src={image ? URL.createObjectURL(image) : assets.upload_area} 
                  alt="" 
                />
                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
              </label>
              <p>Upload Company <br />logo</p>
            </div>
          ) : (
            <>
              {state !== 'login' && (
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                  <img src={assets.person_icon} alt="" />
                  <input 
                    className='outline-none text-sm' 
                    onChange={e => setName(e.target.value)} 
                    value={name} 
                    type="text" 
                    placeholder='Company Name' 
                    required 
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
                  required 
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
                  required 
                />
              </div>
            </>
          )
        }

    {state==="login"&& <p className='text-sm text-black mt-2 cursor-pointer'>Forget Password?</p>}    

        <button type='submit' className='mt-4 bg-red-400 w-full text-white py-2 rounded-full'>
          {state === 'login' ? 'Login' : isTextData ? 'Create Account' : 'Next'}
        </button>

        {state === 'login' ? (
          <p className='mt-5 text-center'>
            Don't have an account? <span className='text-black cursor-pointer' onClick={() => {setState("Sign up"); setIsTextData(false)}}>Sign up</span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account? <span className='text-black cursor-pointer' onClick={() => {setState("login"); setIsTextData(false)}}>Login</span>
          </p>
        )}
     
     <img onClick={e=>setshowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
      </form>
    </div>
  )
}

export default Recruiterlogin
