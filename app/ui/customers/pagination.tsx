'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { t } from '@/app/lib/i18n/i18n';

export default function Pagination({
  lang,
  totalPages,
}: {
  lang: 'id' | 'en';
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const tr = t(lang);

  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    params.set('lang', lang); // 🔥 PENTING: biar bahasa gak reset
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        {tr.prev}
      </button>

      <span className="text-sm">
        {tr.page} {currentPage} {tr.of} {totalPages}
      </span>

      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        {tr.next}
      </button>
    </div>
  );
}
