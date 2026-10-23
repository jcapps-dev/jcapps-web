import base64, pathlib, sys
FONTS = pathlib.Path(__file__).resolve().parent.parent / 'fonts'
OUT = pathlib.Path(sys.argv[1])
def b64(name): return base64.b64encode((FONTS / name).read_bytes()).decode()
FONT_CSS = f"""<style>
    @font-face {{ font-family: 'Plex Mono'; font-weight: 500; src: url(data:font/woff2;base64,{b64('ibm-plex-mono-500.woff2')}) format('woff2'); }}
    @font-face {{ font-family: 'Plex Sans'; font-weight: 400; src: url(data:font/woff2;base64,{b64('ibm-plex-sans-400.woff2')}) format('woff2'); }}
    .mark {{ font-family: 'Plex Mono', ui-monospace, monospace; font-weight: 500; }}
    .tag  {{ font-family: 'Plex Sans', system-ui, sans-serif; font-weight: 400; }}
  </style>"""

def tile(x, y, s, outline=None):
    # Terminal-Zeichen ">_" — Proportionen wie im Org-Avatar
    k = s / 220
    o = f' stroke="{outline}" stroke-width="{2*k:.1f}"' if outline else ''
    return (f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="#111110"{o}/>\n'
            f'  <path d="M{x+68.75*k:.2f},{y+68.75*k:.2f} L{x+114.8*k:.2f},{y+110*k:.2f} L{x+68.75*k:.2f},{y+151.25*k:.2f}" fill="none" stroke="#99f6e4" stroke-width="{20.6*k:.2f}" stroke-linecap="round" stroke-linejoin="round"/>\n'
            f'  <rect x="{x+137.5*k:.2f}" y="{y+132.7*k:.2f}" width="{50.2*k:.2f}" height="{22.7*k:.2f}" fill="#99f6e4"/>')

def banner(dark):
    fg, sub = ('#F5F5F4', '#A8A29E') if dark else ('#111110', '#57534E')
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 240" width="880" height="240">
  {FONT_CSS}
  {tile(10, 10, 220, '#2DD4BF' if dark else None)}
  <text class="mark" x="272" y="124" font-size="92" letter-spacing="-1" fill="{fg}">jcapps</text>
  <text class="tag" x="276" y="176" font-size="27" fill="{sub}">Self-hosted tools, no database required.</text>
</svg>
"""

def social():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640" width="1280" height="640">
  {FONT_CSS}
  <rect width="1280" height="640" fill="#FFFFFF"/>
  {tile(120, 190, 260)}
  <text class="mark" x="440" y="306" font-size="104" letter-spacing="-1" fill="#111110">jcapps</text>
  <text class="tag" x="444" y="372" font-size="34" fill="#57534E">Self-hosted tools, no database required.</text>
  <text class="mark" x="444" y="430" font-size="26" fill="#0F766E">jcapps.dev</text>
</svg>
"""

(OUT / 'readme-banner-light.svg').write_text(banner(False))
(OUT / 'readme-banner-dark.svg').write_text(banner(True))
(OUT / 'social-preview.svg').write_text(social())
print('ok')
