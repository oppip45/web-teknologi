import SideNav from '@/app/ui/dashboard/sidenav';
import Cards from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { getLang, t } from '@/app/lib/i18n/i18n';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang = getLang(params);
  const tr = t(lang);

  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <div className="w-64">
        <SideNav lang={lang} />
      </div>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6 md:p-12">
        <h1 className="mb-4 text-xl md:text-2xl">{tr.dashboard}</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Cards
            lang={lang}
            numberOfCustomers={numberOfCustomers}
            numberOfInvoices={numberOfInvoices}
            totalPaidInvoices={totalPaidInvoices}
            totalPendingInvoices={totalPendingInvoices}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-3">
            <RevenueChart lang={lang} revenue={revenue} />
          </div>

          <div className="md:col-span-1">
            <LatestInvoices lang={lang} latestInvoices={latestInvoices} />
          </div>
        </div>
      </main>
    </div>
  );
}
