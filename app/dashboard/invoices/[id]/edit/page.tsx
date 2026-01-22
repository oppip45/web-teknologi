import Form from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const invoice = await fetchInvoiceById(params.id);
  const customers = await fetchCustomers();

  return <Form invoice={invoice} customers={customers} />;
}
