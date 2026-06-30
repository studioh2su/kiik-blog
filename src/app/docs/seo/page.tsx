import DocPage from "@/components/DocPage";

export const metadata = { title: "SEO 전략 — KiiK News 가이드" };

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--card-bg)", borderLeft: "3px solid var(--accent)", padding: "12px 16px", borderRadius: "0 6px 6px 0", margin: "12px 0", fontSize: "0.9rem" }}>
    {children}
  </div>
);

const Badge = ({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) => (
  <span style={{ background: color, color: "white", fontSize: "0.7rem", padding: "2px 8px", borderRadius: 4, fontWeight: 600, marginRight: 6 }}>{children}</span>
);

export default function SeoPage() {
  return (
    <DocPage
      step="02"
      title="SEO 전략"
      desc="검색 상위 노출을 위한 키워드 선정, 포스팅 구조, 메타태그 최적화 방법입니다."
      tags={["키워드 리서치", "제목 최적화", "내부링크", "이미지 SEO"]}
      prev={{ href: "/docs/setup", label: "채널 개설" }}
      next={{ href: "/docs/cardnews", label: "카드뉴스 제작" }}
      sections={[
        {
          title: "트렌드 기반 키워드 선정",
          content: (
            <div className="flex flex-col gap-4">
              <p>검색량은 많지만 경쟁이 낮은 키워드를 찾는 것이 핵심입니다. 트렌딩 이슈를 빠르게 선점하면 초기 노출이 쉽습니다.</p>
              <div className="flex flex-col gap-3">
                {[
                  { tool: "Google Trends", usage: "실시간 급상승 검색어, 지역별 관심도 확인" },
                  { tool: "네이버 데이터랩", usage: "국내 검색 트렌드, 연령대별 관심도" },
                  { tool: "네이버 자동완성", usage: "검색창에 키워드 입력 시 나오는 연관어 활용" },
                  { tool: "YouTube 급상승 영상", usage: "콘텐츠 주제 레퍼런스 + 조회수 검증" },
                ].map((item) => (
                  <div key={item.tool} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", padding: "12px 16px", borderRadius: 6 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.tool}</div>
                    <div style={{ color: "var(--gray)", fontSize: "0.875rem" }}>{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: "포스팅 제목 공식",
          content: (
            <div className="flex flex-col gap-4">
              <p>제목은 CTR(클릭률)을 결정하는 가장 중요한 요소입니다. 아래 공식을 활용하세요.</p>
              {[
                { type: "숫자형", example: '"2026년 축구 월드컵 순위 TOP 10 — 한국은 몇 위?"', desc: "숫자는 구체성을 높여 CTR 상승" },
                { type: "의문형", example: '"비트코인 다시 오를까? 전문가 5인의 분석"', desc: "궁금증 유발, 체류 시간 증가" },
                { type: "정보형", example: '"2026 소득세 개편 총정리 — 달라지는 것들"', desc: "검색 의도와 정확히 일치" },
              ].map((item) => (
                <div key={item.type} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", padding: "14px 16px", borderRadius: 6 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{item.type}</Badge>
                    <span style={{ fontSize: "0.8rem", color: "var(--gray)" }}>{item.desc}</span>
                  </div>
                  <div style={{ color: "#e3b341", fontSize: "0.9rem" }}>{item.example}</div>
                </div>
              ))}
              <Tip>💡 제목에 핵심 키워드를 앞쪽에 배치하세요. 네이버·구글 모두 앞 15자를 가장 중요하게 봅니다.</Tip>
            </div>
          ),
        },
        {
          title: "포스팅 구조 (네이버 블로그 기준)",
          content: (
            <div className="flex flex-col gap-3">
              <p>네이버는 체류시간과 스크롤 깊이를 기반으로 품질을 평가합니다.</p>
              <ol className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "도입부 (2-3문장) — 키워드 포함, 핵심 내용 예고",
                  "카드뉴스 이미지 삽입 (7장) — 시각적 체류시간 증가",
                  "본문 설명 (500자 이상) — 소제목 3개 이상",
                  "관련 포스팅 내부링크 — 같은 카테고리 글 연결",
                  "해시태그 10개 — #키워드 형식으로 마지막에 배치",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ol>
            </div>
          ),
        },
        {
          title: "이미지 SEO",
          content: (
            <div className="flex flex-col gap-3">
              <p>이미지 파일명과 alt 텍스트는 검색엔진이 콘텐츠를 파악하는 중요한 신호입니다.</p>
              <ul className="flex flex-col gap-2" style={{ paddingLeft: 20 }}>
                {[
                  "파일명: 영문 키워드 사용 (worldcup-ranking-2026.png)",
                  "alt 텍스트: 이미지 내용을 한 문장으로 설명",
                  "썸네일: 1200×630px (OG 이미지 표준 비율)",
                  "카드뉴스: 1080×1080px, 첫 장에 핵심 키워드 포함",
                ].map((item, i) => (
                  <li key={i} style={{ color: "var(--light)" }}>{item}</li>
                ))}
              </ul>
              <Tip>💡 카드뉴스 첫 번째 이미지는 항상 포스팅 썸네일로 설정하세요. 시각적 임팩트가 있는 첫 장이 SNS 공유 시 노출됩니다.</Tip>
            </div>
          ),
        },
      ]}
    />
  );
}
