const PaginationFooter = ({
  page,
  currentPage,
  lastPage,
  onPrev,
  onNext,
}) => {
  const activePage = currentPage ?? page ?? 1;

  return (
    <div className="flex items-center justify-between px-10 py-3 border-brand-planoff border-t bg-white">
      {/* Left */}
      <p className="text-sm text-brand-subtext">
        Page <span className="font-medium">{activePage}</span> of{" "}
        <span className="font-medium">{lastPage}</span>
      </p>

      {/* Right */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          disabled={activePage === 1}
          className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40 hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={activePage === lastPage}
          className="px-4 py-2 rounded-xl bg-brand-secondary text-white text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;
