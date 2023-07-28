"use client";
import { FormEvent, useState } from "react";
// import {useTodos} from "@/store/todos";
import { useTodos } from "../context/todos/page";
import Link from "next/link";
import { useRouter } from 'next/navigation'


const AddTodo = () => {
  const [todo, setTodo] = useState("");

  const { handleAddTodo } = useTodos();
  const router = useRouter();

  // thapa technical SUBSCRIBE

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddTodo(todo); // to add the data in an array
    setTodo("");
    router.push("/"); //BU KISIM ÇALIŞMIYOR
  
  }

  return (
    <div className="container">
      <form className="addForm" onSubmit={handleFormSubmit}>
        <h2> Add a new todo</h2>
        
        <input
          type="text"
          placeholder="Todo Title"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <br />

        
        {/* <textarea
        //   type="text"
          placeholder="Todo Description"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        /> */}

        <br />
        <Link href="/">
          <button type="submit" >Cancel</button>
        </Link>
      

        <button type="submit">Add a new todo</button>
      </form>
    </div>
  );
};

export default AddTodo;

