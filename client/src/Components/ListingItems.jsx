import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { FaBed , FaBath } from 'react-icons/fa'


export default function ListingItems({ listing }) {
    return (
        <>
        <div className='overflow-hidden shadow-md hover:shadow-lg w-full h-auto md:h-[460px] sm:w-[260px] rounded-lg'>
            <Link to={`/profile/listing/${listing._id}`}>
                <img src={listing.imageUrls} className=' h-[320px] sm:h-[220px] w-full object-cover
             hover:scale-105 transition-scale duration-300 '/>
                <div className='p-2'>
                    <p className='truncate flex justify-start text-slate-700 text-lg font-semibold'>{listing.name}</p>
                </div>
                <div className='flex items-center p-2'>
                    <MdLocationOn className='w-5 h-5 text-green-700' />
                    <p className='truncate text-sm text-gray-700'>{listing.address}</p>
                </div>
                <div className='p-2'>
                    <p className='line-clamp-3 text-start text-slate-700 text-sm'>{listing.description}</p>
                </div>
                <div className='p-2'>
                    <p className='text-start text-gray-500 text-md font-semibold'>
                        ${listing.offer ? listing.discountedPrice.toLocaleString('en-US')
                            : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' ? ' / month' : ''}
                    </p>
                </div>
                <div className='flex gap-5 p-2'>
                    <div className='flex items-center gap-2'>
                        <FaBed className='w-4 h-4 text-green-700'/>
                        {listing.bedrooms > 1 ?
                            <p className='text-sm'>{listing.bedrooms} beds</p>
                            : <p className='text-sm'>{listing.bedrooms} bed</p>
                        }
                    </div>
                    <div className='flex items-center gap-2'>
                    <FaBath className='w-4 h-4 text-green-700'/>
                        {listing.bathrooms > 1 ?
                            <p className='text-sm'>{listing.bathrooms} baths</p>
                            : <p className='text-sm'>{listing.bathrooms} bath</p>
                        }
                    </div>
                </div>
            </Link>
        </div>
        </>
    )
}
