export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import Table from '@/app/ui/customers/table';
import Pagination from '@/app/ui/customers/pagination';
import { fetchCustomersPages } from '@/app/lib/data';
import { getLang, t } from '@/app/lib/i18n/i18n';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    lang?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const lang = getLang(searchParams);
  const tr = t(lang);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      {/* ❗ HAPUS kalau judul sudah ada di Table */}
      {/* <h1 className="mb-4 text-xl md:text-2xl">{tr.customers}</h1> */}

      <Suspense key={query + currentPage} fallback={<p>{tr.loading}</p>}>
        <Table lang={lang} query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        {/* ✅ KIRIM LANG */}
        <Pagination lang={lang} totalPages={totalPages} />
      </div>
    </div>
  );
}
