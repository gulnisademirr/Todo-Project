"use client"
import { useState, useEffect } from "react";
import { useTodos, Todo } from "@/app/components/context/todos/page";
import { useRouter } from 'next/navigation'


type EditTodoProps = {
  todo: Todo | null;
};

const EditTodo = ({ todo }: EditTodoProps) => {
  const { handleEditTodo } = useTodos();
  
  const [editedTask, setEditedTask] = useState<string>(todo ? todo.task : "");
  const todoId = todo?.id;

useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const task = queryParams.get("task");
    if (task) {
      setEditedTask(decodeURIComponent(task));
    }
  }, []);
  
  const router = useRouter();
 

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  
    // router.push("/");
    // Güncellemeyi yap
    if (editedTask.trim() !== "" && todoId) {
      handleEditTodo(todoId, editedTask);

      // Yönlendirme işlemini gerçekleştir
      // window.location.href = "/";
      router.push("/");
      
    }
  };

  const handleEditCancel = () => {
    // Yönlendirme işlemini gerçekleştir
    // window.location.href = "/";
    router.push("/");
  };

  return (
    <div className="container">
      <form className="addForm" onSubmit={handleEditFormSubmit}>
        <h2> Edit todo</h2>

        <input
          type="text"
          placeholder="Todo Title"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
        <br />
{/* 
        <textarea
          placeholder="Todo Description"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        /> */}

        <br />
        <button type="button" onClick={handleEditCancel}>
          Cancel
        </button>

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditTodo;