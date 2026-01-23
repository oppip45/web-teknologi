export const dynamic = 'force-dynamic';

import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data';
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

  const invoices = await fetchFilteredInvoices(query, currentPage);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      {/* ================= TITLE ================= */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">{tr.invoices}</h1>
      </div>

      {/* ================= SEARCH + CREATE ================= */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={tr.searchInvoices} />
        <CreateInvoice lang={lang} />
      </div>

      {/* ================= TABLE ================= */}
      <Table lang={lang} invoices={invoices} />

      {/* ================= PAGINATION ================= */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          lang={lang}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
