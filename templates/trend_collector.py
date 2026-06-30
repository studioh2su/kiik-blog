"""
KiiK News 트렌드 수집기
매주 실행해서 이번 주 콘텐츠 주제 후보를 뽑습니다.

사용법:
    pip install pytrends requests
    python3 templates/trend_collector.py
"""

from datetime import datetime

try:
    from pytrends.request import TrendReq
    PYTRENDS_OK = True
except ImportError:
    PYTRENDS_OK = False
    print("⚠️  pytrends 미설치. 설치: pip install pytrends\n")


# ───────────────────────────── 설정 ─────────────────────────────
CATEGORIES = [
    "AI·Tech",
    "Economy",
    "Lifestyle",
    "Entertainment",
]

NICHE_KEYWORDS = {
    "AI·Tech":       ["AI", "ChatGPT", "반도체", "스마트폰", "앱"],
    "Economy":       ["주식", "비트코인", "부동산", "금리", "물가"],
    "Lifestyle":     ["건강", "다이어트", "여행", "맛집", "패션"],
    "Entertainment": ["아이돌", "드라마", "영화", "스포츠", "게임"],
}


def fetch_trending(country: str = "south_korea", n: int = 20) -> list[str]:
    """구글 트렌드 급상승 검색어"""
    if not PYTRENDS_OK:
        return []
    pytrends = TrendReq(hl="ko", tz=540)
    df = pytrends.trending_searches(pn=country)
    return df[0].tolist()[:n]


def fetch_related(keyword: str, n: int = 5) -> list[str]:
    """특정 키워드의 연관 검색어"""
    if not PYTRENDS_OK:
        return []
    try:
        pytrends = TrendReq(hl="ko", tz=540)
        pytrends.build_payload([keyword], timeframe="now 7-d", geo="KR")
        related = pytrends.related_queries()
        top = related.get(keyword, {}).get("top")
        if top is not None and not top.empty:
            return top["query"].tolist()[:n]
    except Exception:
        pass
    return []


def score_topic(keyword: str, trending: list[str]) -> int:
    """주제 점수 계산 (트렌드에 있으면 +10, 카테고리별 키워드 포함 +5)"""
    score = 0
    if keyword in trending:
        score += 10
    for cat_keywords in NICHE_KEYWORDS.values():
        if any(k in keyword for k in cat_keywords):
            score += 5
            break
    return score


def suggest_titles(keyword: str) -> list[str]:
    """블로그 제목 후보 3개 생성"""
    year = datetime.now().year
    return [
        f"{year} {keyword} 총정리 — 꼭 알아야 할 것들",
        f'"{keyword}" 지금 왜 이슈인가? 원인 3가지',
        f"{keyword} 전망 분석 — 앞으로 어떻게 될까?",
    ]


def main():
    print("=" * 55)
    print("  KiiK News 트렌드 리포트")
    print(f"  {datetime.now().strftime('%Y년 %m월 %d일 (%A)')}")
    print("=" * 55)

    # 트렌드 수집
    print("\n📊 구글 트렌드 급상승 검색어 (한국)")
    trending = fetch_trending()
    if trending:
        for i, kw in enumerate(trending, 1):
            print(f"  {i:2}. {kw}")
    else:
        print("  (pytrends 미설치 — 수동으로 확인 필요)")
        print("  → trends.google.co.kr/trending?geo=KR")

    # 카테고리별 추천 주제
    print("\n" + "─" * 55)
    print("  📌 이번 주 추천 주제 후보")
    print("─" * 55)

    candidates = []
    for cat, keywords in NICHE_KEYWORDS.items():
        best_kw = None
        best_score = -1
        for kw in keywords:
            score = score_topic(kw, trending)
            if score > best_score:
                best_score = score
                best_kw = kw
        if best_kw:
            candidates.append((best_score, cat, best_kw))

    candidates.sort(reverse=True)
    for rank, (score, cat, kw) in enumerate(candidates, 1):
        print(f"\n  [{rank}] {cat} — 키워드: {kw}")
        for title in suggest_titles(kw):
            print(f"      • {title}")

    # 실행 체크리스트
    print("\n" + "─" * 55)
    print("  ✅ 이번 주 체크리스트")
    print("─" * 55)
    checklist = [
        "주제 1개 선정",
        "kiik_card_template.py CONTENT 수정",
        "python3 kiik_card_template.py 실행 (카드 7장)",
        "본문 초안 작성 (Claude 활용)",
        "네이버 블로그 + 티스토리 발행",
        "해시태그 10개 추가",
    ]
    for i, item in enumerate(checklist, 1):
        print(f"  {i}. [ ] {item}")

    print("\n" + "=" * 55)
    print("  다음 실행: 다음 주 월요일")
    print("=" * 55 + "\n")


if __name__ == "__main__":
    main()
