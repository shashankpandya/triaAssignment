import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPages(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Contact pagination">
      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} aria-hidden />
      </button>

      <ul className="page-list">
        {pages.map((page) => (
          <li key={page.key}>
            {page.type === "page" ? (
              <button
                type="button"
                className={`page-number ${
                  page.value === currentPage ? "is-active" : ""
                }`}
                onClick={() => onPageChange(page.value)}
                aria-current={page.value === currentPage ? "page" : undefined}
              >
                {page.value}
              </button>
            ) : (
              <span className="page-ellipsis" aria-hidden>
                …
              </span>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="page-btn"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={18} aria-hidden />
      </button>
    </nav>
  );
}

function buildPages(currentPage, totalPages) {
  const pages = [];
  const addPage = (value) => {
    pages.push({ type: "page", value, key: `page-${value}` });
  };

  const addEllipsis = (index) => {
    pages.push({ type: "ellipsis", key: `ellipsis-${index}` });
  };

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i += 1) {
      addPage(i);
    }
    return pages;
  }

  addPage(1);
  if (currentPage > 4) {
    addEllipsis(1);
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i += 1) {
    addPage(i);
  }

  if (currentPage < totalPages - 3) {
    addEllipsis(2);
  }
  addPage(totalPages);

  return pages;
}
