import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} =  useSelector(state => state.user)
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-5'>Profile</h1>
      <form className='flex flex-col gap-4' >
      <img src={currentUser.avatar} alt='userProfile' className='h-28 w-28 rounded-full object-cover cursor-pointer self-center'/>
        <input type='text' placeholder='username' id='username'
          className='border focus:outline-none p-2 rounded-lg' />
        <input type='email' placeholder='email' id='email'
          className='border p-2 rounded-lg focus:outline-none' />
        <input type='password' placeholder='password' id='password'
          className='border p-2 rounded-lg focus:outline-none' />
        <button className='bg-slate-700 text-white
         p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )

}
