'use client';

import { useSearchParams } from 'next/navigation';
import { getLang } from '@/app/lib/i18n/i18n';

export default function LangProvider({
  children,
}: {
  children: (lang: 'id' | 'en') => React.ReactNode;
}) {
  const params = useSearchParams();
  const lang = getLang({ lang: params.get('lang') || undefined });

  return <>{children(lang)}</>;
}
