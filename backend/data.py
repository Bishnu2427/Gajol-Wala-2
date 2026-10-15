"""Static catalogue content for the landing page.

Swap this out for a real database / CMS later — the API shape stays the same.
Every product / hero / lookbook item has two images: the second one is revealed on hover.
"""

UNSPLASH = "https://images.unsplash.com/{id}?w={w}&q=80&auto=format&fit=crop"


def img(photo_id, w=1000):
    return UNSPLASH.format(id=photo_id, w=w)


HERO = {
    "eyebrow": "Autumn / Winter 2026",
    "intro": "Considered everyday clothing, made to be worn, repaired and worn again.",
    "images": [
        {"no": "01", "title": "Belted Trench", "alt": "Woman in a camel trench coat",
         "images": [img("photo-1539533018447-63fcce2678e3", 1200), img("photo-1483985988355-763728e1935b", 1200)]},
        {"no": "02", "title": "Camel Tailoring", "alt": "Man in a camel blazer", "tall": True,
         "images": [img("photo-1552374196-1ab2a1c593e8", 1400), img("photo-1593030761757-71fae45fa0e7", 1400)]},
        {"no": "03", "title": "Off-Duty Layers", "alt": "Man in a black jacket and bucket hat",
         "images": [img("photo-1578681994506-b8f463449011", 1200), img("photo-1564557287817-3785e38ec1f5", 1200)]},
    ],
}

MARQUEE = [
    "Free shipping over $150",
    "New season out now",
    "Made in small batches",
    "30-day returns",
]

SIZES = ["XS", "S", "M", "L", "XL"]

PRODUCTS = [
    {
        "id": 1, "slug": "essential-tee", "name": "Essential Tee", "price": 48,
        "meta": "White · Heather grey", "alt": "Man wearing a white tee",
        "images": [img("photo-1521572163474-6864f9cf17ab"), img("photo-1622445275463-afa2ab738c34")],
        "description": "A heavyweight 240gsm cotton tee with a relaxed shoulder and a collar that keeps its shape wash after wash.",
        "details": ["100% organic cotton", "Relaxed fit", "Garment dyed"],
        "sizes": SIZES,
    },
    {
        "id": 2, "slug": "crewneck-sweatshirt", "name": "Crewneck Sweatshirt", "price": 95,
        "meta": "Chalk · Dusty rose", "alt": "White crewneck sweatshirt",
        "images": [img("photo-1620799140408-edc6dcb6d633"), img("photo-1516826957135-700dedea698c")],
        "description": "Loopback fleece with a brushed interior, ribbed trims and a slightly boxy cut.",
        "details": ["Loopback cotton fleece", "Boxy fit", "Ribbed cuffs and hem"],
        "sizes": SIZES,
    },
    {
        "id": 3, "slug": "leather-biker-jacket", "name": "Leather Biker Jacket", "price": 420,
        "meta": "Black · Vegetable tanned", "alt": "Black leather biker jacket on a hanger",
        "images": [img("photo-1551028719-00167b16eac5"), img("photo-1520975954732-35dd22299614")],
        "description": "A classic biker in soft vegetable-tanned leather that softens and creases with every wear.",
        "details": ["Full-grain leather", "YKK metal zips", "Quilted lining"],
        "sizes": SIZES,
    },
    {
        "id": 4, "slug": "straight-denim", "name": "Straight Denim", "price": 135,
        "meta": "Indigo rinse · 2 washes", "alt": "Folded straight leg jeans",
        "images": [img("photo-1542272604-787c3835535d"), img("photo-1604176354204-9268737828e4")],
        "description": "A mid-rise straight leg in 13oz selvedge denim. Starts dark and fades to you.",
        "details": ["13oz selvedge denim", "Mid rise, straight leg", "Button fly"],
        "sizes": ["28", "30", "32", "34", "36"],
    },
    {
        "id": 5, "slug": "oversized-hoodie", "name": "Oversized Hoodie", "price": 110,
        "meta": "Sand · Heather grey", "alt": "Man in a sand coloured hoodie",
        "images": [img("photo-1564557287817-3785e38ec1f5"), img("photo-1556821840-3a63f95609a7")],
        "description": "A roomy hoodie with a double-layer hood and dropped shoulders, made for layering.",
        "details": ["Heavy cotton fleece", "Oversized fit", "Double-layer hood"],
        "sizes": SIZES,
    },
    {
        "id": 6, "slug": "oxford-shirt", "name": "Oxford Shirt", "price": 88,
        "meta": "Chambray · 3 colours", "alt": "Chambray shirt on a hanger",
        "images": [img("photo-1596755094514-f87e34085b2c"), img("photo-1602810318383-e386cc2a3ccf")],
        "description": "A soft oxford weave button-down that works tucked, untucked or open over a tee.",
        "details": ["100% cotton oxford", "Regular fit", "Button-down collar"],
        "sizes": SIZES,
    },
]

COLLECTIONS = [
    {"no": "01", "name": "Outerwear", "count": 12, "image": img("photo-1544022613-e87ca75a784a", 800)},
    {"no": "02", "name": "Essentials", "count": 18, "image": img("photo-1523381210434-271e8be1f52b", 800)},
    {"no": "03", "name": "Shirting", "count": 9, "image": img("photo-1596755094514-f87e34085b2c", 800)},
    {"no": "04", "name": "Denim", "count": 7, "image": img("photo-1604176354204-9268737828e4", 800)},
]

LOOKBOOK = {
    "eyebrow": "Lookbook — Chapter 04",
    "title": "Built for grey mornings.",
    "text": "Water-resistant shells, brushed wool and heavy knits. Shot on the coast in October.",
    "images": [
        {"alt": "Woman in an olive utility jacket",
         "images": [img("photo-1544022613-e87ca75a784a"), img("photo-1611312449408-fcece27cdbb7")]},
        {"alt": "Man in a black blazer",
         "images": [img("photo-1617127365659-c47fa864d8bc"), img("photo-1507679799987-c73779587ccf")]},
    ],
}
