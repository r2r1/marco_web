"""
MARCO Brand Book — PDF Generator
Generates a premium dark-themed brand book using reportlab.
"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ─────────────────────────────────────────────
# FONTS — Arial (Cyrillic support, ships with Windows)
# ─────────────────────────────────────────────
FONTS_DIR = "C:/Windows/Fonts/"

def try_register(name, path):
    try:
        pdfmetrics.registerFont(TTFont(name, path))
        return True
    except Exception:
        return False

has_light   = try_register('Arial-Light',   FONTS_DIR + 'ARIALLGT.TTF')
has_regular = try_register('Arial',         FONTS_DIR + 'arial.ttf')
has_bold    = try_register('Arial-Bold',    FONTS_DIR + 'arialbd.ttf')
has_italic  = try_register('Arial-Italic',  FONTS_DIR + 'ariali.ttf')

F_LIGHT   = 'Arial-Light'   if has_light   else ('Arial' if has_regular else 'Helvetica')
F_REGULAR = 'Arial'          if has_regular else 'Helvetica'
F_BOLD    = 'Arial-Bold'     if has_bold    else 'Helvetica-Bold'
F_ITALIC  = 'Arial-Italic'   if has_italic  else 'Helvetica-Oblique'

# ─────────────────────────────────────────────
# COLOR PALETTE
# ─────────────────────────────────────────────
C_BG       = HexColor('#131b18')
C_SURFACE  = HexColor('#1C2522')
C_SURFACE2 = HexColor('#232E2A')
C_GOLD     = HexColor('#D4C4A8')
C_GOLD2    = HexColor('#E0D2B8')
C_TEXT     = HexColor('#F5F5F5')
C_MUTED    = HexColor('#9CA3A0')
C_FAINT    = HexColor('#6B7270')
C_BORDER   = HexColor('#1F2D29')
C_SUCCESS  = HexColor('#4ade80')
C_ERROR    = HexColor('#f87171')
C_WHITE    = HexColor('#FFFFFF')

W, H = A4  # 595.27 x 841.89 pt

OUTPUT = "C:/Users/grish/marco_web/MARCO_Brandbook.pdf"


# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────
def bg(c):
    """Fill page background."""
    c.setFillColor(C_BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def divider(c, y, x1=40*mm, x2=None, color=None, thickness=0.5):
    """Horizontal rule."""
    if x2 is None:
        x2 = W - 40*mm
    if color is None:
        color = C_BORDER
    c.setStrokeColor(color)
    c.setLineWidth(thickness)
    c.line(x1, y, x2, y)

def label(c, text, x, y, color=None, size=7, font=None, tracking=True):
    """Small uppercase tracking label."""
    if color is None:
        color = C_GOLD
    if font is None:
        font = F_REGULAR
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, text.upper())

def body_text(c, text, x, y, color=None, size=9.5, font=None, max_width=None):
    """Single line body text. Returns y after drawing."""
    if color is None:
        color = C_MUTED
    if font is None:
        font = F_REGULAR
    c.setFillColor(color)
    c.setFont(font, size)
    if max_width:
        # Simple word-wrap
        words = text.split()
        line = ""
        lines = []
        for w in words:
            test = (line + " " + w).strip()
            if c.stringWidth(test, font, size) <= max_width:
                line = test
            else:
                lines.append(line)
                line = w
        if line:
            lines.append(line)
        for ln in lines:
            c.drawString(x, y, ln)
            y -= size * 1.6
        return y
    else:
        c.drawString(x, y, text)
        return y - size * 1.6

def page_number(c, n):
    c.setFillColor(C_FAINT)
    c.setFont(F_REGULAR, 8)
    c.drawCentredString(W / 2, 20*mm, str(n))

def section_tag(c, text, x, y):
    """Gold small-cap section label."""
    label(c, text, x, y, color=C_GOLD, size=7)

def heading(c, text, x, y, size=28, font=None, color=None):
    """Section heading."""
    if font is None:
        font = F_LIGHT
    if color is None:
        color = C_TEXT
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, text)
    return y - size * 1.35

def color_swatch(c, x, y, w, h, hex_color, name, hex_label, role):
    """Draw a color swatch card."""
    fill = HexColor(hex_color)
    # Card background
    c.setFillColor(C_SURFACE)
    c.roundRect(x, y, w, h, 6, fill=1, stroke=0)
    # Swatch area (top 55% of card)
    swatch_h = h * 0.55
    c.setFillColor(fill)
    c.roundRect(x, y + h - swatch_h, w, swatch_h, 6, fill=1, stroke=0)
    # Fix bottom corners of swatch
    c.rect(x, y + h - swatch_h, w, swatch_h * 0.3, fill=1, stroke=0)
    # Text area
    text_y = y + h - swatch_h - 14
    c.setFillColor(C_TEXT)
    c.setFont(F_BOLD if has_bold else F_REGULAR, 8)
    c.drawString(x + 10, text_y, name)
    c.setFillColor(C_MUTED)
    c.setFont(F_REGULAR, 7.5)
    c.drawString(x + 10, text_y - 13, hex_label)
    c.setFillColor(C_FAINT)
    c.setFont(F_REGULAR, 7)
    c.drawString(x + 10, text_y - 24, role)


# ─────────────────────────────────────────────
# PAGE 1 — COVER
# ─────────────────────────────────────────────
def page_cover(c):
    c.showPage()
    bg(c)

    # Decorative corner lines (top-left)
    c.setStrokeColor(C_GOLD)
    c.setLineWidth(0.5)
    c.line(30*mm, H - 30*mm, 30*mm, H - 55*mm)
    c.line(30*mm, H - 30*mm, 55*mm, H - 30*mm)

    # Decorative corner lines (bottom-right)
    c.line(W - 30*mm, 30*mm, W - 30*mm, 55*mm)
    c.line(W - 30*mm, 30*mm, W - 55*mm, 30*mm)

    # Brand name — massive
    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 96)
    c.drawCentredString(W / 2, H / 2 + 30*mm, "MARCO")

    # Gold divider line
    line_y = H / 2 + 18*mm
    c.setStrokeColor(C_GOLD)
    c.setLineWidth(0.7)
    c.line(W/2 - 40*mm, line_y, W/2 + 40*mm, line_y)

    # Tagline
    c.setFillColor(C_GOLD)
    c.setFont(F_REGULAR, 11)
    c.drawCentredString(W / 2, H / 2 + 8*mm, "СОЗДАЕМ КОМФОРТНУЮ СРЕДУ")

    # Document label
    c.setFillColor(C_MUTED)
    c.setFont(F_REGULAR, 9)
    c.drawCentredString(W / 2, H / 2 - 4*mm, "Brand Guidelines 2025")

    # Bottom tagline
    c.setFillColor(C_FAINT)
    c.setFont(F_REGULAR, 8)
    c.drawCentredString(W / 2, 35*mm,
        "Конфиденциально · Для внутреннего и партнерского использования")


# ─────────────────────────────────────────────
# PAGE 2 — О БРЕНДЕ
# ─────────────────────────────────────────────
def page_about(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "01  —  О бренде", mx, y)
    y -= 10*mm

    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    # Heading
    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 38)
    c.drawString(mx, y, "Кто такие")
    y -= 12*mm
    c.setFillColor(C_GOLD)
    c.setFont(F_LIGHT, 38)
    c.drawString(mx, y, "MARCO?")
    y -= 16*mm

    # Mission block
    c.setFillColor(C_SURFACE)
    c.roundRect(mx, y - 42*mm, W - 2*mx, 42*mm, 8, fill=1, stroke=0)

    label(c, "Миссия", mx + 10*mm, y - 8*mm, color=C_GOLD, size=7.5)
    body_text(c,
        "Мы превращаем недвижимость в работающий актив — без стресса для собственника.",
        mx + 10*mm, y - 18*mm,
        color=C_TEXT, size=11, font=F_LIGHT,
        max_width=W - 2*mx - 20*mm)

    y -= 55*mm

    # Three pillars
    pillar_w = (W - 2*mx - 8*mm) / 3
    pillars = [
        ("Финансирование",
         "Инвестируем в подготовку объекта за свой счёт. Делим риски вместе с собственником."),
        ("Экспертиза",
         "Знаем рынок краткосрочной аренды. Подбираем решения под конкретный объект и локацию."),
        ("Управление",
         "Берём на себя операционку: арендаторов, обслуживание, отчётность. Вы получаете чистый доход."),
    ]
    for i, (title, desc) in enumerate(pillars):
        px = mx + i * (pillar_w + 4*mm)
        py = y

        c.setFillColor(C_SURFACE)
        c.roundRect(px, py - 50*mm, pillar_w, 50*mm, 6, fill=1, stroke=0)

        # Gold top accent
        c.setFillColor(C_GOLD)
        c.roundRect(px, py - 3*mm, pillar_w, 3*mm, 3, fill=1, stroke=0)

        c.setFillColor(C_TEXT)
        c.setFont(F_BOLD if has_bold else F_REGULAR, 9.5)
        c.drawString(px + 8, py - 14*mm, title)

        body_text(c, desc, px + 8, py - 24*mm,
                  color=C_MUTED, size=8.5, max_width=pillar_w - 10)

    y -= 65*mm

    # Positioning statement
    label(c, "Позиционирование", mx, y, color=C_GOLD, size=7.5)
    y -= 10*mm
    body_text(c,
        "MARCO — управляющая компания для собственников, которые хотят зарабатывать на "
        "посуточной и долгосрочной аренде, не занимаясь этим самостоятельно. Мы не просто "
        "подрядчик — мы партнёр, заинтересованный в росте доходности вашего объекта.",
        mx, y, color=C_MUTED, size=10, max_width=W - 2*mx)

    page_number(c, 2)


# ─────────────────────────────────────────────
# PAGE 3 — ЛОГОТИП
# ─────────────────────────────────────────────
def page_logo(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "02  —  Логотип", mx, y)
    y -= 10*mm
    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 34)
    c.drawString(mx, y, "Логотип")
    y -= 16*mm

    # ── Primary logo demo (dark bg)
    logo_card_w = (W - 2*mx - 8*mm) / 2
    logo_card_h = 52*mm

    # Dark version
    c.setFillColor(C_SURFACE)
    c.roundRect(mx, y - logo_card_h, logo_card_w, logo_card_h, 8, fill=1, stroke=0)
    label(c, "Основная версия — тёмный фон", mx + 6, y - 9*mm, color=C_FAINT, size=7)
    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 32)
    c.drawCentredString(mx + logo_card_w/2, y - logo_card_h/2 - 4, "MARCO")
    c.setFillColor(C_GOLD)
    c.setFont(F_REGULAR, 7.5)
    c.drawCentredString(mx + logo_card_w/2, y - logo_card_h/2 - 14, "СОЗДАЕМ КОМФОРТНУЮ СРЕДУ")

    # Light version
    lx = mx + logo_card_w + 8*mm
    c.setFillColor(HexColor('#F0ECE5'))
    c.roundRect(lx, y - logo_card_h, logo_card_w, logo_card_h, 8, fill=1, stroke=0)
    label(c, "Версия — светлый фон", lx + 6, y - 9*mm, color=C_FAINT, size=7)
    c.setFillColor(C_BG)
    c.setFont(F_LIGHT, 32)
    c.drawCentredString(lx + logo_card_w/2, y - logo_card_h/2 - 4, "MARCO")
    c.setFillColor(HexColor('#8B7355'))
    c.setFont(F_REGULAR, 7.5)
    c.drawCentredString(lx + logo_card_w/2, y - logo_card_h/2 - 14, "СОЗДАЕМ КОМФОРТНУЮ СРЕДУ")

    y -= logo_card_h + 14*mm

    # Rules
    label(c, "Правила использования", mx, y, color=C_GOLD, size=7.5)
    y -= 9*mm

    rules = [
        ("✓", "Используйте логотип на тёмном (#131b18) или светлом (#F0ECE5) фоне."),
        ("✓", "Минимальный охранный отступ — половина высоты буквы «M» со всех сторон."),
        ("✓", "Минимальный размер логотипа на печати — 25 мм по ширине."),
        ("✗", "Не изменяйте пропорции, цвета или начертание логотипа."),
        ("✗", "Не размещайте на пёстром или низкоконтрастном фоне."),
        ("✗", "Не добавляйте тени, обводки или градиенты."),
    ]
    for mark, rule in rules:
        is_ok = mark == "✓"
        c.setFillColor(C_SUCCESS if is_ok else C_ERROR)
        c.setFont(F_BOLD if has_bold else F_REGULAR, 9)
        c.drawString(mx, y, mark)
        body_text(c, rule, mx + 7*mm, y, color=C_MUTED, size=9, max_width=W - 2*mx - 7*mm)
        y -= 7*mm

    page_number(c, 3)


# ─────────────────────────────────────────────
# PAGE 4 — ЦВЕТОВАЯ ПАЛИТРА
# ─────────────────────────────────────────────
def page_colors(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "03  —  Цветовая палитра", mx, y)
    y -= 10*mm
    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 34)
    c.drawString(mx, y, "Цвета бренда")
    y -= 16*mm

    # Intro
    body_text(c,
        "Палитра MARCO строится на глубоком зелёно-чёрном фоне и тёплом золотом акценте. "
        "Минимум цветов — максимум характера.",
        mx, y, color=C_MUTED, size=10, max_width=W - 2*mx)
    y -= 20*mm

    # Primary swatches — row 1
    label(c, "Основные цвета", mx, y, color=C_GOLD, size=7.5)
    y -= 8*mm

    sw_w = (W - 2*mx - 12*mm) / 4
    sw_h = 52*mm
    primaries = [
        ('#131b18', 'BG Dark',     '#131B18', 'Основной фон'),
        ('#1C2522', 'Surface',     '#1C2522', 'Карточки, панели'),
        ('#232E2A', 'Surface Hover','#232E2A', 'Hover-состояние'),
        ('#D4C4A8', 'Gold Accent', '#D4C4A8', 'Акцент бренда'),
    ]
    for i, (hex_c, name, hex_l, role) in enumerate(primaries):
        color_swatch(c, mx + i*(sw_w+4*mm), y - sw_h, sw_w, sw_h, hex_c, name, hex_l, role)

    y -= sw_h + 12*mm

    # Typography colors — row 2
    label(c, "Типографика и состояния", mx, y, color=C_GOLD, size=7.5)
    y -= 8*mm

    sw2_w = (W - 2*mx - 20*mm) / 6
    secondaries = [
        ('#F5F5F5', 'Text',    '#F5F5F5', 'Основной текст'),
        ('#9CA3A0', 'Muted',   '#9CA3A0', 'Второй план'),
        ('#6B7270', 'Faint',   '#6B7270', 'Подписи, метки'),
        ('#E0D2B8', 'Gold+',   '#E0D2B8', 'Hover акцент'),
        ('#4ade80', 'Success', '#4ADE80', 'Успех, подтверждение'),
        ('#f87171', 'Error',   '#F87171', 'Ошибка, отказ'),
    ]
    sw2_h = 44*mm
    for i, (hex_c, name, hex_l, role) in enumerate(secondaries):
        color_swatch(c, mx + i*(sw2_w+4*mm), y - sw2_h, sw2_w, sw2_h, hex_c, name, hex_l, role)

    y -= sw2_h + 14*mm

    # Usage rule
    c.setFillColor(C_SURFACE)
    c.roundRect(mx, y - 22*mm, W - 2*mx, 22*mm, 6, fill=1, stroke=0)
    label(c, "Правило 80 / 20", mx + 10, y - 8*mm, color=C_GOLD, size=7.5)
    body_text(c,
        "80% пространства — тёмные поверхности (#131b18, #1C2522). "
        "20% — типографика и золотой акцент (#D4C4A8). "
        "Яркие цвета (успех/ошибка) — только для системных состояний.",
        mx + 10, y - 17*mm, color=C_MUTED, size=8.5, max_width=W - 2*mx - 16)

    page_number(c, 4)


# ─────────────────────────────────────────────
# PAGE 5 — ТИПОГРАФИКА
# ─────────────────────────────────────────────
def page_typography(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "04  —  Типографика", mx, y)
    y -= 10*mm
    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 34)
    c.drawString(mx, y, "Шрифт")
    y -= 16*mm

    # Font name card
    c.setFillColor(C_SURFACE)
    c.roundRect(mx, y - 28*mm, W - 2*mx, 28*mm, 8, fill=1, stroke=0)
    c.setFillColor(C_GOLD)
    c.setFont(F_LIGHT, 26)
    c.drawString(mx + 10*mm, y - 13*mm, "Inter")
    c.setFillColor(C_MUTED)
    c.setFont(F_REGULAR, 9)
    c.drawString(mx + 10*mm, y - 22*mm,
        "Google Fonts · Латиница и кириллица · OFL лицензия")
    y -= 38*mm

    # Scale
    label(c, "Масштаб заголовков", mx, y, color=C_GOLD, size=7.5)
    y -= 9*mm

    scale = [
        (F_LIGHT,   48, "H1 — Сдавайте квартиру дороже",       "48pt · Light 300"),
        (F_LIGHT,   32, "H2 — Инструменты роста капитала",      "32pt · Light 300"),
        (F_LIGHT,   22, "H3 — Комплексный ремонт",              "22pt · Light 300"),
        (F_REGULAR, 13, "Body — Финансируем подготовку объекта","13pt · Regular 400"),
        (F_REGULAR,  9, "LABEL · UPPERCASE · TRACKING",         "9pt · Regular · tracking 0.2em"),
    ]
    for font, size, sample, desc in scale:
        c.setFillColor(C_TEXT)
        c.setFont(font, size)
        c.drawString(mx, y, sample)
        y -= size * 0.45 + 3
        c.setFillColor(C_FAINT)
        c.setFont(F_REGULAR, 7.5)
        c.drawString(mx, y, desc)
        divider(c, y - 3, mx, W - mx, C_BORDER, 0.3)
        y -= 10*mm

    y -= 6*mm

    # Rules
    label(c, "Правила типографики", mx, y, color=C_GOLD, size=7.5)
    y -= 9*mm

    typo_rules = [
        "Заголовки — исключительно font-weight 300 (Light). Элегантность через лёгкость.",
        "Подзаголовки и тело — font-weight 400 (Regular). Читаемость в приоритете.",
        "Кнопки и метки — UPPERCASE + letter-spacing 0.15–0.24em. Создаёт ощущение люкса.",
        "Минимальный кегль для печатных материалов — 8pt. На экранах — 12px.",
        "Межстрочный интервал (leading) — 1.04 для крупных заголовков, 1.6 для body.",
    ]
    for rule in typo_rules:
        c.setFillColor(C_GOLD)
        c.setFont(F_REGULAR, 8)
        c.drawString(mx, y, "—")
        body_text(c, rule, mx + 8*mm, y, color=C_MUTED, size=9, max_width=W - 2*mx - 8*mm)
        y -= 8*mm

    page_number(c, 5)


# ─────────────────────────────────────────────
# PAGE 6 — ГОЛОС БРЕНДА
# ─────────────────────────────────────────────
def page_voice(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "05  —  Голос бренда", mx, y)
    y -= 10*mm
    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 34)
    c.drawString(mx, y, "Tone of Voice")
    y -= 16*mm

    body_text(c,
        "MARCO говорит языком партнёра, а не продавца. Спокойно, конкретно, с уважением к времени клиента.",
        mx, y, color=C_MUTED, size=10.5, max_width=W - 2*mx)
    y -= 18*mm

    # Traits grid
    traits = [
        ("Экспертный",
         "Мы знаем рынок. Говорим цифрами, фактами и реальными результатами, а не обещаниями."),
        ("Спокойный",
         "Никакого давления. Мы предлагаем решение, а решение принимает собственник."),
        ("Конкретный",
         "Никаких клише. «+45% к выручке» лучше, чем «значительно увеличим доходность»."),
        ("Партнёрский",
         "Мы вместе. Собственник знает всё о процессе. Прозрачность — наш стандарт."),
    ]

    trait_w = (W - 2*mx - 6*mm) / 2
    trait_h = 36*mm
    for i, (name, desc) in enumerate(traits):
        col = i % 2
        row = i // 2
        tx = mx + col * (trait_w + 6*mm)
        ty = y - row * (trait_h + 5*mm)

        c.setFillColor(C_SURFACE)
        c.roundRect(tx, ty - trait_h, trait_w, trait_h, 6, fill=1, stroke=0)
        # Gold left accent
        c.setFillColor(C_GOLD)
        c.roundRect(tx, ty - trait_h, 3, trait_h, 2, fill=1, stroke=0)

        c.setFillColor(C_TEXT)
        c.setFont(F_BOLD if has_bold else F_REGULAR, 10)
        c.drawString(tx + 12, ty - 12*mm, name)
        body_text(c, desc, tx + 12, ty - 21*mm,
                  color=C_MUTED, size=8.5, max_width=trait_w - 16)

    y -= 2 * (trait_h + 5*mm) + 14*mm

    # Do / Don't
    label(c, "Говорим так — не так", mx, y, color=C_GOLD, size=7.5)
    y -= 9*mm

    pairs = [
        ("«Рассчитаем рост доходности вашего объекта»",
         "«Мы сделаем вас богатыми!»"),
        ("«Финансируем ремонт — вы не вкладываете ничего»",
         "«Уникальное предложение на рынке!»"),
        ("«Свяжемся в течение 15 минут»",
         "«Скоро перезвоним»"),
    ]

    col_w = (W - 2*mx - 10*mm) / 2
    label(c, "✓  Используем", mx, y, color=C_SUCCESS, size=8)
    label(c, "✗  Избегаем", mx + col_w + 10*mm, y, color=C_ERROR, size=8)
    y -= 8*mm

    for good, bad in pairs:
        c.setFillColor(C_SURFACE)
        c.roundRect(mx, y - 14*mm, col_w, 14*mm, 4, fill=1, stroke=0)
        body_text(c, good, mx + 8, y - 9*mm, color=C_MUTED, size=8.5, max_width=col_w - 10)

        c.setFillColor(C_SURFACE)
        c.roundRect(mx + col_w + 10*mm, y - 14*mm, col_w, 14*mm, 4, fill=1, stroke=0)
        body_text(c, bad, mx + col_w + 10*mm + 8, y - 9*mm, color=C_FAINT, size=8.5, max_width=col_w - 10)
        y -= 18*mm

    page_number(c, 6)


# ─────────────────────────────────────────────
# PAGE 7 — УСЛУГИ
# ─────────────────────────────────────────────
def page_services(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "06  —  Услуги", mx, y)
    y -= 10*mm
    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 34)
    c.drawString(mx, y, "Продуктовая линейка")
    y -= 16*mm

    body_text(c,
        "Четыре ключевых направления — единая система роста доходности объекта.",
        mx, y, color=C_MUTED, size=10.5, max_width=W - 2*mx)
    y -= 18*mm

    services = [
        ("01", "Планировочные решения",
         "Аудит текущей планировки и сценариев проживания. "
         "Оптимизация площади под арендатора и долгий срок службы. "
         "Согласование решений под бюджет и целевую ставку аренды.",
         "Превращаем неликвид в востребованный формат."),
        ("02", "Комплексный ремонт",
         "Пошаговый план ремонта с прозрачной сметой. "
         "Подбор материалов по балансу цены и износостойкости. "
         "Технический контроль качества на каждом этапе.",
         "Строгое соблюдение сроков и стандартов качества MARCO."),
        ("03", "Комплектация и декор",
         "Сценарная меблировка под целевую аудиторию арендаторов. "
         "Комплектация техники, света и текстиля «под ключ». "
         "Подготовка объекта к съёмке и публикации объявлений.",
         "Создаём визуальный код объекта для премиальных фото."),
        ("04", "Доверительное управление",
         "Маркетинг объекта и отбор надёжных арендаторов. "
         "Контроль оплаты, отчётность и решение операционных задач. "
         "Поддержание состояния квартиры и предотвращение простоев.",
         "Получайте чистый доход ежемесячно."),
    ]

    svc_h = 46*mm
    for num, title, details, tagline in services:
        c.setFillColor(C_SURFACE)
        c.roundRect(mx, y - svc_h, W - 2*mx, svc_h, 6, fill=1, stroke=0)

        # Number
        c.setFillColor(C_GOLD)
        c.setFont(F_LIGHT, 22)
        c.drawString(mx + 10, y - 14*mm, num)

        # Title
        c.setFillColor(C_TEXT)
        c.setFont(F_LIGHT if has_light else F_REGULAR, 13)
        c.drawString(mx + 22*mm, y - 12*mm, title)

        # Tagline
        c.setFillColor(C_GOLD)
        c.setFont(F_ITALIC if has_italic else F_REGULAR, 8.5)
        c.drawString(mx + 22*mm, y - 20*mm, tagline)

        # Details
        body_text(c, details, mx + 22*mm, y - 29*mm,
                  color=C_MUTED, size=8.5, max_width=W - 2*mx - 24*mm)

        y -= svc_h + 5*mm

    page_number(c, 7)


# ─────────────────────────────────────────────
# PAGE 8 — КОНТАКТЫ
# ─────────────────────────────────────────────
def page_contacts(c):
    c.showPage()
    bg(c)

    mx = 35*mm
    y = H - 38*mm

    section_tag(c, "07  —  Контакты", mx, y)
    y -= 10*mm
    divider(c, y, mx, W - mx, C_BORDER)
    y -= 14*mm

    c.setFillColor(C_TEXT)
    c.setFont(F_LIGHT, 34)
    c.drawString(mx, y, "Контакты бренда")
    y -= 22*mm

    contacts = [
        ("Телефон",   "+7 (933) 179-73-33", "Для клиентов и партнёров"),
        ("Email",     "marco-kmv@yandex.ru", "Входящие запросы и сотрудничество"),
        ("Сайт",      "marco-kmv.ru",        "Основная точка присутствия"),
    ]
    card_h = 30*mm
    for label_text, value, note in contacts:
        c.setFillColor(C_SURFACE)
        c.roundRect(mx, y - card_h, W - 2*mx, card_h, 6, fill=1, stroke=0)
        label(c, label_text, mx + 10, y - 9*mm, color=C_GOLD, size=7.5)
        c.setFillColor(C_TEXT)
        c.setFont(F_LIGHT, 15)
        c.drawString(mx + 10, y - 18*mm, value)
        c.setFillColor(C_FAINT)
        c.setFont(F_REGULAR, 8)
        c.drawString(mx + 10, y - 26*mm, note)
        y -= card_h + 5*mm

    y -= 15*mm

    # Confidentiality note
    c.setFillColor(C_SURFACE2)
    c.roundRect(mx, y - 25*mm, W - 2*mx, 25*mm, 6, fill=1, stroke=0)
    label(c, "Использование материалов", mx + 10, y - 9*mm, color=C_GOLD, size=7.5)
    body_text(c,
        "Все элементы бренда MARCO (логотип, цвета, шрифты, тексты) являются "
        "собственностью компании. Использование в коммерческих целях без письменного "
        "разрешения запрещено. Партнёрам предоставляется брендпак по запросу.",
        mx + 10, y - 18*mm, color=C_MUTED, size=8.5, max_width=W - 2*mx - 14)

    y -= 45*mm

    # Back cover flourish
    c.setFillColor(C_GOLD)
    c.setFont(F_LIGHT, 48)
    c.drawCentredString(W / 2, y, "MARCO")
    c.setFillColor(C_FAINT)
    c.setFont(F_REGULAR, 8)
    c.drawCentredString(W / 2, y - 12*mm, "СОЗДАЕМ КОМФОРТНУЮ СРЕДУ  ·  BRAND GUIDELINES 2025")

    page_number(c, 8)


# ─────────────────────────────────────────────
# ASSEMBLE
# ─────────────────────────────────────────────
def build():
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle("MARCO — Brand Guidelines 2025")
    c.setAuthor("MARCO")
    c.setSubject("Brand Book")
    c.setCreator("MARCO Internal")

    page_cover(c)
    page_about(c)
    page_logo(c)
    page_colors(c)
    page_typography(c)
    page_voice(c)
    page_services(c)
    page_contacts(c)

    c.save()
    print(f"OK: {OUTPUT}")


if __name__ == "__main__":
    build()
