import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../Firebase.js'
import { Link } from 'react-router-dom'
import {
  updateUserSuccess, updateUserFailure, updateUserStart,
  deleteUserstart, deleteUserSuccess, deleteUserFailure,
  SignOutUserstart , SignOutUserSuccess , SignOutUserFailure
} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'

//import { updateUser } from '../../../api/controllers/user.controller.js'

export default function Profile() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updatesuccessful, setUpdateSuccessful] = useState(false)
  const dispatch = useDispatch()
  console.log(formData)

  useEffect(() => {
    if (file) {
      handleFile(file)
    }
  }, [file])

  const handleFile = async (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
        setFilePercentage(Math.round(progress))
      },
      (error) => {
        setFileError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          )
      }
    )
  }

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      console.log(currentUser)
      const data = await result.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccessful(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteUserstart())
      const result = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await result.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    }
    catch (error) { dispatch(deleteUserFailure(error.message)) }
  }

  const handleSignOut = async () => {
      try{
        dispatch(SignOutUserstart())
      const result = await fetch(`/api/auth/signout`)
      const data = await result.json()
      if(data.success === false){
        dispatch(SignOutUserFailure(data.message))
      }
      dispatch(SignOutUserSuccess(data))
      }
      catch(error){
        dispatch(SignOutUserFailure(error.message))
      }
  }

  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-5'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
        <input type='file' ref={fileRef} hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='userProfile' className='h-28 w-28 rounded-full object-cover cursor-pointer self-center' />
        <p className='text-sm self-center'>
          {fileError ? (
            <span className='text-red-700'>Error uploading image!</span>
          ) :
            filePercentage > 0 && filePercentage < 100 ? (
              <span className='text-slate-700'>{`Uploading file ${filePercentage}%`}</span>
            ) :
              filePercentage === 100 ? (
                <span className='text-green-700'>Successfully Uploaded!</span>
              )
                : ""
          }
        </p>
        <input onChange={handleChange} defaultValue={currentUser.username} type='text' placeholder='username' id='username'
          className='border focus:outline-none p-2 rounded-lg' />
        <input onChange={handleChange} defaultValue={currentUser.email} type='email' placeholder='email' id='email'
          className='border p-2 rounded-lg focus:outline-none' />
        <input onChange={handleChange} type='password' placeholder='password' id='password'
          className='border p-2 rounded-lg focus:outline-none' />
        <button disabled={loading} className='bg-slate-700 text-white
         p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'loading...' : 'Update'}
        </button>
        <Link to="/create-listing" className='bg-green-700 text-white text-center
         p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >Create Listings
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5 text-center'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5 text-center'>{updatesuccessful ? 'User is updated successfully!' : ''}</p>
    </div>
  )
}
