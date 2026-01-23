import LanguageSwitch from '@/app/ui/language-switch';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP BAR */}
      <div className="flex justify-end p-4 border-b bg-white">
        <LanguageSwitch />
      </div>

      {/* PAGE */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
