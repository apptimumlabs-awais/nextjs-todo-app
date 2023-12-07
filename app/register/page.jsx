"use client";
import Link from 'next/link';
import React,  {useState , useContext} from 'react';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import {Context} from '../components/Clients'
export default function Page (){
   const [name , setName] = useState('')
   const [email , setEmail] = useState('')
   const [password , setPassword] = useState('')
   const {user , setUser} = useContext(Context)
   const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: 'POST',
        body:JSON.stringify({ name , email, password}),
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json()
     if(!data.success) return toast.error(data.message)
        setUser(data.user)
      toast.success(data.message)

    } catch (error) {
        toast.error(error.message)
    }

  };
  if(user?._id )return redirect('/') ;
    return (
       <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-6xl text-gray-900">A lead generation and marketing platform to help you scale</h1>
      <p className="leading-relaxed mt-4 text-2xl">Get started in less than 5 minutes - for free.</p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-3xl">Resgister </h2>
      <form onSubmit={handleSubmit}>
         <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name </label>
        <input type="text" onChange={e=>setName(e.target.value)} id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" onChange={e=>setEmail(e.target.value)} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input type="password" onChange={e=>setPassword(e.target.value)} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign Up</button>

      <p className="text-xm text-gray-500 mt-3">{`Already have an account? `}<Link href='/login'className='text-blue-500' >Sign In.</Link> </p>

    </form>
    </div>
  </div>
</section>
    );
}