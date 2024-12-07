
"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
import DeleteBtn from './DeleteBtn';

export default function Home() {

  const [postData, setPostData] = useState([]);

  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto">
     <h3>Ticket Store</h3>
     <hr className="my-3" />
     <button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Add Ticket</Link></button>
     
     <div className="grid grid-cols-4 mt-3 gap-5">
      {postData && postData.length > 0 ? (
        postData.map(val => ( /*mapลูปข้อมูล-valใช้รับค่า-สร้าง key id อ้างอิงpostนั้นๆ */
          <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
            <h4 className='text-2xl'>{val.ticket_type}</h4>
            <Image 
              className='my-3 rounded-md'
              src={val.ticket_photo}
              width={300}
              height={0}
              //alt={val.ticket_name}
              alt="A sample description of the image"

            />
            <p>{val.ticket_price} baht</p> 
            <p>{val.ticket_detail}</p>
            <div className='mt-5'>
              <Link className='bg-blue-500 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/edit/${val._id}`}>Edit</Link>
              <DeleteBtn id={val._id} />
            </div>
          </div>
        ))
      ) : (
        <p className='bg-gray-300 p-3 mt-3'>
          You do not have any Ticket yet.
        </p>
      )}
     </div>
    </main>
  );
}

