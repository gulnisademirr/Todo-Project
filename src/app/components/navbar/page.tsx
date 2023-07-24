'use client'


import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useTodos, SortOption } from "@/store/todos"; 
import { useTodos, SortOption } from "../context/todos/page"; 


// export default function Navbar  ()  {
    function Navbar  ()  {

  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");

  const { sortOption, setSortOption } = useTodos(); // Add the sorting context

  console.log("navbar " + todosFilter);

  return (
    <nav>
      <Link href="/" className={todosFilter === null ? "active" : ""}>
        All
      </Link>
      <Link
        href="/?todos=active"
        className={todosFilter === "active" ? "active" : ""}
      >
        Active
      </Link>
      <Link
        href="/?todos=completed"
        className={todosFilter === "completed" ? "active" : ""}
      >
        Completed
      </Link>

      {/* Dropdown for sorting options */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value as SortOption)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="newestUpdated">Newest Updated First</option>
        <option value="oldestUpdated">Oldest Updated First</option>
      </select>

      <Link href="/components/add-todo">
        <button type="submit" className="buttonNew">
           NEW TODO
        </button>
    
       
      </Link>
    </nav>
  );
}
export default Navbar;