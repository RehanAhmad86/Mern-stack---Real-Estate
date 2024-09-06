import React, { useEffect, useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../Firebase.js'
import {useSelector} from 'react-redux'
import { useNavigate , useParams } from 'react-router-dom'



export default function UpdateListing() {
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const [ formData , setFormdata ] = useState({
        imageUrls:[],
        name: '',
        description: '',
        address: '',
        regularPrice: '50',
        discountedPrice: '0',
        furnished: false,
        parking: false,
        bedrooms: 1,
        bathrooms: 1,
        offer: false,
        type: ''

    })
    const {currentUser} = useSelector(state => state.user)
    const [imageUploadError , setImageUploadError] = useState(false)
    const [ uploading , setuploading ] = useState(false)
    const [ error , setError] = useState(false)
    const [ loading , setLoading ] = useState(false)
    console.log(formData)
    console.log(formData._id)
    const params = useParams()

    useEffect(()=>{
        const getData = async () => {
            const result = await fetch(`/api/listing/get/${params.id}`)
            const data = await result.json()
            if(data.success === false ){
                console.log(data.message)
            }
            setFormdata(data)
        }
        getData()
    },[])


    const handleImageSubmit = (e) => {
        if( files.length > 0 && files.length
            + formData.imageUrls.length < 7){
                setuploading(true)
                setImageUploadError(false)
            const promises = []
            for (let i=0 ; i<files.length ; i++){
                promises.push(storageImage(files[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormdata(
                    {...formData,
                    imageUrls: formData.imageUrls.concat(urls)}
                )
                setImageUploadError(false)
                setuploading(false)
            }).catch((error=>{
                setImageUploadError('Image Upload Failed! (2 mb per image)')
                setuploading(false)
            }))
        }else{
            setImageUploadError('You can upload only 6 images in listing')
            setuploading(false)
        }
    }
    const storageImage = async (file) => {
        return new Promise((resolve , reject ) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageref = ref(storage , fileName)
            const uploadTask = uploadBytesResumable(storageref , file)
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes * 100)
                    console.log(`upload is ${progress}% done.`)
                },
                (error)=>{
                    reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((urls)=>{
                        resolve(urls)
                    })
                }
            )

        })
    }

    
    const deleteImage = (index) => {
        setFormdata( 
            {...formData,
                imageUrls: formData.imageUrls.filter((_, i) => i !== index )}
            )
        }
        const handleFormData = (e) => {
                if(e.target.id === 'sale' || e.target.id === 'rent'){
                    setFormdata(
                        {...formData,
                        type: e.target.id}
                    )
                }
                if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
                    setFormdata({
                        ...formData,
                        [e.target.id]: e.target.checked
                    })
                }
                if( e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
                    setFormdata({
                        ...formData,
                        [e.target.id]: e.target.value
                    })
                }
        }
        const handleSubmit = async (e) => {
            e.preventDefault()
            if(formData.imageUrls.length < 1 ) return setError('Upload atleast 1 image')
            if(+formData.regularPrice < +formData.discountedPrice) return setError(
                'Discounted price must be less than regular price'
            )
            
            try{
                setLoading(true)
                setError(false)
                const result = await fetch(`/api/listing/update/${params.id}` , {
                    method: 'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(
                        {...formData,
                        userRef: currentUser._id})
                })
                const data = await result.json()
                console.log(data)
                setLoading(false)
                if(data.success === 'false'){
                    setError(data.message)
                }
                setLoading(false)
                navigate(`/profile/listing/${formData._id}`)
            }catch(error){
                setError(error.message)
                setLoading(false)
            }
        }
    return (
        <main className='p-5 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                {/* Left Column for Input Fields */}
                <div className='flex gap-6'>
                    <div className='flex flex-col gap-4 w-full'>
                        <input
                            type='text'
                            placeholder='Name'
                            className='border p-3 rounded-lg w-full'
                            id='name'
                            maxLength='62'
                            minLength='10'
                            required
                            onChange={handleFormData}
                            value={formData.name}
                        />
                        <textarea
                            placeholder='Description'
                            className='border p-3 rounded-lg w-full h-24'
                            id='description'
                            required
                            onChange={handleFormData}
                            value={formData.description}
                        />
                        <input
                            type='text'
                            placeholder='Address'
                            className='border p-3 rounded-lg w-full'
                            id='address'
                            required
                            onChange={handleFormData}
                            value={formData.address}
                        />

                        {/* Checkboxes Section */}
                        <div className='flex flex-wrap gap-4'>
                            <div className='flex items-center gap-2'>
                                <input id='sale' type='checkbox' className='w-5 h-5'
                                onChange={handleFormData} checked={formData.type === 'sale'} />
                                <label htmlFor='sell'>Sell</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='rent' type='checkbox' className='w-5 h-5' 
                                 onChange={handleFormData} checked={formData.type === 'rent'}/>
                                <label htmlFor='rent'>Rent</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='parking' type='checkbox' className='w-5 h-5' 
                                 onChange={handleFormData} checked={formData.parking}/>
                                <label htmlFor='parking'>Parking spot</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='furnished' type='checkbox' className='w-5 h-5' 
                                onChange={handleFormData} checked={formData.furnished}/>
                                <label htmlFor='furnished'>Furnished</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='offer' type='checkbox' className='w-5 h-5' 
                                onChange={handleFormData} checked={formData.offer}/>
                                <label htmlFor='offer'>Offer</label>
                            </div>
                        </div>

                        {/* Beds and Baths Section */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex items-center gap-2'>
                                <label htmlFor='bedrooms'>Beds</label>
                                <input type='number' id='bedrooms' min='1' max='10' required className='p-2 border rounded-lg w-full' 
                                onChange={handleFormData} value={formData.bedrooms}/>
                            </div>
                            <div className='flex items-center gap-2'>
                                <label htmlFor='bathrooms'>Baths</label>
                                <input type='number' id='bathrooms' min='1' max='10' required className='p-2 border rounded-lg w-full' 
                                 onChange={handleFormData} value={formData.bathrooms}/>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start justify-center gap-2 sm'>
                                <p>Regular price <span>($ / month)</span></p>
                                <input type='number' id='regularPrice' min='50' max='10000000' required className='p-2 border rounded-lg w-1/3' 
                                 onChange={handleFormData} value={formData.regularPrice}/>
                            </div>
                            {
                                formData.offer && ( <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start justify-center gap-2 sm'>
                                <p>Discount price <span>($ / month)</span></p>
                                <input type='number' id='discountedPrice' min='0' max='10000000' required className='p-2 border rounded-lg w-1/3' 
                                onChange={handleFormData} value={formData.discountedPrice}/>
                            </div>)
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Images: <span className='text-sm text-gray-600'>The first image will be the cover (max 6)</span></label>
                            <div className='flex items-center gap-2'>
                                <input onChange={(event => setFiles(Array.from(event.target.files)))} type='file' id='images' multiple accept='image/*' className='w-full' />
                                <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-2 text-green-700 border border-green-700 rounded hover:shadow-lg uppercase'>
                                    { uploading ? 'Uploading...' : 'Upload'}
                                    </button>
                            </div>
                            {
                            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError }</p>
                            }
                            {
                                formData.imageUrls.length > 0 && formData.imageUrls.map((url , index)=> (
                                    <div className='flex flex-row justify-between items-center px-2 py-1 border-[1px] border-black rounded-xl' key={index}>
                                    <img src={url} className='w-20 h-20 object-contain'/>
                                    <button type='button' onClick={()=>deleteImage(index)} className='text-red-700 uppercase hover:opacity-95'>Delete</button>
                                    </div>
                                ))
                            }
                        </div>

                        <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
                           {loading ? 'Updating...' : ' Update Listing'}
                            </button>
                            {error && <p className='text-red-700 text-sm text-center'>{error}</p>}
                    </div>
                </div>

            </form>
        </main>
    );
}

