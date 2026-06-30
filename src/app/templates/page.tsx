export const metadata = { title: "템플릿 다운로드 — KiiK News" };

const templates = [
  {
    id: "card",
    badge: "Python",
    badgeColor: "#1A3A9E",
    title: "카드뉴스 템플릿",
    desc: "CONTENT 딕셔너리만 바꾸면 1080×1080 카드 7장이 자동 생성됩니다. 폰트, 브랜드 컬러, 레이아웃 모두 내장.",
    file: "kiik_card_template.py",
    href: "https://github.com/studioh2su/kiik-blog/blob/main/templates/kiik_card_template.py",
    specs: ["출력 크기: 1080×1080px", "카드 수: 7장 자동 생성", "폰트: AppleSDGothicNeo + Impact", "의존성: Pillow (pip install Pillow)"],
  },
  {
    id: "thumb",
    badge: "Python",
    badgeColor: "#1A3A9E",
    title: "썸네일 생성기",
    desc: "블로그 대표 이미지 1200×630px 자동 생성. 제목, 날짜, 카테고리를 인자로 넘기면 완성.",
    file: "kiik_thumbnail.py",
    href: "https://github.com/studioh2su/kiik-blog/blob/main/templates/",
    specs: ["출력 크기: 1200×630px (OG 표준)", "소셜 미디어 공유 최적화", "KiiK 브랜드 적용"],
    wip: true,
  },
  {
    id: "brand",
    badge: "PNG",
    badgeColor: "#333",
    title: "프로필 · 커버 이미지 세트",
    desc: "KiiK News 브랜드 이미지 — 네이버 블로그, 티스토리, 소셜 미디어에 바로 사용 가능.",
    file: "kiik_brand_assets.zip",
    href: "https://github.com/studioh2su/kiik-blog/tree/main/assets/images",
    specs: ["프로필: 400×400px", "커버: 1600×400px", "포맷: PNG 투명 배경"],
  },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-2" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: 1 }}>
        TEMPLATES
      </div>
      <h1 className="text-3xl font-bold mb-3">다운로드 가능한 템플릿</h1>
      <p className="mb-12" style={{ color: "var(--light)", lineHeight: 1.75, maxWidth: 560 }}>
        KiiK News 블로그 운영에 사용하는 스크립트와 이미지 파일을 공개합니다. GitHub에서 바로 다운로드하세요.
      </p>

      <div className="flex flex-col gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 10 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span style={{ background: t.badgeColor, color: "white", fontSize: "0.7rem", padding: "2px 10px", borderRadius: 4, fontWeight: 700 }}>
                    {t.badge}
                  </span>
                  {t.wip && (
                    <span style={{ background: "var(--border)", color: "var(--gray)", fontSize: "0.7rem", padding: "2px 10px", borderRadius: 4 }}>
                      준비 중
                    </span>
                  )}
                </div>
                {!t.wip && (
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "var(--accent)", color: "white", fontSize: "0.8rem", padding: "6px 16px", borderRadius: 6, fontWeight: 600, whiteSpace: "nowrap" }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    GitHub에서 보기 →
                  </a>
                )}
              </div>

              <h2 className="text-xl font-bold mb-2">{t.title}</h2>
              <p className="mb-5" style={{ color: "var(--light)", lineHeight: 1.7, fontSize: "0.9rem" }}>{t.desc}</p>

              <div className="flex flex-wrap gap-2">
                {t.specs.map((s) => (
                  <span key={s} style={{ background: "var(--border)", color: "var(--light)", fontSize: "0.75rem", padding: "3px 10px", borderRadius: 4 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", padding: "12px 24px" }}>
              <code style={{ color: "var(--gray)", fontSize: "0.8rem" }}>
                📁 templates/{t.file}
              </code>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
        <h3 className="font-bold mb-2">사용 방법</h3>
        <ol className="flex flex-col gap-2" style={{ paddingLeft: 20, color: "var(--light)", fontSize: "0.9rem" }}>
          <li>GitHub 레포에서 <code style={{ color: "#e3b341" }}>templates/</code> 폴더 다운로드</li>
          <li><code style={{ color: "#e3b341" }}>pip install Pillow</code> 설치</li>
          <li>스크립트 상단 CONTENT 딕셔너리 수정</li>
          <li><code style={{ color: "#e3b341" }}>python3 kiik_card_template.py</code> 실행</li>
          <li><code style={{ color: "#e3b341" }}>assets/cards/</code> 폴더에서 생성된 이미지 확인</li>
        </ol>
      </div>
    </div>
  );
}
