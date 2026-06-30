import DocPage from "@/components/DocPage";

export const metadata = { title: "광고 수익화 — KiiK News 가이드" };

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--card-bg)", borderLeft: "3px solid var(--accent)", padding: "12px 16px", borderRadius: "0 6px 6px 0", margin: "12px 0", fontSize: "0.9rem" }}>
    {children}
  </div>
);

export default function MonetizePage() {
  return (
    <DocPage
      step="04"
      title="광고 수익화"
      desc="애드센스, 네이버 애드포스트, 카카오 애드핏, Taboola — 4개 광고 네트워크 신청 조건과 최적화 방법입니다."
      tags={["AdSense", "AdPost", "AdFit", "Taboola", "수익화"]}
      prev={{ href: "/docs/cardnews", label: "카드뉴스 제작" }}
      next={{ href: "/docs/automation", label: "자동화 파이프라인" }}
      sections={[
        {
          title: "광고 네트워크 비교",
          content: (
            <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "var(--border)" }}>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>광고</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>플랫폼</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>신청 조건</th>
                    <th style={{ padding: "10px 14px", textAlign: "left" }}>특징</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Google AdSense", "티스토리·WordPress", "6개월+ 운영, 15~20편+", "수익 최고, 승인 까다로움"],
                    ["네이버 애드포스트", "네이버 블로그", "1개월+ 운영, 10편+", "국내 트래픽에 최적"],
                    ["카카오 애드핏", "티스토리·WordPress", "별도 사이트 필요", "국내 모바일 강세"],
                    ["Taboola", "WordPress", "월 50만 PV 이상", "글로벌, 콘텐츠 추천형"],
                  ].map(([ad, platform, cond, feat]) => (
                    <tr key={ad} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600, color: "var(--accent)" }}>{ad}</td>
                      <td style={{ padding: "10px 14px" }}>{platform}</td>
                      <td style={{ padding: "10px 14px", color: "var(--gray)" }}>{cond}</td>
                      <td style={{ padding: "10px 14px", color: "var(--light)" }}>{feat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          title: "신청 로드맵",
          content: (
            <div className="flex flex-col gap-4">
              <p>포스팅 수가 쌓일수록 신청 가능한 광고가 늘어납니다.</p>
              {[
                { phase: "1단계 (Day 1~30)", desc: "네이버 애드포스트 신청", detail: "네이버 블로그 10편 이상 → 블로그 관리 → 수익 → 애드포스트 신청", color: "#1A3A9E" },
                { phase: "2단계 (Day 30~60)", desc: "카카오 애드핏 신청", detail: "adfit.kakao.com → 사이트 등록 → 코드 삽입 (티스토리 HTML 편집)", color: "#CC1F1F" },
                { phase: "3단계 (Day 60~90)", desc: "구글 애드센스 신청", detail: "15~20편 이상 양질의 포스팅 → adsense.google.com → 사이트 등록 → 코드 삽입 → 승인 대기", color: "#CC1F1F" },
                { phase: "4단계 (이후)", desc: "Taboola 신청", detail: "WordPress 트래픽 증가 후 → taboola.com/publishers → 파트너십 신청", color: "var(--gray)" },
              ].map((item) => (
                <div key={item.phase} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", padding: "14px 16px", borderRadius: 6 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ background: item.color, color: "white", fontSize: "0.7rem", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{item.phase}</span>
                    <span style={{ fontWeight: 600 }}>{item.desc}</span>
                  </div>
                  <div style={{ color: "var(--gray)", fontSize: "0.875rem" }}>{item.detail}</div>
                </div>
              ))}
              <Tip>💡 애드센스 승인 핵심은 <strong>오리지널 콘텐츠 + 개인정보처리방침 페이지 + 명확한 카테고리 구분</strong>입니다. 카드뉴스 포맷은 오리지널 이미지가 많아 승인률이 높습니다.</Tip>
            </div>
          ),
        },
        {
          title: "광고 위치 최적화",
          content: (
            <div className="flex flex-col gap-3">
              <p>광고 위치에 따라 클릭률(CTR)이 크게 달라집니다.</p>
              <ul className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "본문 상단 광고 — 뷰포트 내 즉시 노출, CTR 최고",
                  "카드뉴스 이미지 사이 광고 — 스크롤 중 자연스럽게 노출",
                  "본문 하단 광고 — 읽고 나서 클릭 의향 높음",
                  "사이드바 광고 — 모바일에선 비효율, 데스크톱 전용",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ul>
              <Tip>⚠️ <strong>애드센스 정책 주의</strong> — 클릭 유도, 광고 밀집 배치(1뷰포트 3개 이상), 자동 생성 콘텐츠 과다는 계정 정지 사유입니다. 초기에는 보수적으로 운영하고 트래픽이 충분히 쌓인 뒤 최적화하세요.</Tip>
            </div>
          ),
        },
      ]}
    />
  );
}
