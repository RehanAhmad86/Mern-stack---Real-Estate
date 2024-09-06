import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import OAuth from '../Components/OAuth.jsx'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  useEffect(()=>{
    handleSubmit()
  } ,[error])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await result.json()
      console.log(data)
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/signin')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    } finally{
      setLoading(false)
    }


  }
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='username' onChange={handleChange}
          className='border focus:outline-none p-2 rounded-lg' id='username' />
        <input type='email' placeholder='email' onChange={handleChange}
          className='border p-2 rounded-lg focus:outline-none' id='email' />
        <input type='password' placeholder='password' onChange={handleChange}
          className='border p-2 rounded-lg focus:outline-none' id='password' />
        <button disabled={loading} className='bg-slate-700 text-white
         p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/signin">
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  )
}
