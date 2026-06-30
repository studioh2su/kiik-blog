import DocPage from "@/components/DocPage";

export const metadata = { title: "자동화 파이프라인 — KiiK News 가이드" };

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

export default function AutomationPage() {
  return (
    <DocPage
      step="05"
      title="자동화 파이프라인"
      desc="트렌드 서치 → 주제 선정 → 카드 생성 → 발행까지 반자동 워크플로우. 애드센스 정책 리스크를 최소화한 검토 기반 자동화입니다."
      tags={["n8n", "Python", "반자동", "트렌드 서치", "애드센스 안전"]}
      prev={{ href: "/docs/monetize", label: "광고 수익화" }}
      sections={[
        {
          title: "자동화 전략 — 왜 반자동인가",
          content: (
            <div className="flex flex-col gap-4">
              <p>완전 자동화는 애드센스 정책 위반 리스크가 있습니다. <strong>검토 후 발행</strong> 방식으로 리스크를 0에 가깝게 줄입니다.</p>
              <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ background: "var(--border)" }}>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>단계</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>자동 vs 수동</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["트렌드 수집", "자동", "Google Trends, 네이버 데이터랩 크롤링"],
                      ["주제 선정", "수동", "리스트 검토 후 선택 (5분)"],
                      ["카드 생성", "자동", "Python 템플릿 실행"],
                      ["본문 작성", "반자동", "AI 초안 → 검토·수정"],
                      ["발행", "수동", "최종 확인 후 포스팅"],
                    ].map(([step, type, work]) => (
                      <tr key={step} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 600 }}>{step}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <span style={{
                            background: type === "자동" ? "#1A3A9E" : type === "수동" ? "var(--border)" : "var(--accent)",
                            color: "white",
                            fontSize: "0.7rem",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontWeight: 600
                          }}>{type}</span>
                        </td>
                        <td style={{ padding: "10px 14px", color: "var(--gray)" }}>{work}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ),
        },
        {
          title: "트렌드 수집 스크립트",
          content: (
            <div className="flex flex-col gap-4">
              <p>매주 월요일 자동으로 이번 주 트렌드 키워드를 정리해서 리스트업합니다.</p>
              <Code>{`# trend_collector.py
import requests
from pytrends.request import TrendReq

pytrends = TrendReq(hl='ko', tz=540)

# 급상승 검색어 (한국)
trending = pytrends.trending_searches(pn='south_korea')
print("\\n=== 이번 주 트렌드 TOP 20 ===")
for i, row in trending.head(20).iterrows():
    print(f"{i+1}. {row[0]}")`}</Code>
              <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>설치: <code style={{ color: "#e3b341" }}>pip install pytrends</code></p>
            </div>
          ),
        },
        {
          title: "n8n 워크플로우 (예정)",
          content: (
            <div className="flex flex-col gap-4">
              <p>트래픽이 안정화되고 콘텐츠 패턴이 잡히면 n8n으로 전체 파이프라인을 연결합니다.</p>
              <div className="flex flex-col gap-3">
                {[
                  { node: "Cron Trigger", desc: "매주 월요일 09:00 실행" },
                  { node: "HTTP Request", desc: "Google Trends API 호출" },
                  { node: "Code Node", desc: "트렌드 파싱 + 주제 후보 5개 생성" },
                  { node: "Gmail / Slack", desc: "주제 리스트 알림 발송" },
                  { node: "Wait for Approval", desc: "Webhook 응답 대기 (수동 선택)" },
                  { node: "Python Script", desc: "카드뉴스 자동 생성" },
                  { node: "Naver Blog API", desc: "초안 임시저장" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "white", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1, background: "var(--card-bg)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 6 }}>
                      <span style={{ fontWeight: 600, color: "var(--accent)" }}>{item.node}</span>
                      <span style={{ color: "var(--gray)", marginLeft: 8, fontSize: "0.875rem" }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Tip>💡 n8n은 Railway에 Self-hosted로 배포하면 무료입니다. <strong>n8n Railway 배포</strong>는 별도 가이드 예정.</Tip>
            </div>
          ),
        },
        {
          title: "현재 반자동 루틴",
          content: (
            <div className="flex flex-col gap-3">
              <p>지금 당장 쓸 수 있는 주간 루틴 (총 소요시간: 약 2~3시간/주).</p>
              <ol className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "월요일: trend_collector.py 실행 → 주제 5개 리스트 확인",
                  "월요일: 주제 1개 선정 → CONTENT 딕셔너리 수정",
                  "화요일: python3 kiik_card_template.py → 카드 7장 생성",
                  "화요일: Claude에게 본문 초안 요청 → 검토·수정",
                  "수요일: 네이버 블로그 + 티스토리 동시 발행",
                  "목요일: 트래픽 확인 → 다음 주 주제 메모",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ol>
            </div>
          ),
        },
      ]}
    />
  );
}
