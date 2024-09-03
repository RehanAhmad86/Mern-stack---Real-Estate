import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const [ searchItem , setSearchItem ] = useState('')
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    const url = new URLSearchParams(window.location.search)
    url.set('searchItem' , searchItem)
    const search = url.toString()
    navigate(`/search?${search}`)
  }

  useEffect(()=>{
    const url = new URLSearchParams(location.search)
    const searchTerm = url.get('searchItem')
    if(searchTerm){
      setSearchItem(searchTerm) 
    }
  } , [location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
       <div  className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className='font-bold text-sm sm:text-lg flex flex-wrap'>
            <span className='text-slate-500'>Rehan</span>
            <span className='text-slate-700'>Ahmad</span>
        </h1>
        </Link>
        <form onSubmit={handleSearch} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...'
            value={searchItem} onChange={event => setSearchItem(event.target.value)}
            className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <button>
            <FaSearch className='text-slate-600'/>
            </button>
        </form>
        <ul className='flex sm:gap-4'>
            <Link to="/"><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
            <Link to="/about"><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
            <Link to="/profile">
            {currentUser? (
              <img className='w-7 h-7 rounded-full object-cover' src={currentUser.avatar} alt='picture'  />
            ):(
            <li className=' text-slate-700 hover:underline'>Sign in</li>
            )}
            </Link>
        </ul>
        </div>
    </header>
  )
}
