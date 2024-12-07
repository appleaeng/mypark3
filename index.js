import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';  // Assuming DeleteBtn is a separate component

const Dashboard = () => {
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/posts", {
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
    <div className="dashboard-container">
      {/* Navbar */}
      <nav>
        <h1>comsci</h1>
        <p>park</p>
      </nav>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <div className="image-user">
            <img src="user.jpg" alt="User Picture" />
          </div>
          <div className="userInfo">
            <p>Jane</p>
            <p>Manager</p>
          </div>
        </div>
        <menu>
          <ul>
            <li className="Dashboard"><Link href="/dashboard"><i className='bx bxs-dashboard'></i> Dashboard</Link></li>
            <li className="Tiket"><Link href="/tickets"><i className='bx bxs-id-card'></i> Ticket</Link></li>
            <li className="Customer"><Link href=""><i className='bx bxs-user'></i> Customer</Link></li>
            <li className="Transaction"><Link href=""><i className='bx bxs-bar-chart-alt-2'></i> Transaction</Link></li>
            <li className="Place"><Link href=""><i className='bx bxs-map'></i> Place</Link></li>
            <li className="Employee"><Link href=""><i className='bx bxs-briefcase'></i> Employee</Link></li>
            <li className="Review"><Link href=""><i className='bx bxs-report'></i> Review</Link></li>
          </ul>
        </menu>
        <footer className="logout">
          <Link href="/logout"><i className='bx bx-log-out'></i> Logout</Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h3>Ticket Store</h3>
        <hr className="my-3" />
        <button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Add Ticket</Link></button>

        <div className="grid grid-cols-4 mt-3 gap-5">
          {postData && postData.length > 0 ? (
            postData.map(val => (
              <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
                <h4 className='text-2xl'>{val.ticket_type}</h4>
                <Image
                  className='my-3 rounded-md'
                  src={val.ticket_photo}
                  width={300}
                  height={0}
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
    </div>
  );
};

export default Dashboard;
