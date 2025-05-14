import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import "../styles/pagination-component.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => {
      return (
        page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1
      );
    })
    .reduce((acc, page, index, arr) => {
      if (index > 0 && page - arr[index - 1] > 1) {
        acc.push("...");
      }
      acc.push(page);
      return acc;
    }, []);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="nav-button"
        title="Primeira página"
      >
        <MdFirstPage />
      </button>

      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="nav-button"
        title="Página anterior"
      >
        <GoChevronLeft />
      </button>

      {visiblePages.map((item, index) =>
        item === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(item)}
            className={item === currentPage ? "active" : ""}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="nav-button"
        title="Próxima página"
      >
        <GoChevronRight />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="nav-button"
        title="Última página"
      >
        <MdLastPage />
      </button>
    </div>
  );
};

export default Pagination;
