"use client";
import React from "react";

import TextEditor from "../components/TextEditor";
export default function Page() {
  // if (!user._id) return redirect("/login");
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
