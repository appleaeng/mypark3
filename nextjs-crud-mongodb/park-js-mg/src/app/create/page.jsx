"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'

function CreatePostPage() {

    const [ticket_type, setTicketType] = useState("");
    const [ticket_price, setTicketPrice] = useState("");
    const [ticket_photo, setTicketPhoto] = useState("");
    const [ticket_name, setTicketName] = useState("");
    const [ticket_detail, setTicketDetail] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted"); // Add this line
        console.log({ ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail });

        if (!ticket_type || !ticket_price || !ticket_photo  || !ticket_name || !ticket_detail  ) {
            alert("Please complete all inputs.");
            return;      
        }

        try {
            console.log("Sending request"); // Add this line
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ticket_type, ticket_price, ticket_photo, ticket_name, ticket_detail })
            })

            if (res.ok) {
                console.log("Request successful"); // Add this line
                router.push("/");
            } else {
                console.log("Request failed"); // Add this line
                throw new Error("Failed to create a Ticket");
            }

        } catch(error) {
            console.log("Error:", error);
        }
    }

  return (
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-bold'>Add Ticket</h3>
        <hr className='my-3' />
        <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setTicketType(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Ticket type' />
            <input onChange={(e) => setTicketPrice(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Ticket price' />
            <input onChange={(e) => setTicketPhoto(e.target.value)} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your img Ticket url'></input>
            <input onChange={(e) => setTicketName(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Ticket Name' />
            <textarea onChange={(e) => setTicketDetail(e.target.value)} type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Ticket Detail' />
            <button 
                type='submit' 
                className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                onClick={(e) => {
                    e.preventDefault();
                    console.log("Button clicked");
                    handleSubmit(e);
                }}
            >
                Add Ticket
            </button>
        </form>
    </div>
  )
}
/*<button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Add Ticket</Link></button>
<button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Add Ticket</button>
 */
export default CreatePostPage