// Catálogo ATLAS. Precios en COP. Textos: "Descripcion de productos.docx" (ES) y su traducción (EN).
// Beneficios e ingredientes: etiquetas de cada frasco (ver `terms` en lib/content.ts para su traducción).
export type Line = "face" | "body" | "hair" | "tempo";
export type Bilingual = { es: string; en: string };

export interface Product {
  slug: string;
  line: Line;
  code: string;
  name: string;
  sub: Bilingual;
  moment: Bilingual;
  desc: Bilingual;
  benefits: string[];
  ingredients: string[];
  /** Archivo en /public/img */
  img: string;
  /** COP */
  price: number;
  /** Los tres productos Body comparten una sola foto. */
  group?: "body";
}

export const LINES: Line[] = ["face", "body", "hair", "tempo"];

export const LINE_INFO: Record<Line, { label: string; img: string }> = {
  face: { label: "Face", img: "face-05-shield.jpg" },
  body: { label: "Body", img: "body-trio.jpg" },
  hair: { label: "Hair", img: "hair-14-oil.jpg" },
  tempo: { label: "Tempo", img: "tempo-04-spf-sport.jpg" },
};

export const PRODUCTS: Product[] = [
  {
    "slug": "face-01",
    "line": "face",
    "code": "FACE 01",
    "name": "Daily Cleanser",
    "sub": {
      "es": "Gel limpiador facial",
      "en": "Facial cleansing gel"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una limpieza fresca y ligera que devuelve al rostro una sensación de pureza y equilibrio. Ideal para despertar la piel por la mañana o dejarla limpia y renovada antes de descansar.",
      "en": "A fresh, light cleanse that returns a feeling of purity and balance to the face. Ideal for waking up the skin in the morning or leaving it clean and renewed before resting."
    },
    "benefits": [
      "Cleanse",
      "Refresh",
      "Balance"
    ],
    "ingredients": [
      "Olive Leaf",
      "Green Fig",
      "Mineral Clay",
      "Aloe Vera",
      "Panthenol"
    ],
    "img": "face-01-cleanser.jpg",
    "price": 112000
  },
  {
    "slug": "face-02",
    "line": "face",
    "code": "FACE 02",
    "name": "Hydrating Face Cream",
    "sub": {
      "es": "Crema hidratante facial",
      "en": "Hydrating face cream"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una hidratación ligera que se funde con la piel y devuelve suavidad, confort y frescura. Un gesto sencillo para mantener el rostro equilibrado, de la mañana a la noche.",
      "en": "Light hydration that melts into the skin and restores softness, comfort and freshness. A simple gesture to keep the face balanced, from morning to night."
    },
    "benefits": [
      "Hydrate",
      "Protect",
      "Balance"
    ],
    "ingredients": [],
    "img": "face-02-cream.jpg",
    "price": 141000
  },
  {
    "slug": "face-05",
    "line": "face",
    "code": "FACE 05",
    "name": "Daily Shield SPF 50",
    "sub": {
      "es": "Protector solar facial · UVA / UVB",
      "en": "High-protection facial sunscreen · UVA / UVB"
    },
    "moment": {
      "es": "Para acompañar tu día.",
      "en": "To accompany your day."
    },
    "desc": {
      "es": "Protección solar de alta cobertura en una textura ligera y confortable. Pensada para mantener la piel protegida e hidratada mientras transcurre el día bajo la luz.",
      "en": "High-coverage sun protection in a light, comfortable texture. Designed to keep skin protected and hydrated as the day unfolds under the light."
    },
    "benefits": [
      "Hydrate",
      "Protect",
      "Prevent"
    ],
    "ingredients": [
      "Olive Leaf",
      "Niacinamide",
      "Hyaluronic Acid",
      "Vitamin E"
    ],
    "img": "face-05-shield.jpg",
    "price": 118000
  },
  {
    "slug": "face-06",
    "line": "face",
    "code": "FACE 06",
    "name": "Face Exfoliant",
    "sub": {
      "es": "Exfoliante facial",
      "en": "Facial exfoliant"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una renovación suave que ayuda a liberar la piel de células muertas e impurezas. Deja el rostro más liso, limpio y uniforme, recuperando una sensación de frescura y claridad.",
      "en": "A gentle renewal that helps free the skin from dead cells and impurities. Leaves the face smoother, cleaner and more even, restoring a feeling of freshness and clarity."
    },
    "benefits": [
      "Purify",
      "Renew",
      "Smooth"
    ],
    "ingredients": [
      "Olive Seed",
      "Salicylic Acid",
      "Mineral Clay",
      "Aloe Vera",
      "Niacinamide"
    ],
    "img": "face-06-exfoliant.jpg",
    "price": 144000
  },
  {
    "slug": "body-16",
    "line": "body",
    "code": "BODY 16",
    "name": "Body Wash",
    "sub": {
      "es": "Gel exfoliante corporal",
      "en": "Exfoliating body gel wash"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una ducha fresca que limpia la piel y despierta los sentidos. Suave y revitalizante, convierte cada baño en un momento de renovación y ligereza.",
      "en": "A fresh shower that cleanses the skin and awakens the senses. Gentle and revitalizing, it turns every bath into a moment of renewal and lightness."
    },
    "benefits": [
      "Cleanse",
      "Smooth",
      "Renew"
    ],
    "ingredients": [
      "Salt Crystals",
      "Olive Seed",
      "Aloe Vera",
      "Panthenol"
    ],
    "img": "body-trio.jpg",
    "price": 138000,
    "group": "body"
  },
  {
    "slug": "body-17",
    "line": "body",
    "code": "BODY 17",
    "name": "Body Lotion",
    "sub": {
      "es": "Loción corporal diaria",
      "en": "Daily body lotion"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una hidratación ligera que deja la piel suave, flexible y confortable. Se absorbe fácilmente y acompaña el cuerpo con una sensación limpia y fresca, sin peso.",
      "en": "Light hydration that leaves skin soft, supple and comfortable. It absorbs easily and accompanies the body with a clean, fresh, weightless feel."
    },
    "benefits": [
      "Nourish",
      "Hydrate",
      "Restore"
    ],
    "ingredients": [
      "Shea Butter",
      "Olive Oil",
      "Aloe Vera",
      "Niacinamide"
    ],
    "img": "body-trio.jpg",
    "price": 123000,
    "group": "body"
  },
  {
    "slug": "body-19",
    "line": "body",
    "code": "BODY 19",
    "name": "Natural Deodorant",
    "sub": {
      "es": "Desodorante natural",
      "en": "Natural deodorant"
    },
    "moment": {
      "es": "Para comenzar el día y acompañarlo hasta el final.",
      "en": "To start the day and accompany it to the end."
    },
    "desc": {
      "es": "Una frescura limpia y discreta que permanece cerca de la piel. Diseñado para acompañar el movimiento cotidiano sin resultar invasivo, dejando una sensación natural durante todo el día.",
      "en": "A clean, discreet freshness that stays close to the skin. Designed to move with your everyday life without feeling intrusive, leaving a natural feel all day long."
    },
    "benefits": [
      "Protect",
      "Fresh",
      "Balance"
    ],
    "ingredients": [
      "Magnesium",
      "Arrowroot",
      "Aloe Vera",
      "Essential Oils"
    ],
    "img": "body-trio.jpg",
    "price": 104000,
    "group": "body"
  },
  {
    "slug": "hair-11",
    "line": "hair",
    "code": "HAIR 11",
    "name": "Daily Shampoo",
    "sub": {
      "es": "Champú diario",
      "en": "Daily shampoo"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una limpieza ligera que refresca el cuero cabelludo y fortalece el cabello. Lo deja limpio y equilibrado, con una sensación de frescura que no pesa.",
      "en": "A light cleanse that refreshes the scalp and strengthens the hair. Leaves it clean and balanced, with a freshness that never weighs it down."
    },
    "benefits": [
      "Cleanse",
      "Strengthen",
      "Refresh"
    ],
    "ingredients": [
      "Olive Leaf",
      "Rosemary",
      "Panthenol"
    ],
    "img": "hair-11-shampoo.jpg",
    "price": 147000
  },
  {
    "slug": "hair-12",
    "line": "hair",
    "code": "HAIR 12",
    "name": "Daily Conditioner",
    "sub": {
      "es": "Acondicionador diario",
      "en": "Daily conditioner"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Una fórmula ligera que suaviza, desenreda y devuelve movimiento al cabello. Lo deja flexible, limpio y natural, con una sensación de cuidado que se mantiene sin peso.",
      "en": "A light formula that softens, detangles and brings movement back to the hair. Leaves it supple, clean and natural, with a feeling of care that lasts without weight."
    },
    "benefits": [
      "Nourish",
      "Detangle",
      "Strengthen"
    ],
    "ingredients": [
      "Olive Oil",
      "Argan Oil",
      "Rosemary",
      "Panthenol",
      "Plant Proteins"
    ],
    "img": "hair-12-conditioner.jpg",
    "price": 127000
  },
  {
    "slug": "hair-14",
    "line": "hair",
    "code": "HAIR 14",
    "name": "Nourishing Hair Oil",
    "sub": {
      "es": "Aceite capilar nutritivo",
      "en": "Nourishing hair oil"
    },
    "moment": {
      "es": "Para comenzar o terminar el día.",
      "en": "To start or end the day."
    },
    "desc": {
      "es": "Un aceite ligero que nutre, suaviza y devuelve al cabello un brillo natural. Una pequeña cantidad basta para controlar el frizz y dejar un acabado pulido, suave y ligero.",
      "en": "A light oil that nourishes, softens and returns a natural shine to the hair. A small amount is enough to control frizz and leave a polished, soft, lightweight finish."
    },
    "benefits": [
      "Nourish",
      "Repair",
      "Shine"
    ],
    "ingredients": [
      "Argan Oil",
      "Jojoba Oil",
      "Rosemary",
      "Vitamin E"
    ],
    "img": "hair-14-oil.jpg",
    "price": 98000
  },
  {
    "slug": "tempo-04",
    "line": "tempo",
    "code": "TEMPO 04",
    "name": "SPF 50 Sport",
    "sub": {
      "es": "Protector solar · resistente al agua y al sudor",
      "en": "Sunscreen · water and sweat resistant"
    },
    "moment": {
      "es": "Para acompañar el movimiento.",
      "en": "To accompany movement."
    },
    "desc": {
      "es": "Protección resistente al agua y al sudor para los días de actividad. Una fórmula ligera creada para moverse contigo y mantener la piel protegida, fresca y confortable bajo el sol.",
      "en": "Water- and sweat-resistant protection for active days. A light formula made to move with you and keep skin protected, fresh and comfortable under the sun."
    },
    "benefits": [
      "Protect",
      "Perform",
      "Hydrate"
    ],
    "ingredients": [
      "Zinc Oxide",
      "Vitamin E",
      "Green Tea",
      "Electrolytes"
    ],
    "img": "tempo-04-spf-sport.jpg",
    "price": 129000
  },
  {
    "slug": "tempo-05",
    "line": "tempo",
    "code": "TEMPO 05",
    "name": "Active Body Wash",
    "sub": {
      "es": "Gel de ducha refrescante",
      "en": "Refreshing shower gel"
    },
    "moment": {
      "es": "Para comenzar o terminar el movimiento.",
      "en": "To start or end the movement."
    },
    "desc": {
      "es": "Una ducha refrescante que elimina el sudor y devuelve al cuerpo una sensación limpia y ligera. Perfecta para despertar después de una noche de descanso o para cerrar el día después de moverse.",
      "en": "A refreshing shower that washes away sweat and returns a clean, light feel to the body. Perfect for waking up after a night's rest or for closing the day after moving."
    },
    "benefits": [
      "Cleanse",
      "Refresh",
      "Recover"
    ],
    "ingredients": [
      "Sea Minerals",
      "Aloe Vera",
      "Eucalyptus",
      "Mint"
    ],
    "img": "tempo-05-body-wash.jpg",
    "price": 90000
  }
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsByLine = (line: Line) => PRODUCTS.filter((p) => p.line === line);
