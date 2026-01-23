import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';
import { getLang } from '@/app/lib/i18n/i18n';

export default async function Page(props: {
  searchParams?: Promise<{
    lang?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const lang = getLang(searchParams);

  const customers = await fetchCustomers();

  return <Form lang={lang} customers={customers} />;
}
