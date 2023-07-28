"use client"
import {useTodos} from "../context/todos/page";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiEditBoxFill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";


function Todos() {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo,handleEditTodo} = useTodos();
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState("");

  // handleEditButtonClick fonksiyonunu kaldırın

  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");
  console.log("params " + todosFilter);

  let filteredTodos = todos;

  if (todosFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (todosFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }


  return (
    <ul className="main-task">
      {filteredTodos.map((todo) => {
        return (
          <div className="card-container" key={todo.id}>
            <div>
              <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                <RiDeleteBin2Fill className="icons" />
              </button>
              <button
                type="button"
                // onClick={() => (window.location.href = `/components/edit-todo/${todo.id}?task=$`)}
                onClick={() => (window.location.href = `/components/edit-todo/${todo.id}?task=${encodeURIComponent(todo.task)}`)}

              >
                <RiEditBoxFill className="icons" />
              </button>
            </div>
            <hr />
            <hr />
            <li>
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => {
                  console.log(todo.completed);
                  toggleTodoAsCompleted(todo.id);
                }}
              />
              <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            </li>
          </div>
        );
      })}
     
    </ul>
  );
}

export default Todos;