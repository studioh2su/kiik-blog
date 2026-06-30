const navItems = [
  { href: "/docs", label: "전체 가이드" },
  { href: "/docs/setup", label: "01 채널 개설" },
  { href: "/docs/seo", label: "02 SEO 전략" },
  { href: "/docs/cardnews", label: "03 카드뉴스" },
  { href: "/docs/monetize", label: "04 수익화" },
  { href: "/docs/automation", label: "05 자동화" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">
      <aside className="w-48 shrink-0">
        <div className="sticky top-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--gray)" }}>
            가이드
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm px-3 py-2 rounded hover:text-white transition-colors"
                style={{ color: "var(--light)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-w-0 prose-docs">{children}</main>
    </div>
  );
}
