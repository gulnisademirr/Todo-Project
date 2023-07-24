// import AddTodo from "@/components/add-todo";
// import {Todos} from "@/components/todos";
// import Navbar from "@/components/navbar";

'use client'

import AddTodo from "./components/add-todo/page";
// import  {Todos} from "./components/todos/page";
import Navbar from "./components/navbar/page";
// import EditTodo from "./components/edit-todo/page"
import Todos from "./components/todos/page"

import "./globals.css";
import { RiTodoLine } from "react-icons/ri";
// thapa technical SUBSCRIBE
const Page = () => {

    return (
      <main>

          <h2><RiTodoLine className="icons" /> TODOS <RiTodoLine className="icons" /> </h2>
          <Navbar />
          {/* <AddTodo /> */}
          <Todos />
          
      </main>
   
     
    );
};

export default Page;
