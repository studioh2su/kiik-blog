import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KiiK News — 블로그 운영 가이드",
  description: "AI · Tech · Economy · Lifestyle 트렌드 블로그 제작 과정, 카드뉴스 템플릿, 운영 노하우를 공유합니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)", color: "var(--white)" }}>
        <header style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-1 font-bold text-xl tracking-tight">
              <span style={{ color: "var(--accent)" }}>KiiK</span>
              <span style={{ color: "var(--white)" }}>News</span>
              <span style={{ color: "var(--gray)", fontSize: "0.7rem", fontWeight: 400, marginLeft: 6 }}>블로그 가이드</span>
            </a>
            <nav className="flex items-center gap-6 text-sm" style={{ color: "var(--light)" }}>
              <a href="/docs" className="hover:text-white transition-colors">가이드</a>
              <a href="/trends" className="hover:text-white transition-colors">트렌드</a>
              <a href="/templates" className="hover:text-white transition-colors">템플릿</a>
              <a href="https://github.com/studioh2su/kiik-blog" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer style={{ borderTop: "1px solid var(--border)", color: "var(--gray)" }}>
          <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-sm">
            <span><span style={{ color: "var(--accent)" }}>KiiK</span> News © 2026</span>
            <a href="https://blog.naver.com/kiiknews" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">네이버 블로그 →</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
