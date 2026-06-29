export default function Home() {
  const guides = [
    { step: "01", title: "블로그 채널 개설", desc: "네이버 블로그 · 티스토리 · WordPress 세팅 가이드", href: "/docs/setup" },
    { step: "02", title: "SEO 전략", desc: "검색 상위 노출을 위한 키워드 · 구조 · 태그 최적화", href: "/docs/seo" },
    { step: "03", title: "카드뉴스 제작", desc: "Python 템플릿으로 1080×1080 카드 자동 생성", href: "/docs/cardnews" },
    { step: "04", title: "광고 수익화", desc: "애드센스 · 애드포스트 · 애드핏 심사 및 세팅", href: "/docs/monetize" },
    { step: "05", title: "자동화 파이프라인", desc: "트렌드 서치 → 글 생성 → 발행 반자동 워크플로우", href: "/docs/automation" },
  ];

  const templates = [
    { title: "카드뉴스 템플릿", desc: "Python 스크립트 — 내용만 바꾸면 7장 자동 생성", badge: "Python" },
    { title: "썸네일 생성기", desc: "블로그 대표 이미지 1200×630 자동 생성", badge: "Python" },
    { title: "프로필/커버 이미지", desc: "KiiK News 브랜드 이미지 세트", badge: "PNG" },
  ];

  return (
    <div>
      {/* 히어로 */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-center gap-3 mb-6">
            <span style={{ background: "var(--accent)", color: "white", fontSize: "0.72rem", fontWeight: 700, padding: "2px 10px", borderRadius: 4, letterSpacing: 1 }}>
              OPEN GUIDE
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ lineHeight: 1.15 }}>
            <span style={{ color: "var(--accent)" }}>KiiK News</span><br />블로그 운영 가이드
          </h1>
          <p className="text-lg mb-10" style={{ color: "var(--light)", maxWidth: 560, lineHeight: 1.75 }}>
            네이버 블로그 · 티스토리 · WordPress 개설부터 카드뉴스 자동 생성, 애드센스 수익화, 자동화 파이프라인까지 전 과정을 공개합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/docs" style={{ background: "var(--accent)", color: "white" }}
              className="px-6 py-3 rounded font-semibold text-sm hover:opacity-90 transition-opacity">
              가이드 시작하기 →
            </a>
            <a href="https://github.com/studioh2su/kiik-blog" target="_blank" rel="noopener noreferrer"
              style={{ border: "1px solid var(--border)", color: "var(--light)" }}
              className="px-6 py-3 rounded font-semibold text-sm hover:text-white transition-colors">
              GitHub 보기
            </a>
          </div>
        </div>
      </section>

      {/* 가이드 단계 */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">블로그 제작 과정</h2>
          <p className="text-sm mb-10" style={{ color: "var(--gray)" }}>처음부터 수익화까지 5단계</p>
          <div className="grid gap-4">
            {guides.map((g) => (
              <a key={g.step} href={g.href}
                style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                className="flex items-center gap-6 px-6 py-5 rounded-lg hover:border-red-700 transition-colors group">
                <span className="text-3xl font-bold shrink-0" style={{ color: "var(--accent)", fontFamily: "Impact, sans-serif", width: 48 }}>{g.step}</span>
                <div>
                  <div className="font-semibold mb-1 group-hover:text-white">{g.title}</div>
                  <div className="text-sm" style={{ color: "var(--gray)" }}>{g.desc}</div>
                </div>
                <span className="ml-auto" style={{ color: "var(--gray)" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 템플릿 */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">다운로드 가능한 템플릿</h2>
          <p className="text-sm mb-10" style={{ color: "var(--gray)" }}>바로 쓸 수 있는 카드뉴스 · 이미지 생성 스크립트</p>
          <div className="grid md:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div key={t.title}
                style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                className="px-6 py-6 rounded-lg">
                <span style={{ background: "var(--border)", color: "var(--light)", fontSize: "0.7rem", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                  {t.badge}
                </span>
                <div className="font-semibold mt-4 mb-2">{t.title}</div>
                <div className="text-sm" style={{ color: "var(--gray)" }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
