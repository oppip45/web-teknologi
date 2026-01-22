export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Form from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

type PageProps = {
  params: Promise<{
    id?: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params; // ✅ WAJIB di Next.js terbaru

  if (!id) {
    throw new Error('Invoice ID is missing from route params');
  }

  const invoice = await fetchInvoiceById(id);
  const customers = await fetchCustomers();

  return <Form invoice={invoice} customers={customers} />;
}
