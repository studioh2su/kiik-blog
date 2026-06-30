"""
KiiK News 트렌드 수집기
매주 실행해서 이번 주 콘텐츠 주제 후보를 뽑습니다.

사용법:
    pip3 install pytrends requests
    python3 templates/trend_collector.py

출력:
    - 터미널: 트렌드 리포트
    - assets/trends/latest.json: 사이트에서 읽는 JSON
"""

import json
import os
from datetime import datetime

try:
    from pytrends.request import TrendReq
    PYTRENDS_OK = True
except ImportError:
    PYTRENDS_OK = False

NICHE_KEYWORDS = {
    "AI·Tech":       ["AI", "ChatGPT", "반도체", "스마트폰", "앱"],
    "Economy":       ["주식", "비트코인", "부동산", "금리", "물가"],
    "Lifestyle":     ["건강", "다이어트", "여행", "맛집", "패션"],
    "Entertainment": ["아이돌", "드라마", "영화", "스포츠", "게임"],
}

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "../assets/trends/latest.json")


def fetch_realtime_trending(n: int = 20) -> list[str]:
    """구글 트렌드 실시간 급상승 (한국)"""
    if not PYTRENDS_OK:
        return []
    try:
        pytrends = TrendReq(hl="ko", tz=540)
        df = pytrends.realtime_trending_searches(pn="KR")
        titles = df["title"].tolist() if "title" in df.columns else []
        return titles[:n]
    except Exception as e:
        print(f"  ⚠️  실시간 트렌드 실패: {e}")
        return []


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


def suggest_titles(keyword: str) -> list[str]:
    year = datetime.now().year
    return [
        f"{year} {keyword} 총정리 — 꼭 알아야 할 것들",
        f'"{keyword}" 지금 왜 이슈인가? 원인 3가지',
        f"{keyword} 전망 분석 — 앞으로 어떻게 될까?",
    ]


def build_candidates(trending: list[str]) -> list[dict]:
    candidates = []
    for cat, keywords in NICHE_KEYWORDS.items():
        best_kw, best_score = None, -1
        for kw in keywords:
            score = 10 if kw in trending else 0
            if score > best_score:
                best_score, best_kw = score, kw
        if best_kw:
            candidates.append({
                "rank": len(candidates) + 1,
                "category": cat,
                "keyword": best_kw,
                "score": best_score,
                "titles": suggest_titles(best_kw),
            })
    return sorted(candidates, key=lambda x: -x["score"])


def save_json(trending: list[str], candidates: list[dict]):
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    data = {
        "generated_at": datetime.now().isoformat(),
        "date_label": datetime.now().strftime("%Y년 %m월 %d일"),
        "trending": trending,
        "candidates": candidates,
        "checklist": [
            "주제 1개 선정",
            "kiik_card_template.py CONTENT 수정",
            "python3 kiik_card_template.py 실행 (카드 7장)",
            "본문 초안 작성 (Claude 활용)",
            "네이버 블로그 + 티스토리 발행",
            "해시태그 10개 추가",
        ],
    }
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n  ✅ JSON 저장 완료: {OUTPUT_PATH}")


def main():
    print("=" * 55)
    print("  KiiK News 트렌드 리포트")
    print(f"  {datetime.now().strftime('%Y년 %m월 %d일 (%A)')}")
    print("=" * 55)

    print("\n📊 구글 트렌드 급상승 검색어 (한국)")
    trending = fetch_realtime_trending()
    if trending:
        for i, kw in enumerate(trending, 1):
            print(f"  {i:2}. {kw}")
    else:
        print("  (구글 트렌드 접근 불가 — 수동 확인)")
        print("  → https://trends.google.co.kr/trending?geo=KR")

    candidates = build_candidates(trending)

    print("\n" + "─" * 55)
    print("  📌 이번 주 추천 주제 후보")
    print("─" * 55)
    for c in candidates:
        print(f"\n  [{c['rank']}] {c['category']} — 키워드: {c['keyword']}")
        for title in c["titles"]:
            print(f"      • {title}")

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

    save_json(trending, candidates)

    print("\n" + "=" * 55)
    print("  다음 실행: 다음 주 월요일")
    print("=" * 55 + "\n")


if __name__ == "__main__":
    main()
