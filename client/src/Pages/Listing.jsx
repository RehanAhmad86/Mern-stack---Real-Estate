import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper , SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
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
                        <div className='h-[550px]' style={{background: `url(${image}) center no-repeat` , backgroundSize: 'cover'}}></div>
                    </SwiperSlide>)}
                </Swiper>)
            }
        </main>
    )
}
