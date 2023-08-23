// 'use client'

// import { useTodos } from "../context/todos/page";

// const Pagination = () => {
//   const { currentPage, totalPages, goToPage, totalTodos, todosPerPage } = useTodos();

//   // Sayfa numaralarını oluşturmak 
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Sayfada gösterilen todos sayısı
//   const currentTodosPerPage = currentPage === totalPages ? totalTodos % todosPerPage : todosPerPage;

//   return (
//     <div>
//       <ul className="pagination">
//         <li>
//           <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
//             Prev
//           </button>
//         </li>
//         {pageNumbers.map((pageNumber) => (
//           <li key={pageNumber}>
//             <button onClick={() => goToPage(pageNumber)} className={currentPage === pageNumber ? "active" : ""}>
//               {pageNumber}
//             </button>
//           </li>
//         ))}
//         <li>
//           <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </li>
//       </ul>
//       <p className="showing">
//         Showing {currentTodosPerPage} out of {totalTodos} todos
//       </p>
//     </div>
//   );
// };


// export default Pagination;

'use client'

import React from "react";
import { useTodos } from "../context/todos/page";

function Pagination() {
  const { currentPage, totalPages, changePage,goToPage } = useTodos();

  
  // Sayfa numaralarını oluşturmak 
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  const handlePrevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      
      {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button onClick={() => goToPage(pageNumber)} className={currentPage === pageNumber ? "active" : ""}>
              {pageNumber}
            </button>
          </li>
        ))}


      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
