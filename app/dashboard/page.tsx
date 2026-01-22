import Cards from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>

      {/* ===== CARDS ===== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Cards
          numberOfCustomers={numberOfCustomers}
          numberOfInvoices={numberOfInvoices}
          totalPaidInvoices={totalPaidInvoices}
          totalPendingInvoices={totalPendingInvoices}
        />
      </div>

      {/* ===== RECENT + LATEST ===== */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Recent Revenue (LEFT, BIG) */}
        <div className="md:col-span-3">
          <RevenueChart revenue={revenue} />
        </div>

        {/* Latest Invoices (RIGHT) */}
        <div className="md:col-span-1">
          <LatestInvoices latestInvoices={latestInvoices} />
        </div>
      </div>
    </main>
  );
}
