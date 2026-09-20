from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"

head = (SRC / "partials/head.html").read_text(encoding="utf-8")
global_before = (SRC / "partials/global-before-pages.html").read_text(encoding="utf-8")
after = (SRC / "partials/after-pages.html").read_text(encoding="utf-8")

page_ids = [
    "page-home", "page-products", "page-services", "page-request",
    "page-portfolio", "page-blog", "page-support", "page-dashboard"
]
pages = "\n".join(
    (SRC / "pages" / f"{page_id}.html").read_text(encoding="utf-8")
    for page_id in page_ids
)

# Classic scripts are intentionally loaded in dependency order.
# Keeping them non-module preserves the existing inline onclick handlers.
script_files = [
    "js/modules/core/navigation.js",
    "js/modules/ui/feedback.js",
    "js/modules/pages/products.js",
    "js/modules/pages/services.js",
    "js/modules/pages/dashboard.js",
    "js/modules/forms/forms.js",
    "js/modules/effects/scroll.js",
    "js/modules/effects/counters.js",
    "js/modules/effects/particles.js",
    "js/modules/effects/cursor.js",
    "js/modules/effects/typing.js",
    "js/modules/effects/navbar.js",
    "js/modules/effects/loading.js",
    "js/modules/effects/tilt.js",
    "js/modules/effects/spotlight.js",
    "js/modules/effects/confetti.js",
    "js/app.js",
]
scripts = "\n".join(
    f'    <script src="src/{path}"></script>' for path in script_files
)

html = (
    "<!DOCTYPE html>\n"
    "<html lang=\"ar\" dir=\"rtl\">\n"
    + head + "\n<body class=\"bg-darker\">"
    + global_before + pages + after
    + scripts + "\n</body>\n</html>\n"
)

(ROOT / "index.html").write_text(html, encoding="utf-8")
print("Built index.html")
