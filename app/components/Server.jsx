import React from 'react';
import { TodoActionBtns } from './Clients';
import { cookies } from "next/headers";

const fetchTodos = async (token) => {
  try {
    console.log('object :>> ',token, `${process.env.URL}/api/myTask`);
    // const res = await fetch('/api/myTask')
     const res = await fetch(`${process.env.URL}/api/myTask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    console.log('res :>> ', );
    const data = await res.json();
    console.log('data :>> ', data);
    return data.message === true ?   data.todos : [];
  } catch (error) {
    return []
  }
}

const fetchTodo = async (token) => {
  try {
    console.log('token :>> ', token);
    const res = await fetch(`${process.env.URL}/api/myTask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();
    console.log('data : >> ', data);

    if (!data.success) return [];

    return data.todos;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const TodoCard = async ({  id})=>{
   const token = cookies().get("token")?.value;
  const tasks = await fetchTodo(token);
    console.log('tasks >> ', tasks);

    return(<>
              {tasks.map(({_id, task , description , isCompleted,})=>(
                <div className="mx-auto p-4 lg:w-1/2 md:w-full" key={_id}>
        <div className="flex border-2 rounded-full shadow-lg border-gray-200 border-opacity-50 p-4 px-8 sm:flex-row flex-col">
          
          <div className="flex-grow w-3/4">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-1">{task}</h2>
            <p className="leading-relaxed text-base">{description}</p>
           
          </div>
            <div className="flex-grow w-1/4 px-auto ">
                <TodoActionBtns  task={task} description={description} isCompleted={isCompleted} id={_id}/>


          </div>
        </div>
      </div>
              ))}
              </>
    );
};