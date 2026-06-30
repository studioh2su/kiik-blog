import DocPage from "@/components/DocPage";

export const metadata = { title: "채널 개설 — KiiK News 가이드" };

const C = ({ children }: { children: React.ReactNode }) => (
  <code style={{ background: "var(--border)", color: "#e3b341", padding: "1px 6px", borderRadius: 4, fontSize: "0.85em" }}>{children}</code>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--card-bg)", borderLeft: "3px solid var(--accent)", padding: "12px 16px", borderRadius: "0 6px 6px 0", margin: "12px 0", fontSize: "0.9rem" }}>
    {children}
  </div>
);

export default function SetupPage() {
  return (
    <DocPage
      step="01"
      title="블로그 채널 개설"
      desc="수익화를 위한 3개 채널 — 네이버 블로그, 티스토리, WordPress를 개설하고 기본 세팅하는 방법입니다."
      tags={["Naver Blog", "Tistory", "WordPress", "AdSense"]}
      next={{ href: "/docs/seo", label: "SEO 전략" }}
      sections={[
        {
          title: "왜 3개 채널인가?",
          content: (
            <div className="flex flex-col gap-3">
              <p>각 플랫폼마다 광고 수익 경로가 다릅니다. 여러 채널을 운영하면 수익을 분산시키고 리스크를 줄일 수 있습니다.</p>
              <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ background: "var(--border)" }}>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>플랫폼</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>주요 광고</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>특징</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["네이버 블로그", "애드포스트", "국내 트래픽 최강, 검색 상위 유리"],
                      ["티스토리", "애드센스 + 애드핏", "구글 트래픽 + 애드센스 가능"],
                      ["WordPress", "애드센스 + Taboola", "글로벌 트래픽, 수익 최대화"],
                    ].map(([p, a, f]) => (
                      <tr key={p} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 600 }}>{p}</td>
                        <td style={{ padding: "10px 14px", color: "#e3b341" }}>{a}</td>
                        <td style={{ padding: "10px 14px", color: "var(--gray)" }}>{f}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ),
        },
        {
          title: "네이버 블로그 세팅",
          content: (
            <div className="flex flex-col gap-4">
              <p>네이버 블로그는 국내 검색 점유율 1위 플랫폼. 초기 노출이 빠르고 애드포스트 신청이 간편합니다.</p>
              <ol className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "blog.naver.com에서 블로그 개설 (카카오/네이버 계정)",
                  "블로그 관리 → 기본 설정 → 별명, 소개글, 프로필 이미지 설정",
                  "레이아웃·위젯 설정 → 사이드바 카테고리 위젯 추가",
                  "카테고리 설정 → AI·Tech / Economy / Lifestyle / Card News 4개 생성",
                  "프로필 이미지: 400×400px, 커버 이미지: 1600×400px (모바일 중앙 1000px 안전영역)",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ol>
              <Tip>
                💡 <strong>모바일 커버 이미지 주의</strong> — 네이버 모바일은 1600px 커버 이미지의 가운데 약 600~1050px 영역만 표시합니다. 텍스트는 반드시 이 범위 안에 배치하세요.
              </Tip>
            </div>
          ),
        },
        {
          title: "티스토리 세팅",
          content: (
            <div className="flex flex-col gap-4">
              <p>티스토리는 구글 애드센스 연동이 가능한 다음 카카오 블로그 플랫폼입니다.</p>
              <ol className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "tistory.com → 블로그 만들기 (카카오 계정 필요)",
                  "관리 → 블로그 → 블로그 이름, 설명, 프로필 이미지 설정",
                  "꾸미기 → 스킨 → 원하는 스킨 선택 (심플·가독성 좋은 것 추천)",
                  "사이드바 플러그인 불필요한 항목 제거 → 카테고리만 남기기",
                  "카테고리 4개 추가: AI·Tech / Economy / Lifestyle / 카드뉴스",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ol>
              <Tip>
                💡 <strong>애드센스 연결</strong> — 티스토리는 관리 → 수익 → 애드센스에서 구글 계정 연결만 하면 자동 광고가 삽입됩니다. 단, 승인까지 15~20개 포스팅이 필요합니다.
              </Tip>
            </div>
          ),
        },
        {
          title: "WordPress 세팅 (예정)",
          content: (
            <div className="flex flex-col gap-3">
              <p>글로벌 트래픽을 통한 영어 콘텐츠 수익화를 위해 WordPress를 운영합니다. 현재 서버 세팅 진행 중.</p>
              <ul className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "Railway 서버에 WordPress 설치",
                  "kiik.news 도메인 연결 (도메인 구매 후)",
                  "Yoast SEO 플러그인 설치",
                  "AdSense + Taboola 광고 코드 삽입",
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
