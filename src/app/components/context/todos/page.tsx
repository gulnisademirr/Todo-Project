"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type SortOption =
  | "newest"
  | "oldest"
  | "newestUpdated"
  | "oldestUpdated";

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string, newTask: string) => void;
  handleFilterChange: (id: string) => void;

  //Filtreleme
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;

  // Pagination ile ilgili değişkenler
  currentPage: number;
  todosPerPage: number;
  totalTodos: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (e) {
      return [];
    }
  });
  //Pagination

  // Diğer state ve fonksiyonları tanımladıktan sonra sayfalama için gerekli olan state ve fonksiyonlar
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 6; // Her sayfada kaç todo gösterileceği

  // Toplam todo sayısını almak için todos'un uzunluğu
  const totalTodos = todos.length;

  // Toplam sayfa sayısı
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  // Seçili sayfa
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  // Şu anki sayfaya göre gösterilecek todos listesi
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const [sortOption, setSortOption] = useState<SortOption>("newest");
  // Sorting logic based on the selected sortOption
  const sortedTodos = todos.slice().sort((a, b) => {
    if (sortOption === "newest") {
      return +b.createdAt - +a.createdAt;
    } else if (sortOption === "oldest") {
      return +a.createdAt - +b.createdAt;
    } else if (sortOption === "newestUpdated") {
      return +b.updatedAt - +a.updatedAt;
    } else if (sortOption === "oldestUpdated") {
      return +a.updatedAt - +b.updatedAt;
    }
    return 0;
  });

  function handleAddTodo(task: string) {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...prev,
      ];
      console.log(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // toggleTodoAsCompleted
  const toggleTodoAsCompleted = (id: string) => {
    // function toggleTodoAsCompleted(id:string) {
    setTodos((prev) => {
      // console.log("completed "+ prev.map((val) => val ))
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // handleDeleteTodo
  function handleDeleteTodo(id: string) {
    setTodos((prev) => {
      const newTodos = prev.filter((task) => task.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // handleEditTodo
  function handleEditTodo(id: string, updatedTask: string) {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, task: updatedTask, updatedAt: new Date() }; // Yapılan düzenlemeye göre metni güncelle
        }
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  return (
    // @ts-ignore
    <todosContext.Provider value={{todos: currentTodos,
        // todos: currentTodos,
        // todos: [sortedTodos,currentTodos], // şeklinde yazılmalı.
        // todos: sortedTodos,
        handleAddTodo,
        toggleTodoAsCompleted,
        handleDeleteTodo,
        handleEditTodo,
        sortOption,
        setSortOption,
        currentPage,
        todosPerPage,
        totalTodos,
        totalPages,
        goToPage,
      }}
    >
      {children}
    </todosContext.Provider>
  );
}

export function useTodos() {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error("useTodos used outside of Provider");
  }

  return todosContextValue;
}
