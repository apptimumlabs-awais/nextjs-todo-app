"use client";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../components/Clients";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import TextEditor from "../components/TextEditor";
export default function Page() {
  const [form, setForm] = useState({ task: "", description: "" });
  const router = useRouter();
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newTask", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      setForm({ ...form, task: "", description: "" });
      router.refresh();
    } catch (error) {
      return toast.success(error?.message);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  if (!user._id) return redirect("/login");
  return (
    <section className=" body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-5/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5 ">
            Create Task{" "}
          </h2>

          <TextEditor />
        </div>
      </div>
    </section>
  );
}
