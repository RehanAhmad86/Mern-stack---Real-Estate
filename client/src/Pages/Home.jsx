import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import SwiperCore from 'swiper'
import ListingItems from '../Components/ListingItems.jsx';


export default function Home() {
  const [offerListing, setOfferListing] = useState([])
  const [saleListing, setSaleListing] = useState([])
  const [rentListing, setRentListing] = useState([])
  SwiperCore.use([Navigation])

  useEffect(() => {
    const getOfferListing = async () => {
      try {
        const result = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await result.json()
        setOfferListing(data)
      }
      catch (error) {
        console.log(error)
      }
    }

    const getSaleListing = async () => {
      try {
        const result = await fetch(`/api/listing/get?type=sale&limit=4`)
        const data1 = await result.json()
        setSaleListing(data1)
      } catch (error) {
        console.log(error)
      }
    }

    const getRentListing = async () => {
      try {
        const result = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data2 = await result.json()
        setRentListing(data2)
      }
      catch (error) {
        console.log(error)
      }
    }

    getOfferListing()
    getSaleListing()
    getRentListing()
  }, [])
  return (
    <div>

      <div className='flex flex-col gap-5 px-3 p-20 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Your Ideal
          <span className='text-slate-500'> Home</span> <br /> with our Real Estate</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Our Real Estate is the best platform to find an ideal property for you <br />
          Connect with us to purchase the best properties
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm font-semibold hover:underline text-blue-900'>
          Let's start with us...
        </Link>
      </div>



      <div>
        <Swiper
          navigation
          slidesPerView={1}
        >
          {
            rentListing && rentListing.length > 0 && rentListing.map((listing, index) => (
              <SwiperSlide key={index}>
                <div style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover'
                }} className='w-full h-[550px]'>
                </div>
              </SwiperSlide>

            ))
          }
        </Swiper>
      </div>


          <div className='flex justify-center mt-5 md:mt-10'>
      <div className='flex flex-col gap-3 p-3'>
        <h1 className='text-3xl text-slate-600 font-semibold p-2'>Offer Listings</h1>
        <div className='max-w-6xl flex flex-row flex-wrap justify-evenly p-2 gap-y-8 gap-x-8'>

          {
            offerListing && offerListing.length > 0 && offerListing.map((listings, index) => (
              <div className='' key={index} >
                <ListingItems listing={listings} />
              </div>
            ))
          }
        </div>

        <Link to={'/search?offer=true'}
          className='sm:ml-1 flex justify-end p-1'
        ><p className='font-semibold text-sm text-slate-600 hover:underline '>Show more</p>
        </Link>
      </div>
      </div>

          <div className='flex justify-center'>
      <div className='flex flex-col gap-3 p-3'>
        <h1 className='text-3xl text-slate-600 font-semibold p-2'>Sale Listings</h1>
        <div className='max-w-6xl flex flex-row flex-wrap justify-evenly p-2 gap-y-8 gap-x-8'>

          {
            saleListing && saleListing.length > 0 && saleListing.map((listings, index) => (
              <div className='' key={index} >
                <ListingItems listing={listings} />
              </div>
            ))
          }
        </div>

        <Link to={'/search?type=sale'}
          className='sm:ml-1 flex justify-end p-1'
        ><p className='font-semibold text-sm text-slate-600 hover:underline '>Show more</p>
        </Link>
      </div>
      </div>


          <div className='flex justify-center'>
      <div className='flex flex-col gap-3 p-3'>
        <h1 className='text-3xl text-slate-600 items-start font-semibold p-2'>Rent Listings</h1>
        <div className='max-w-6xl flex flex-row w-full flex-wrap justify-evenly p-2 gap-y-8 gap-x-8'>

          {
            rentListing && rentListing.length > 0 && rentListing.map((listings, index) => (
              <div className='' key={index} >
                <ListingItems listing={listings} />
              </div>
            ))
          }
        </div>

        <Link to={'/search?type=rent'}
          className='sm:ml-1 flex justify-end p-1'
        ><p className='font-semibold text-sm text-slate-600 hover:underline'>Show more</p>
        </Link>
      </div>
      </div>



    </div>
  )
}
