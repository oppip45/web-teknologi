export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Form from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { getLang } from '@/app/lib/i18n/i18n';

type PageProps = {
  params: Promise<{
    id?: string;
  }>;
  searchParams?: {
    lang?: string;
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;

  if (!id) {
    throw new Error('Invoice ID is missing from route params');
  }

  const lang = getLang(searchParams);

  const invoice = await fetchInvoiceById(id);
  const customers = await fetchCustomers();

  return <Form lang={lang} invoice={invoice} customers={customers} />;
}
