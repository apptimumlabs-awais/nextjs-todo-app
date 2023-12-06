'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const Context = createContext({user:{}});
export const Provider = ({children})=>{
  const [user , setUser ] = useState({})
  useEffect(()=>{
    fetch('/api/auth/me').then(res=>res.json()).then((data)=>{setUser(data.user)}).catch(error=>setUser({}))
  },[])
  return(
    <Context.Provider  value={{user , setUser}} >{children}</Context.Provider>
  );
}

export function LogOutBtn (){
  const {user , setUser } = useContext(Context)
 const logoutHandler = async() => {
  try {
    const res = await fetch("/api/auth/logout");
    const data = await res.json();
    if (!data.success) toast.error(data.message)
    setUser({})
    toast.success(data.message)
  } catch (error) {
      toast.error(error.message)
  }
 }
    return(
    user?._id ? 
   <button onClick={logoutHandler} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Log Out
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    :
    <Link href={'/login'} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" >Log-in </Link>  
    );
}


export function TodoActionBtns ({id , isCompleted}){
  const router = useRouter();
  const editHandler = async()=>{
    try {
      const res = await fetch(`/api/task/${id}`, { method: 'PUT' })
      const data = await res.json();
      if (!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh();
    } catch (error) {
      toast.success(error)

    }
  };
  const deleteHandler =async ()=>{
    try {
      const res = await fetch(`/api/task/${id}`, {method : 'DELETE'})
      const data = await res.json();
      if(!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh();
    } catch (error) {
      toast.success(error)

    }
  }
  return(<>
    <div className='flex items-center  justify-end	'>
    
    <input className="m-3  " type="checkbox" checked={isCompleted} name="status" id={id} onChange={editHandler} />
    
        <div className="m-3">
        <button className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white" onClick={deleteHandler}>
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm4 0V2a2 2 0 012-2h4a2 2 0 012 2v1m-4 0v2m4 0v2m-4 0v2m4 0v2m-2-4h4"/>
</svg>

        </button>
    </div>
</div>
  </>)
}