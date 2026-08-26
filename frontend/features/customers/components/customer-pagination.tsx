type CustomerPaginationProps = {
    currentPage: number;
    totalPages: number;
    totalRows: number;
    onPageChange: (page: number) => void;
};

export default function CustomerPagination({
                                               currentPage,
                                               totalPages,
                                               totalRows,
                                               onPageChange,
                                           }: CustomerPaginationProps) {
    return (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#8b94a9]">
                Showing customers · {totalRows} total
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                        onPageChange(currentPage - 1)
                    }
                    className="rounded-lg border border-[#e0e5ef] bg-white px-3 py-2 text-xs text-[#68728a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Previous
                </button>

                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() =>
                            onPageChange(page)
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
                            currentPage === page
                                ? "bg-[#4f6eff] text-white"
                                : "border border-[#e0e5ef] bg-white text-[#68728a]"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    type="button"
                    disabled={
                        currentPage === totalPages
                    }
                    onClick={() =>
                        onPageChange(currentPage + 1)
                    }
                    className="rounded-lg border border-[#e0e5ef] bg-white px-3 py-2 text-xs text-[#68728a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}