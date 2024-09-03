import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate()
    const [ listings , setListings] = useState()
    const [ loading , setLoading ] = useState(false)
    const [listingData, setListingData] = useState({
        searchItem: '',
        type: 'all',
        offer: false,
        parking: false,
        furnished: false,
        sort: 'created-at',
        order: 'desc'
    })
    console.log(listings)
    const handleListing = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setListingData(
                {
                    ...listingData,
                    type: e.target.id
                }
            )
        }
        if (e.target.id === 'searchItem') {
            setListingData({
                ...listingData,
                searchItem: e.target.value
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setListingData({
                ...listingData,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'
            setListingData({
                ...listingData, sort, order
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const url = new URLSearchParams()
        url.set('searchItem', listingData.searchItem)
        url.set('parking', listingData.parking)
        url.set('furnished', listingData.furnished)
        url.set('offer', listingData.offer)
        url.set('type', listingData.type)
        url.set('sort', listingData.sort)
        url.set('order', listingData.order)
        const urlData = url.toString()
        navigate(`/search?${urlData}`)
    }

    useEffect(() => {
        const url = new URLSearchParams(window.location.search)
        const data = url.get('searchItem')
        const data1 = url.get('parking')
        const data2 = url.get('furnished')
        const data3 = url.get('offer')
        const data4 = url.get('type')
        const data5 = url.get('sort')
        const data6 = url.get('order')

        if (
            data || data1 || data2 || data3 || data4 || data5 || data6
        ) {
            setListingData({
                searchItem: data || '',
                parking: data1 === 'true' ? true : false,
                offer: data3 === 'true' ? true : false,
                furnished: data2 === 'true' ? true : false,
                type: data4 === 'all',
                sort: data5 || 'created_at',
                order: data6 || 'desc'
            })
        }

        const getListings = async () => {
            setLoading(true)
            const urlParameter = url.toString()
            const result = await fetch(`/api/listing/get?${urlParameter}`)
            const data = await result.json()
            setListings(data)
            setLoading(false)
        }
        getListings()

    }, [location.search])
    return (
        <div className='flex flex-col md:flex-row '>
            <div className='p-7 md:border-r-2 border-b-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex gap-2 items-center'>
                        <label className='whitespace-nowrap font-semibold'>Searh Item:</label>
                        <input
                            id='searchItem' type='text'
                            placeholder='Search...'
                            className='p-2 rounded-lg w-full outline-none focus:outline-none'
                            value={listingData.searchItem}
                            onChange={handleListing}
                        />
                    </div>
                    <div className='flex flex-row flex-wrap items-center gap-2'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex flex-row  gap-2'>
                            <input type='checkbox' id='all' className='w-4'
                                checked={listingData.type === 'all'}
                                onChange={handleListing} />
                            <span>rent & sale</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <input type='checkbox' id='rent' className='w-4'
                                checked={listingData.type === 'rent'}
                                onChange={handleListing}
                            />
                            <span>rent</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <input type='checkbox' id='sale' className='w-4'
                                checked={listingData.type === 'sale'}
                                onChange={handleListing}
                            />
                            <span>sale</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <input type='checkbox' id='offer' className='w-4'
                                onChange={handleListing}
                                checked={listingData.offer}
                            />
                            <span>offer</span>
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap items-center gap-2'>
                        <label className='font-semibold'>Luxuries:</label>
                        <div className='flex flex-row gap-2'>
                            <input type='checkbox' id='parking' className='w-4'
                                onChange={handleListing}
                                checked={listingData.parking}
                            />
                            <span>parking</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <input type='checkbox' id='furnished' className='w-4'
                                onChange={handleListing}
                                checked={listingData.furnished}
                            />
                            <span>furnished</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select id='sort_order'
                            className='outline-none focus:outline-none p-2 rounded-lg'
                            onChange={handleListing}
                            defaultValue={'created_at_desc'}
                        >
                            <option value='regularPrice_desc'>price high to low</option>
                            <option value='regularPrice_asc'>price low to high</option>
                            <option value='createdAt_desc'>latest</option>
                            <option value='createdAt_asc'>oldest</option>
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
