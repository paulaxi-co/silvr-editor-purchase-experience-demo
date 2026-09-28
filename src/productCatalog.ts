// Store research updated 28 September 2026. Prices and stock can change at the retailer.
export type StoreItem = {
  id: number
  name: string
  brand: string
  price: string
  image: string
  url: string
  priceNote?: string
}

export type Product = StoreItem & { x: number; y: number; similar: StoreItem[] }

export const FIRST_IMAGE_PRODUCTS: Product[] = [
  {
    id: 1, name: "Oversized hoodie in bright mustard yellow", brand: "ASOS DESIGN", price: "$18.00",
    x: 39, y: 24.2, image: "/assets/2de17.png",
    url: "https://www.asos.com/us/asos-design/asos-design-oversized-hoodie-in-bright-mustard-yellow/prd/202448056",
    similar: [{ id: 101, name: "Wide-cut hoodie in yellow", brand: "H&M", price: "$34.99", image: "/assets/2de17.png", url: "https://www2.hm.com/en_us/productpage.0610305001.html" }],
  },
  {
    id: 2, name: "Harri wide-leg jogger pants", brand: "iets frans… / Urban Outfitters", price: "$59.00",
    x: 42.8, y: 51.2, image: "/assets/895bf.png", priceNote: "Yellow is a selectable color on the store page.",
    url: "https://www.urbanoutfitters.com/shop/iets-frans-harri-wide-leg-jogger-pant",
    similar: [{ id: 201, name: "High-waisted SoComfy jogger sweatpants", brand: "Old Navy", price: "$20.00", image: "/assets/895bf.png", url: "https://oldnavy.gap.com/browse/product.do?pid=7773621120304", priceNote: "Different color; similar jogger shape." }],
  },
  {
    id: 3, name: "Vava white over-the-knee boots", brand: "Steve Madden", price: "$89.99",
    x: 65, y: 81.1, image: "/assets/ab0e5.png", url: "https://www.stevemadden.com/products/vava-white",
    similar: [{ id: 301, name: "Nitro white knee-high boots", brand: "Steve Madden", price: "$229.95", image: "/assets/ab0e5.png", url: "https://www.stevemadden.com/collections/knee-high-boots/products/nitro-white", priceNote: "Preorder; check the ship date at the store." }],
  },
]

export const VIDEO_PRODUCTS: Product[] = [
  {
    id: 4, name: "Slim-fit double-breasted pinstripe blazer", brand: "Dondup", price: "$735.00",
    x: 50.5, y: 47.6, image: "/assets/034ff.png",
    url: "https://www.dondup.com/se/slim-fit-double-breasted-pinstripe-blazer-dj441-es0078d-xxx-dd-s26-027",
    priceNote: "USD price on Dondup's US listing; the linked store may show a local currency.",
    similar: [{ id: 401, name: "Pinstripe double-breasted blazer", brand: "Bar III / Macy's", price: "$79.50", image: "/assets/034ff.png", url: "https://www.macys.com/shop/product/bar-iii-womens-pinstripe-double-breasted-blazer-macys-exclusive?ID=27485410" }],
  },
  {
    id: 5, name: "Pinstripe longuette skirt", brand: "Dondup", price: "£251.24",
    x: 52, y: 72, image: "/assets/6344a.png", priceNote: "GBP price on Dondup's UK listing.",
    url: "https://www.dondup.com/gb/pinstripe-longuette-skirt-g575-es0078d-xxx-dd-s26-027",
    similar: [{ id: 501, name: "Danube pinstripe ponte pencil skirt", brand: "Universal Standard / Macy's", price: "$98.00", image: "/assets/6344a.png", url: "https://www.macys.com/shop/product/universal-standard-plus-size-danube-ponte-skirt?ID=25234608" }],
  },
  {
    id: 6, name: "Babysoft turtleneck pullover sweater", brand: "French Connection", price: "$88.00",
    x: 45, y: 35.7, image: "/assets/e7ae3.png",
    url: "https://usa.frenchconnection.com/products/78zfn-p6m",
    similar: [{ id: 601, name: "Rib-knit turtleneck sweater", brand: "H&M", price: "$34.99", image: "/assets/e7ae3.png", url: "https://www2.hm.com/en_us/productpage.1265086003.html" }],
  },
]

export const MULTIPERSON_PRODUCTS_1: Product[] = [
  {
    id: 7, name: "Ryana corset drape maxi dress in white", brand: "Princess Polly", price: "$32.50",
    x: 33.5, y: 56, image: "/assets/6da9f.png", url: "https://us.princesspolly.com/products/ryana-corset-drape-maxi-dress-white",
    similar: [{ id: 701, name: "Elestria maxi dress in white", brand: "Princess Polly", price: "$75.00", image: "/assets/6da9f.png", url: "https://us.princesspolly.com/products/elestria-maxi-dress-white" }],
  },
  {
    id: 8, name: "Modern-fit solid suit jacket in burgundy", brand: "HUGO by Hugo Boss / Macy's", price: "$449.00",
    x: 81, y: 37, image: "/assets/40acb.png", priceNote: "Jacket only; matching trousers are sold separately.",
    url: "https://www.macys.com/shop/product/hugo-by-hugo-boss-mens-modern-fit-solid-suit-jacket?ID=26592861",
    similar: [{ id: 801, name: "Regular double-breasted suit blazer in burgundy", brand: "ASOS DESIGN", price: "$94.99", image: "/assets/40acb.png", url: "https://www.asos.com/us/asos-design/asos-design-regular-double-breasted-suit-blazer-in-burgundy/prd/210081183", priceNote: "Jacket only." }],
  },
  {
    id: 13, name: "Slim-fit suit jacket in electric red", brand: "ASOS DESIGN", price: "$85.00",
    x: 43.5, y: 42, image: "/assets/df484.png", priceNote: "Jacket only.",
    url: "https://www.asos.com/us/asos-design/asos-design-slim-fit-suit-jacket-in-electric-red/prd/201232898",
    similar: [{ id: 1301, name: "Slim-fit wool-blend suit jacket in burgundy", brand: "Calvin Klein / Macy's", price: "$239.99", image: "/assets/df484.png", url: "https://www.macys.com/shop/product/calvin-klein-mens-slim-fit-wool-blend-suit-jacket?ID=26039100", priceNote: "Jacket only; different red tone." }],
  },
  {
    id: 15, name: "Strappy bustier corset gown in black", brand: "Marchesa Notte / Macy's", price: "$325.00",
    x: 56.5, y: 56, image: "/assets/7c404.png",
    url: "https://www.macys.com/shop/product/marchesa-notte-womens-strappy-bustier-corset-detail-gown?ID=26168429",
    similar: [{ id: 1501, name: "Strapless satin corset gown in black", brand: "Alex & Sophia / Macy's", price: "$129.00", image: "/assets/7c404.png", url: "https://www.macys.com/shop/product/alex-sophia-juniors-satin-dress?ID=27473480" }],
  },
  {
    id: 16, name: "Regular-fit suit blazer in taupe brown", brand: "Zara", price: "$169.00",
    x: 72.5, y: 55, image: "/assets/81c9e.png", priceNote: "Jacket only.",
    url: "https://www.zara.com/us/en/regular-fit-suit-blazer-p01060627.html",
    similar: [{ id: 1601, name: "Relaxed-fit suit blazer in dark khaki", brand: "Zara", price: "$179.00", image: "/assets/81c9e.png", url: "https://www.zara.com/us/en/relaxed-fit-suit-blazer-p04681644.html", priceNote: "Jacket only." }],
  },
]

export const MULTIPERSON_PRODUCTS_2: Product[] = [
  {
    id: 10, name: "Rhombus cardigan in heather gray", brand: "Mango / Macy's", price: "$69.99",
    x: 20.2, y: 34, image: "/assets/20e1a.png", url: "https://www.macys.com/shop/product/mango-womens-rhombus-cardigan?ID=26946481",
    similar: [{ id: 1001, name: "Argyle knit sweater in heather gray", brand: "Mango", price: "$69.99", image: "/assets/20e1a.png", url: "https://shop.mango.com/us/en/p/women/sweaters-and-cardigans/plus-sizes/argyle-knit-sweater/37005863/94/00" }],
  },
  {
    id: 11, name: "Custom Rachel Green crown baby tee", brand: "CosyThreadsUK / Etsy", price: "$28.67",
    x: 80.9, y: 35.2, image: "/assets/0a721.png", url: "https://www.etsy.com/listing/4297064394/custom-rachel-green-birthday-baby-tee",
    similar: [{ id: 1101, name: "Personalized Rachel Green crown tee", brand: "TheMoodLoom / Etsy", price: "from $24.38", image: "/assets/0a721.png", url: "https://www.etsy.com/listing/4382655640/personalized-friends-birthday-t-shirt" }],
  },
  {
    id: 17, name: "Elliot black knee-high block-heel boots", brand: "Steve Madden", price: "$109.99",
    x: 21.3, y: 84, image: "/assets/ec435.png", url: "https://www.stevemadden.com/collections/boots-booties/products/elliot-black",
    similar: [{ id: 1701, name: "Ravine black leather knee-high boots", brand: "Steve Madden", price: "$199.95", image: "/assets/ec435.png", url: "https://www.stevemadden.com/products/ravine-black-leather" }],
  },
  {
    id: 18, name: "501 Original Fit women's jeans", brand: "Levi's", price: "$110.00",
    x: 13.9, y: 54.4, image: "/assets/8336d.png", url: "https://www.levi.com/US/en_US/clothing/women/jeans/straight/501-original-fit-womens-jeans/p/125010681",
    similar: [{ id: 1801, name: "501 '90s women's jeans", brand: "Levi's", price: "$110.00", image: "/assets/8336d.png", url: "https://www.levi.com/US/en_US/clothing/women/jeans/straight/501-90s-womens-jeans/p/A84210016" }],
  },
  {
    id: 19, name: "Pleated linen trousers in beige", brand: "Mango", price: "$53.99",
    x: 92.3, y: 54.6, image: "/assets/73e55.png", url: "https://shop.mango.com/us/en/p/women/trousers/linen/pleated-linen-trousers/87047694/08/00",
    similar: [{ id: 1901, name: "Straight linen-blend trousers in beige", brand: "Mango", price: "$53.99", image: "/assets/73e55.png", url: "https://shop.mango.com/us/en/p/women/trousers/linen/straight-linen-blend-trousers/87060591/08/00" }],
  },
]
