import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contact from './Contact'

export default function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {currentUser } = useSelector(state => state.user)
    const [ contact , setcontact ] = useState(false) 
    const params = useParams()
    SwiperCore.use([Navigation])


    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const result = await fetch(`/api/listing/get/${params.id}`)
                const data = await result.json()
                if (data.success === false) {
                    setError(true)
                    setLoading(false)
                }
                setListing(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        getData()
    }, [params.id])


    return (
        <main>
            {loading && <p className='my-7 text-2xl text-center'>Loading...</p>}
            {error && <p className='my-7 text-2xl text-center'>Error! Try again</p>}
            {listing && !error && !loading &&
                (<Swiper navigation>
                    {listing.imageUrls.map(image =>
                        <SwiperSlide key={image}>
                            <div className='h-[550px] object-contain' style={{ background: `url(${image}) center no-repeat`, backgroundSize: 'cover' }}></div>
                        </SwiperSlide>)}
                </Swiper>)
            }
            <div>
                {listing ? (
                    <div className="px-20 py-7">
                        <div className="flex gap-4 sm:gap-6 font-semibold text-2xl">
                            <p>{listing.name}</p>
                            <p>
                                $ {!listing.offer ?  listing.regularPrice : +listing.regularPrice - +listing.discountedPrice }/month
                            </p>
                        </div>


                        {listing.address && (
                            <div className="flex items-center text-green-900 text-sm my-5">
                                <FaMapMarkerAlt className="mr-1" />
                                <p>{listing.address}</p>
                            </div>
                        )}


                        <div className="flex gap-4 sm:gap-6">
                            <p className="text-white flex justify-center items-center bg-red-700 py-2 px-5 rounded-lg w-36 text-center">
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>
                            {listing.offer && (
                                <p className="text-white flex justify-center items-center bg-green-700 py-2 px-5 rounded-lg w-36 text-center">
                                    ${listing.discountedPrice} Off
                                </p>
                            )}
                        </div>

                        {listing.description && (
                            <p className="mt-5">
                                <span className="text-black font-semibold">Description - </span>
                                <span className="text-slate-800"> {listing.description}</span>
                            </p>
                        )}

                        <ul className='text-green-900 flex gap-4 sm:gap-6 py-5 font-semibold text-sm flex-wrap'>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaBed className='text-lg' />
                                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds`
                                    : `${listing.bedrooms} Bed`}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaBath className='text-lg' />
                                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths`
                                    : `${listing.bathrooms} Bath`}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaParking className='text-lg' />
                                {listing.parking ? 'Parking spot'
                                    : 'No parking'}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap'>
                                <FaChair className='text-lg' />
                                {listing.furnished ? 'Furnished'
                                    : 'Not furnished'}
                            </li>
                        </ul>
                        {
                            currentUser && listing.userRef !== currentUser._id && !contact && (     
                                <button
                                onClick={()=> setcontact(true)}
                                className='bg-slate-700 p-3 text-white text-center w-full rounded-lg
                                hover:opacity-95 uppercase'>Contact Landlord</button>
                            )
                        }
                        {
                            contact && <Contact listing ={listing}/>
                        }
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>


        </main>
    )
}
