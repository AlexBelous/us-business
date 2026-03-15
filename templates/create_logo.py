from PIL import Image, ImageDraw, ImageFont
import math

W, H = 400, 460
img = Image.new('RGBA', (W, H), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

cx, cy_hex = W // 2, 190
r = 150
navy = (11, 37, 69)
accent = (62, 146, 204)

# Hexagon vertices
pts = []
for i in range(6):
    angle = math.radians(60 * i - 90)
    pts.append((cx + r * math.cos(angle), cy_hex + r * math.sin(angle)))

# Draw hexagon
for i in range(6):
    x1, y1 = pts[i]
    x2, y2 = pts[(i + 1) % 6]
    draw.line([(x1, y1), (x2, y2)], fill=navy, width=6)

# Baseline
base_y = cy_hex + 5
draw.line([(cx - 95, base_y), (cx + 95, base_y)], fill=(*navy, 40), width=1)

# Chromatogram - main peak
peak_points = []
steps = 100
for i in range(steps + 1):
    t = i / steps
    x = (cx - 95) + t * 190
    rel = (x - cx) / 95

    # Main peak centered at -0.2
    peak1 = 70 * math.exp(-((rel + 0.2) ** 2) / 0.03)
    # Secondary peak centered at +0.45
    peak2 = 35 * math.exp(-((rel - 0.45) ** 2) / 0.02)

    y = base_y - peak1 - peak2
    peak_points.append((x, y))

# Fill under peaks
fill_pts = [(cx - 95, base_y)] + peak_points + [(cx + 95, base_y)]
draw.polygon(fill_pts, fill=(*accent, 20))

# Draw chromatogram line
for i in range(len(peak_points) - 1):
    draw.line([peak_points[i], peak_points[i + 1]], fill=accent, width=5)

# DM text - moved up from hex bottom
try:
    font_dm = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 72)
except:
    font_dm = ImageFont.load_default()

bbox = draw.textbbox((0, 0), "DM", font=font_dm)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
# Position DM well above the bottom vertex, using cy_hex + offset
dm_y = cy_hex + 30
draw.text((cx - tw // 2, dm_y), "DM", fill=navy, font=font_dm)

# TRADE SOLUTIONS below hex
try:
    font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
except:
    font_sub = ImageFont.load_default()

text_sub = "TRADE SOLUTIONS"
bbox2 = draw.textbbox((0, 0), text_sub, font=font_sub)
tw2 = bbox2[2] - bbox2[0]
draw.text((cx - tw2 // 2, cy_hex + r + 30), text_sub, fill=accent, font=font_sub)

img.save("/home/claude/us-business/templates/logo.png", "PNG")

# Also create smaller version for invoice header
img_small = img.resize((160, 184), Image.LANCZOS)
img_small.save("/home/claude/us-business/templates/logo_small.png", "PNG")

print("Logo PNGs created")
