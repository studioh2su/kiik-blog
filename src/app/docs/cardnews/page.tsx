import DocPage from "@/components/DocPage";

export const metadata = { title: "카드뉴스 제작 — KiiK News 가이드" };

const Code = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: "#0d1117", border: "1px solid var(--border)", borderRadius: 6, padding: "16px", fontSize: "0.82rem", overflowX: "auto", color: "#e3b341", lineHeight: 1.7 }}>
    <code>{children}</code>
  </pre>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--card-bg)", borderLeft: "3px solid var(--accent)", padding: "12px 16px", borderRadius: "0 6px 6px 0", margin: "12px 0", fontSize: "0.9rem" }}>
    {children}
  </div>
);

export default function CardNewsPage() {
  return (
    <DocPage
      step="03"
      title="카드뉴스 제작"
      desc="Python PIL 라이브러리로 1080×1080px 카드 7장을 자동 생성하는 템플릿 시스템입니다. CONTENT 딕셔너리만 바꾸면 됩니다."
      tags={["Python", "PIL", "1080×1080", "자동화", "KiiK 브랜딩"]}
      prev={{ href: "/docs/seo", label: "SEO 전략" }}
      next={{ href: "/docs/monetize", label: "광고 수익화" }}
      sections={[
        {
          title: "카드 구성 (7장)",
          content: (
            <div className="flex flex-col gap-3">
              <p>KiiK News 카드뉴스는 7장 구성을 표준으로 합니다. 이야기 흐름이 자연스럽고 스크롤을 유도합니다.</p>
              <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ background: "var(--border)" }}>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>카드</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>내용</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>역할</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["01", "커버 (제목 + 부제)", "CTR 결정 — 가장 중요"],
                      ["02", "핵심 통계/수치", "관심 유발"],
                      ["03", "전체 결과 요약", "큰 그림 제공"],
                      ["04-06", "원인/이유 3가지", "깊이 있는 분석"],
                      ["07", "결론 + 구독 유도", "행동 유발 (팔로우/공유)"],
                    ].map(([card, content, role]) => (
                      <tr key={card} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 700, color: "var(--accent)" }}>{card}</td>
                        <td style={{ padding: "10px 14px" }}>{content}</td>
                        <td style={{ padding: "10px 14px", color: "var(--gray)" }}>{role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ),
        },
        {
          title: "필요한 폰트",
          content: (
            <div className="flex flex-col gap-3">
              <p>맥 기본 폰트를 사용합니다. 한글은 AppleSDGothicNeo, 영문 강조는 Impact + Arial Narrow Bold.</p>
              <ul className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "/System/Library/Fonts/AppleSDGothicNeo.ttc — 한글 본문/제목",
                  "/Library/Fonts/Impact.ttf — 영문 숫자 강조 (대형 숫자)",
                  "/Library/Fonts/Arial Narrow Bold.ttf — 영문 서브헤드",
                ].map((f, i) => (
                  <li key={i} style={{ color: "var(--light)", fontFamily: "monospace", fontSize: "0.85rem" }}>{f}</li>
                ))}
              </ul>
              <Tip>💡 윈도우에서는 malgun.ttf (맑은 고딕) 으로 AppleSDGothicNeo를 대체하세요.</Tip>
            </div>
          ),
        },
        {
          title: "템플릿 사용법",
          content: (
            <div className="flex flex-col gap-4">
              <p>
                <code style={{ background: "var(--border)", color: "#e3b341", padding: "1px 6px", borderRadius: 4, fontSize: "0.85em" }}>templates/kiik_card_template.py</code>를 복사해서 상단 CONTENT 딕셔너리만 수정하세요.
              </p>
              <Code>{`CONTENT = {
    "folder": "worldcup",          # 저장 폴더명
    "topic": "2026 월드컵 순위",    # 전체 주제
    "cover": {
        "title": "2026 FIFA",
        "subtitle": "월드컵 최종 순위",
        "label": "한국은 몇 위?",
    },
    "stat": {
        "number": "34",            # 큰 숫자
        "unit": "위",
        "desc": "한국의 FIFA 랭킹",
        "sub": "48개국 중 34번째 진출",
    },
    # ... 나머지 카드 내용
}`}</Code>
              <p>실행:</p>
              <Code>python3 templates/kiik_card_template.py</Code>
              <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>
                → <code style={{ background: "var(--border)", color: "#e3b341", padding: "1px 5px", borderRadius: 3, fontSize: "0.85em" }}>assets/cards/worldcup/card_01.png</code> ~ <code style={{ background: "var(--border)", color: "#e3b341", padding: "1px 5px", borderRadius: 3, fontSize: "0.85em" }}>card_07.png</code> 자동 생성
              </p>
            </div>
          ),
        },
        {
          title: "KiiK 브랜딩 규칙",
          content: (
            <div className="flex flex-col gap-3">
              <p>모든 카드는 KiiK News 브랜드 컬러와 레이아웃을 따릅니다.</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { color: "#0d1117", label: "배경 #0d1117" },
                  { color: "#CC1F1F", label: "레드 #CC1F1F" },
                  { color: "#1A3A9E", label: "블루 #1A3A9E" },
                  { color: "#ffffff", label: "화이트 #ffffff" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: c.color, border: "1px solid var(--border)" }} />
                    <span style={{ fontSize: "0.8rem", color: "var(--light)" }}>{c.label}</span>
                  </div>
                ))}
              </div>
              <ul className="flex flex-col gap-2 mt-2" style={{ paddingLeft: 20 }}>
                {[
                  "상단 브랜드바: 레드 배경 (#CC1F1F), KiiK News 로고",
                  "커버 제목: Impact 폰트 + Arial Narrow Bold 조합",
                  "한글 텍스트: AppleSDGothicNeo Bold",
                  "하단 여백: 60px (브랜드바 가려지지 않게)",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ul>
            </div>
          ),
        },
      ]}
    />
  );
}
