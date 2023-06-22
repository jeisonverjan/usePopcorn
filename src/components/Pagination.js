export function Pagination({
  numPages,
  onNextPage,
  onPrevPage,
  currentPage,
  onFirstPage,
  onLastPage,
}) {
  return (
    <div className="pagination">
      <div className="pag-item text">
        <p>{`${currentPage} of ${numPages}`}</p>
      </div>

      {currentPage === 1 && (
        <>
          <Button onClick={onNextPage} className="next">
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <Button onClick={onLastPage} className="last">
            <i className="fa-solid fa-forward-step"></i>
          </Button>
        </>
      )}

      {currentPage === numPages && (
        <>
          <Button onClick={onFirstPage} className="first">
            <i className="fa-solid fa-backward-step"></i>
          </Button>
          <Button onClick={onPrevPage} className="prev">
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
        </>
      )}

      {currentPage !== 1 && currentPage !== numPages && (
        <>
          <Button onClick={onFirstPage} className="first">
            <i className="fa-solid fa-backward-step"></i>
          </Button>
          <Button onClick={onPrevPage} className="prev">
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button onClick={onNextPage} className="next">
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
          <Button onClick={onLastPage} className="last">
            <i className="fa-solid fa-forward-step"></i>
          </Button>
        </>
      )}
    </div>
  );
}

function Button({ children, onClick, className }) {
  return (
    <button className={`pag-item btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
