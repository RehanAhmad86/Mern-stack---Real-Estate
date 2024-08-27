import React, { useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../Firebase.js'

export default function CreateListing() {
    const [files, setFiles] = useState([])
    const [ formData , setFormdata ] = useState({
        imageUrls:[]
    })
    const [imageUploadError , setImageUploadError] = useState(false)
    const [ uploading , setuploading ] = useState(false)
    console.log(files)
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
    return (
        <main className='p-5 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col gap-6'>
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
                        />
                        <textarea
                            placeholder='Description'
                            className='border p-3 rounded-lg w-full h-24'
                            id='description'
                            required
                        />
                        <input
                            type='text'
                            placeholder='Address'
                            className='border p-3 rounded-lg w-full'
                            id='address'
                            required
                        />

                        {/* Checkboxes Section */}
                        <div className='flex flex-wrap gap-4'>
                            <div className='flex items-center gap-2'>
                                <input id='sell' type='checkbox' className='w-5 h-5' />
                                <label htmlFor='sell'>Sell</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='rent' type='checkbox' className='w-5 h-5' />
                                <label htmlFor='rent'>Rent</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='parking' type='checkbox' className='w-5 h-5' />
                                <label htmlFor='parking'>Parking spot</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='furnished' type='checkbox' className='w-5 h-5' />
                                <label htmlFor='furnished'>Furnished</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input id='offer' type='checkbox' className='w-5 h-5' />
                                <label htmlFor='offer'>Offer</label>
                            </div>
                        </div>

                        {/* Beds and Baths Section */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex items-center gap-2'>
                                <label htmlFor='bedrooms'>Beds</label>
                                <input type='number' id='bedrooms' min='1' max='10' required className='p-2 border rounded-lg w-full' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <label htmlFor='bathrooms'>Baths</label>
                                <input type='number' id='bathrooms' min='1' max='10' required className='p-2 border rounded-lg w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start justify-center gap-2 sm'>
                                <p>Regular price <span>($ / month)</span></p>
                                <input type='number' id='regularPrice' min='1' required className='p-2 border rounded-lg w-1/3' />
                            </div>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start justify-center gap-2 sm'>
                                <p>Discount price <span>($ / month)</span></p>
                                <input type='number' id='discountPrice' min='1' required className='p-2 border rounded-lg w-1/3' />
                            </div>
                        </div>
                    </div>

                    {/* Right Column for Image Upload and Button */}
                    <div className='flex flex-col gap-4 w-full'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Images:</label>
                            <p className='text-sm text-gray-600'>The first image will be the cover (max 6)</p>
                            <div className='flex items-center gap-2'>
                                <input onChange={(event => setFiles(event.target.files))} type='file' id='images' multiple accept='image/*' className='w-full' />
                                <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-2 text-green-700 border border-green-700 rounded hover:shadow-lg uppercase'>
                                    { uploading ? 'Uploading...' : 'Upload'}
                                    </button>
                            </div>
                            {
                            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError }</p>
                            }
                            {
                                formData.imageUrls.length > 0 && formData.imageUrls.map((url , index)=> (
                                    <div className='flex flex-row justify-between items-center p-3' key={index}>
                                    <img src={url} className='w-28 h-28 object-contain'/>
                                    <button type='button' onClick={()=>deleteImage(index)} className='text-red-700 uppercase hover:opacity-95'>Delete</button>
                                    </div>
                                ))
                            }
                        </div>
                        {/* Create Listing Button */}
                        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>Create Listing</button>
                    </div>
                </div>

            </form>
        </main>
    );
}

