"""
KiiK News 카드뉴스 템플릿
사용법: 아래 CONTENT 부분만 수정하고 실행하면 카드가 자동 생성됩니다.
"""

from PIL import Image, ImageDraw, ImageFont
import os
from datetime import datetime

# ── 설정 ──────────────────────────────────────────
KOREAN = '/System/Library/Fonts/AppleSDGothicNeo.ttc'
IMPACT  = '/System/Library/Fonts/Supplemental/Impact.ttf'
W, H    = 1080, 1080

# 컬러 테마 (기본: 다크 레드)
THEME = {
    'bg':      '#0d1117',
    'accent':  '#CC1F1F',
    'white':   '#FFFFFF',
    'light':   '#CCCCCC',
    'gray':    '#888888',
    'card_bg': '#1a1a2e',
}

# ── 여기만 수정하세요 ──────────────────────────────
CONTENT = {
    # 출력 폴더명 (영문)
    'folder': 'worldcup',

    # 날짜 (비워두면 오늘 날짜 자동)
    'date': '',

    # 카드 1: 표지
    'cover': {
        'badge': '2026 FIFA WORLD CUP',   # 상단 빨간 배지 텍스트
        'title': ['한국 월드컵', '32강 탈락'],  # 메인 제목 (줄 나누기)
        'subtitle': '역대 최악의 성적',          # 부제목 (빨간색)
        'desc': '축구협회 무엇이 문제인가',       # 설명
    },

    # 카드 2: 핵심 수치
    'stat': {
        'label': '한국의 최종 순위',
        'number': '34',
        'unit': '위',
        'context': '48개국 중',
        'points': [
            '32강 진출조차 실패',
            '역대 최악의 월드컵 성적',
            '2002년 4강 신화는 옛말',
        ],
    },

    # 카드 3: 결과표 (매치 형식)
    'results': {
        'title': '조별리그 결과',
        'matches': [
            ('vs 포르투갈', '0 - 3'),
            ('vs 가나',     '1 - 2'),
            ('vs 우루과이', '0 - 1'),
        ],
        'summary': '3전 전패 · 1골 6실점',
    },

    # 카드 4~6: 원인/이슈 카드 (최대 3개)
    'causes': [
        {
            'num': '01',
            'title': ['감독 선임', '불공정 논란'],
            'points': [
                '"외국인 감독" 요구 묵살',
                '내부 세력 입김에 홍명보 선임',
                '대회 1년 전 급조 선임',
                '결국 3전 전패로 마무리',
            ],
        },
        {
            'num': '02',
            'title': ['정몽규 회장', '기득권 안주'],
            'points': [
                '클린스만 선임 논란 묵살',
                '승부조작 연루자 사면 시도',
                '투명성 없는 협회 운영',
                '여야 "해체 수준 쇄신" 요구',
            ],
        },
        {
            'num': '03',
            'title': ['유소년 육성', '시스템 부재'],
            'points': [
                '단기 성적 관리에만 집중',
                '체계적 유소년 투자 외면',
                '선수층 얇아지는 악순환',
                '2030 월드컵도 위험신호',
            ],
        },
    ],

    # 카드 7: 마무리
    'outro': {
        'title': '앞으로는?',
        'news': ['홍명보 감독 즉시 사퇴', '전세기 귀국편 취소'],
        'section': '전문가들이 말하는 해결책',
        'solutions': [
            '① 외국인 감독 선임 원칙화',
            '② 협회 투명성 법제화',
            '③ 유소년 투자 10년 플랜',
        ],
        'closing': '2030 월드컵, 다시 일어설 수 있을까?',
    },
}
# ── 여기까지 ───────────────────────────────────────


def setup_output():
    path = f"blog-assets/cards/{CONTENT['folder']}"
    os.makedirs(path, exist_ok=True)
    return path

def get_date():
    if CONTENT.get('date'):
        return CONTENT['date']
    return datetime.now().strftime('%Y.%m.%d')

def fonts():
    return {
        'tag':   ImageFont.truetype(IMPACT, 26),
        'num':   ImageFont.truetype(IMPACT, 160),
        'h1':    ImageFont.truetype(KOREAN, 80, index=0),
        'h2':    ImageFont.truetype(KOREAN, 60, index=0),
        'h3':    ImageFont.truetype(KOREAN, 48, index=0),
        'body':  ImageFont.truetype(KOREAN, 36, index=0),
        'small': ImageFont.truetype(KOREAN, 30, index=0),
        'brand': ImageFont.truetype(IMPACT, 28),
        'score': ImageFont.truetype(IMPACT, 52),
        'unit':  ImageFont.truetype(KOREAN, 60, index=0),
    }

def base_card(bg=None):
    img = Image.new('RGB', (W, H), bg or THEME['bg'])
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 10], fill=THEME['accent'])
    draw.rectangle([0, H-10, W, H], fill=THEME['accent'])
    draw.rectangle([0, 0, 8, H], fill=THEME['accent'])
    return img

def put(img, text, font, color, x, y):
    tmp = Image.new('RGBA', (W*2, 300), (0,0,0,0))
    ImageDraw.Draw(tmp).text((100, 50), text, fill=color, font=font)
    bb = tmp.getbbox()
    if not bb:
        return y
    cropped = tmp.crop(bb)
    base = img.convert('RGBA')
    base.paste(cropped, (x, y), cropped)
    img.paste(base.convert('RGB'))
    return y + font.getmetrics()[0] + font.getmetrics()[1] + 8

def brand(img, date):
    draw = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(IMPACT, 28)
    f2 = ImageFont.truetype(KOREAN, 24, index=0)
    draw.text((40, H-68), 'KiiK', fill=THEME['accent'], font=f1)
    kw = int(f1.getlength('KiiK'))
    draw.text((40+kw+4, H-64), 'News', fill=THEME['white'], font=f1)
    dw = int(f2.getlength(date))
    draw.text((W-dw-40, H-64), date, fill=THEME['gray'], font=f2)

def line(img, y, color='#333333'):
    ImageDraw.Draw(img).rectangle([40, y, W-40, y+4], fill=color)

def make_card1(F, date, out):
    c = CONTENT['cover']
    img = base_card()
    draw = ImageDraw.Draw(img)
    if c.get('badge'):
        bw = int(F['tag'].getlength(c['badge']))
        draw.rectangle([40, 120, 56+bw, 160], fill=THEME['accent'])
        put(img, c['badge'], F['tag'], THEME['white'], 52, 124)
    y = 185
    for t in c['title']:
        y = put(img, t, F['h1'], THEME['white'], 40, y) + 4
    y = put(img, c['subtitle'], F['h2'], THEME['accent'], 40, y+10)
    line(img, y+10)
    put(img, c.get('desc',''), F['body'], THEME['light'], 40, y+30)
    brand(img, date)
    img.save(f'{out}/card_01.png')

def make_card2(F, date, out):
    s = CONTENT['stat']
    img = base_card()
    put(img, s['label'], ImageFont.truetype(KOREAN,38,index=0), THEME['gray'], 40, 80)
    tmp = Image.new('RGBA', (600, 220), (0,0,0,0))
    ImageDraw.Draw(tmp).text((0,0), s['number'], fill=THEME['accent'], font=F['num'])
    bb = tmp.getbbox()
    num_img = tmp.crop(bb)
    img.paste(num_img, (40, 150), num_img)
    put(img, s['unit'], F['unit'], THEME['white'], 40+num_img.width+16, 150+num_img.height-80)
    put(img, s['context'], F['h2'], THEME['light'], 40, 390)
    line(img, 478)
    y = 498
    for p in s['points']:
        y = put(img, f'• {p}', F['body'], THEME['light'], 40, y) + 16
    brand(img, date)
    img.save(f'{out}/card_02.png')

def make_card3(F, date, out):
    r = CONTENT['results']
    img = base_card()
    put(img, r['title'], F['h2'], THEME['white'], 40, 80)
    ImageDraw.Draw(img).rectangle([40,168,W-40,172], fill=THEME['accent'])
    y = 194
    for team, score in r['matches']:
        ImageDraw.Draw(img).rectangle([40,y,W-40,y+118], fill=THEME['card_bg'])
        ImageDraw.Draw(img).rectangle([40,y,48,y+118], fill=THEME['accent'])
        put(img, team, F['h3'], THEME['light'], 70, y+28)
        sw = int(F['score'].getlength(score))
        put(img, score, F['score'], THEME['white'], W-sw-60, y+30)
        y += 134
    put(img, r['summary'], F['h3'], THEME['accent'], 40, y+20)
    brand(img, date)
    img.save(f'{out}/card_03.png')

def make_cause_card(F, date, out, cause, card_num):
    img = base_card()
    put(img, cause['num'], ImageFont.truetype(IMPACT,140), THEME['accent'], 40, 80)
    y = 260
    for t in cause['title']:
        y = put(img, t, F['h2'], THEME['white'], 40, y) + 4
    line(img, y+10)
    y += 36
    for p in cause['points']:
        ImageDraw.Draw(img).rectangle([40, y+10, 54, y+40], fill=THEME['accent'])
        y = put(img, p, F['body'], THEME['light'], 70, y) + 10
    brand(img, date)
    img.save(f'{out}/card_0{card_num}.png')

def make_card7(F, date, out):
    o = CONTENT['outro']
    img = base_card('#0a0f1a')
    y = put(img, o['title'], F['h2'], THEME['accent'], 40, 80)
    line(img, y+4)
    y += 20
    for n in o['news']:
        y = put(img, n, F['h3'], THEME['white'], 40, y) + 6
    line(img, y+10, '#222')
    y += 26
    y = put(img, o['section'], F['body'], THEME['gray'], 40, y)
    for s in o['solutions']:
        y = put(img, s, F['h3'], THEME['light'], 40, y) + 14
    ImageDraw.Draw(img).rectangle([40, H-148, W-40, H-144], fill=THEME['accent'])
    put(img, o['closing'], F['small'], THEME['gray'], 40, H-128)
    brand(img, date)
    card_num = 4 + len(CONTENT['causes'])
    img.save(f'{out}/card_0{card_num}.png')


if __name__ == '__main__':
    out  = setup_output()
    date = get_date()
    F    = fonts()

    make_card1(F, date, out)
    print('✓ 카드 1 (표지)')
    make_card2(F, date, out)
    print('✓ 카드 2 (수치)')
    make_card3(F, date, out)
    print('✓ 카드 3 (결과표)')
    for i, cause in enumerate(CONTENT['causes']):
        make_cause_card(F, date, out, cause, i+4)
        print(f'✓ 카드 {i+4} (원인 {cause["num"]})')
    make_card7(F, date, out)
    total = 4 + len(CONTENT['causes'])
    print(f'✓ 카드 {total} (마무리)')
    print(f'\n완료! → blog-assets/cards/{CONTENT["folder"]}/')
