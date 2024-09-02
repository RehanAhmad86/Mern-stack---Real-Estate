import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')
    useEffect(() => {
        const getLandlord = async () => {
            try {
                const result = await fetch(`/api/user/${listing.userRef}`)
                const data = await result.json()
                console.log(data)
                setLandlord(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getLandlord()
    }, [listing.userRef])

    return (
        <>
            {landlord &&
                <div className='flex flex-col gap-2'>
                    <p>Contact - <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea placeholder='Enter message...' className='w-full outline-none focus:outline-none bg-slate-200 p-3 rounded-lg' name='message' id='message' rows='3'
                        value={message} onChange={(event => setMessage(event.target.value))}></textarea>
                        <Link
                        to={`mailto:${landlord.email}?subject=regarding ${listing.name}&body=${message}`}
                        >
                    <button disabled={message.trim() === ''} className='bg-slate-700 p-3 disabled:opacity-80 text-white text-center w-full rounded-lg
                                hover:opacity-95 uppercase'>send message</button>
                        </Link>
                </div>
            }
        </>
    )
}
