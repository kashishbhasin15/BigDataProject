import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', padding: '1rem 0 0.25rem' }}>
      <button
        className="neu-icon-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        <ChevronLeft size={18} />
      </button>
      {start > 1 && (
        <>
          <button className="neu-page-btn" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span style={{ color: 'var(--text-muted)', padding: '0 0.25rem' }}>…</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          className={`neu-page-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{ color: 'var(--text-muted)', padding: '0 0.25rem' }}>…</span>}
          <button className="neu-page-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}
      <button
        className="neu-icon-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
