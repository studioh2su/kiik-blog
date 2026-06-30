import trendsData from "../../../assets/trends/latest.json";

export const metadata = { title: "이번 주 트렌드 — KiiK News" };

const catColor: Record<string, string> = {
  "Entertainment": "#CC1F1F",
  "Economy":       "#1A3A9E",
  "AI·Tech":       "#0e7a0d",
  "Lifestyle":     "#7a5c0e",
};

export default function TrendsPage() {
  const data = trendsData;
  const updatedAt = new Date(data.generated_at).toLocaleString("ko-KR", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* 헤더 */}
      <div className="mb-2" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: 1 }}>
        WEEKLY TRENDS
      </div>
      <h1 className="text-3xl font-bold mb-2">이번 주 트렌드</h1>
      <p className="text-sm mb-10" style={{ color: "var(--gray)" }}>
        업데이트: {updatedAt} &nbsp;·&nbsp;
        <code style={{ color: "var(--light)", background: "var(--border)", padding: "1px 6px", borderRadius: 3, fontSize: "0.8em" }}>
          python3 templates/trend_collector.py
        </code>
        으로 갱신
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 급상승 키워드 */}
        <section>
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
            📊 급상승 검색어
          </h2>
          {data.trending.length > 0 ? (
            <ol className="flex flex-col gap-1">
              {data.trending.map((kw, i) => (
                <li
                  key={kw}
                  style={{ background: i < 3 ? "var(--card-bg)" : "transparent", border: i < 3 ? "1px solid var(--border)" : "none", borderRadius: 6 }}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <span style={{
                    color: i < 3 ? "var(--accent)" : "var(--gray)",
                    fontWeight: 700,
                    fontSize: i < 3 ? "1rem" : "0.85rem",
                    width: 24,
                    textAlign: "right",
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: i < 3 ? "var(--white)" : "var(--light)" }}>{kw}</span>
                  {i < 3 && (
                    <span style={{ marginLeft: "auto", background: "var(--accent)", color: "white", fontSize: "0.65rem", padding: "1px 6px", borderRadius: 3 }}>
                      HOT
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <div style={{ color: "var(--gray)", fontSize: "0.9rem", padding: "16px", background: "var(--card-bg)", borderRadius: 6 }}>
              trend_collector.py를 실행하면 자동으로 채워집니다.
            </div>
          )}
        </section>

        {/* 추천 주제 후보 */}
        <section>
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
            📌 이번 주 콘텐츠 후보
          </h2>
          <div className="flex flex-col gap-4">
            {data.candidates.map((c) => (
              <div
                key={c.rank}
                style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}
              >
                <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
                  <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: "0.85rem", width: 20 }}>#{c.rank}</span>
                  <span style={{ background: catColor[c.category] ?? "var(--border)", color: "white", fontSize: "0.7rem", padding: "1px 8px", borderRadius: 3, fontWeight: 600 }}>
                    {c.category}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{c.keyword}</span>
                </div>
                <ul className="px-4 py-3 flex flex-col gap-1">
                  {c.titles.map((title, i) => (
                    <li key={i} style={{ fontSize: "0.82rem", color: "var(--light)", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--gray)", flexShrink: 0 }}>{i + 1}.</span>
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 체크리스트 */}
      <section className="mt-12">
        <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
          ✅ 이번 주 발행 체크리스트
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {data.checklist.map((item, i) => (
            <div
              key={i}
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)", padding: "12px 16px", borderRadius: 6, display: "flex", gap: 12, alignItems: "flex-start" }}
            >
              <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: "var(--light)", fontSize: "0.9rem" }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 갱신 방법 안내 */}
      <section className="mt-12 p-6 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
        <h3 className="font-bold mb-3">🔄 트렌드 데이터 갱신 방법</h3>
        <p className="text-sm mb-4" style={{ color: "var(--light)" }}>
          매주 월요일 아래 명령어를 실행하면 이 페이지가 자동으로 업데이트됩니다.
        </p>
        <div className="flex flex-col gap-2">
          {[
            "cd ~/Project/Claude/kiik-blog",
            "python3 templates/trend_collector.py",
            "git add assets/trends/latest.json && git commit -m 'chore: 트렌드 업데이트'",
            "npx vercel --prod",
          ].map((cmd, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span style={{ color: "var(--gray)", fontSize: "0.8rem", width: 20, textAlign: "right" }}>{i + 1}</span>
              <code style={{ background: "#0d1117", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: 4, fontSize: "0.82rem", color: "#e3b341", flex: 1 }}>
                {cmd}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
