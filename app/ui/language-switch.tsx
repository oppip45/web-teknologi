'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function LanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentLang = params.get('lang') || 'id';

function setLang(lang: string) {
  const newParams = new URLSearchParams(params.toString());
  newParams.set('lang', lang);

  router.replace(`${pathname}?${newParams.toString()}`);
  router.refresh(); // 🔥 INI YANG HILANG & BIKIN LO STRESS
}

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLang('id')}
        className={`px-3 py-1 rounded ${
          currentLang === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        🇮🇩 ID
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded ${
          currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
