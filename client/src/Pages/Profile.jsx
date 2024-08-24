import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../Firebase.js'

export default function Profile() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const { currentUser } = useSelector(state => state.user)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [formData, setFormData] = useState({})

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
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-5'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <input type='file' ref={fileRef} hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='userProfile' className='h-28 w-28 rounded-full object-cover cursor-pointer self-center' />
        <p className='text-sm self-center'>
          {fileError ? (
            <span   className='text-red-700'>Error uploading image!</span>
          ) :
            filePercentage > 0 && filePercentage < 100 ? (
              <span className='text-slate-700'>{`Uploading file ${filePercentage}%`}</span>
            ):
          filePercentage === 100 ? (
          <span className='text-green-700'>Successfully Uploaded!</span>
          )
          : ""
          }
        </p>
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
