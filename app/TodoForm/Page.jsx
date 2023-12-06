'use client'
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../components/Clients";
import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";
export default function Page() {

  const [form , setForm] = useState({task:'', description:''})
  const router = useRouter();
  const { user } = useContext(Context)
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/newTask',{method:'POST', body:JSON.stringify(form),headers:{"Content-Type":"application/json"}});
      const data = await res.json();
      if(!data.success)return toast.error(data.message);
      toast.success(data.message)
      setForm({...form , task : '', description:''})
      router.refresh();

    } catch (error) {
      return toast.success(error?.message)
    }
    
  }
  const handleChange = (e) => {
    setForm({  ...form , [e.target.name] : e.target.value})
  }
  if(!user._id) return redirect('/login')
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-3xl">
            Create Task{" "}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Task{" "}
              </label>
              <input
                type="text"
                id="full-name"
                name="task"
                value={form.task}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Description{" "}
              </label>
              <input
                type="text"
                id="full-name"
                name="description"
                value={form.description}

                onChange={handleChange}

                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button type="submit" className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
