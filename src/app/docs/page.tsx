const docs = [
  {
    step: "01",
    title: "블로그 채널 개설",
    desc: "네이버 블로그 · 티스토리 · WordPress 세팅 방법",
    href: "/docs/setup",
    tags: ["Naver", "Tistory", "WordPress"],
  },
  {
    step: "02",
    title: "SEO 전략",
    desc: "검색 상위 노출을 위한 키워드 · 구조 · 메타태그 최적화",
    href: "/docs/seo",
    tags: ["키워드", "메타태그", "내부링크"],
  },
  {
    step: "03",
    title: "카드뉴스 제작",
    desc: "Python 템플릿으로 1080×1080 카드 7장 자동 생성",
    href: "/docs/cardnews",
    tags: ["Python", "PIL", "템플릿"],
  },
  {
    step: "04",
    title: "광고 수익화",
    desc: "애드센스 · 애드포스트 · 애드핏 신청 및 최적화",
    href: "/docs/monetize",
    tags: ["AdSense", "AdPost", "AdFit"],
  },
  {
    step: "05",
    title: "자동화 파이프라인",
    desc: "트렌드 서치 → 글 생성 → 발행까지 반자동 워크플로우",
    href: "/docs/automation",
    tags: ["n8n", "자동화", "트렌드"],
  },
];

export default function DocsIndex() {
  return (
    <div>
      <div className="mb-2" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: 1 }}>
        GUIDE
      </div>
      <h1 className="text-3xl font-bold mb-3">블로그 운영 가이드</h1>
      <p className="mb-10" style={{ color: "var(--light)", lineHeight: 1.75 }}>
        KiiK News 블로그를 만들고 수익화한 전 과정을 단계별로 공개합니다.
        처음부터 따라하면 3개 채널 운영 + 광고 수익화까지 가능합니다.
      </p>
      <div className="grid gap-4">
        {docs.map((d) => (
          <a
            key={d.step}
            href={d.href}
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            className="flex items-start gap-6 px-6 py-5 rounded-lg hover:border-red-700 transition-colors group"
          >
            <span
              className="text-2xl font-bold shrink-0 mt-0.5"
              style={{ color: "var(--accent)", fontFamily: "Impact, sans-serif", width: 40 }}
            >
              {d.step}
            </span>
            <div className="flex-1">
              <div className="font-semibold mb-1 group-hover:text-white">{d.title}</div>
              <div className="text-sm mb-3" style={{ color: "var(--gray)" }}>{d.desc}</div>
              <div className="flex gap-2 flex-wrap">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ background: "var(--border)", color: "var(--light)", fontSize: "0.7rem", padding: "2px 8px", borderRadius: 4 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="mt-1 ml-auto" style={{ color: "var(--gray)" }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
