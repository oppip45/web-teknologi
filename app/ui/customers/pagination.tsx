'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
