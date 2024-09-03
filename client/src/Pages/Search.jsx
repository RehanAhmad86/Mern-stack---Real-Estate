import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row '>
    <div className='p-7 md:border-r-2 border-b-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
            <div className='flex gap-2 items-center'>
                <label className='whitespace-nowrap font-semibold'>Searh Item:</label>
                <input
                id='searchItem' type='text'
                placeholder='Search...'
                className='p-2 rounded-lg w-full'
                />
            </div>
            <div className='flex flex-row flex-wrap items-center gap-2'>
                <label className='font-semibold'>Type:</label>
                <div className='flex flex-row  gap-2'>
                    <input type='checkbox' id='all' className='w-4'/>
                    <span>rent & sale</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input type='checkbox' id='rent' className='w-4'/>
                    <span>rent</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input type='checkbox' id='sale' className='w-4'/>
                    <span>sale</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input type='checkbox' id='offer' className='w-4'/>
                    <span>offer</span>
                </div>
            </div>
            <div className='flex flex-row flex-wrap items-center gap-2'>
                <label className='font-semibold'>Luxuries:</label>
                <div className='flex flex-row gap-2'>
                    <input type='checkbox' id='parking' className='w-4'/>
                    <span>parking</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input type='checkbox' id='furnished' className='w-4'/>
                    <span>furnished</span>
                </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <select id='sort_order' 
                className='outline-none focus:outline-none p-2 rounded-lg'
                >
                    <option>price high to low</option>
                    <option>price low to high</option>
                    <option>latest</option>
                    <option>oldest</option>
                </select>
            </div>
            <button 
            className='bg-slate-700 p-2 uppercase text-white rounded-lg hover:opacity-95'
            >search</button>
        </form>

    </div>
    <div className=''>
        <h1
        className='text-2xl font-semibold p-2 border-b mt-5'
        >Listings</h1>
    </div>
    </div>
  )
}
