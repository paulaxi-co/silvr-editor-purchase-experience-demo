import { useState, useRef, useEffect, type CSSProperties } from "react"
import videoGif from "./imports/53084f29ac28fc87da1ed84ba3f0e23f.gif"
import spidermanImg from "./imports/Screenshot_2026-08-31_at_6.13.06_pm.png"
import friendsImg from "./imports/83e21e98daa1b315e24d2f416dc59049.jpg"

import { FIRST_IMAGE_PRODUCTS, VIDEO_PRODUCTS, MULTIPERSON_PRODUCTS_1, MULTIPERSON_PRODUCTS_2, type Product, type StoreItem } from "./productCatalog"

const MULTIPERSON_IMAGE_1 = spidermanImg
const MULTIPERSON_IMAGE_2 = friendsImg

// --- HOOKS ---

// --- ICONS ---
const Icons = {
  ShoppingBag: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  X: ({ size = 20 } = {}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Play: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
}

// --- SHOPPING COMPONENTS ---

const Hotspot = ({ product, isActive, onHover, onLeave, onOpen }: {
  product: Product; isActive: boolean; onHover: (product: Product) => void;
  onLeave: () => void; onOpen: (product: Product) => void
}) => (
  <button
    type="button"
    className={`hotspot absolute z-20 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus-visible:scale-110 sm:h-12 sm:w-12 ${isActive ? "scale-110" : ""}`}
    style={{ top: `${product.y}%`, left: `${product.x}%`, transform: "translate(-50%, -50%)" }}
    onMouseEnter={() => onHover(product)}
    onMouseLeave={onLeave}
    onFocus={() => onHover(product)}
    onClick={(event) => { event.stopPropagation(); onOpen(product) }}
    aria-label={`Explore ${product.name}`}
    aria-expanded={isActive}
  >
    <span className="hotspot-ring absolute inset-0 rounded-full" />
    <span className="hotspot-core relative flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white text-gray-950 shadow-md">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  </button>
)

const ProductPreview = ({ product, onEnter, onLeave, onOpen, onSimilar }: {
  product: Product; onEnter: () => void; onLeave: () => void;
  onOpen: () => void; onSimilar: () => void
}) => (
  <div
    className="product-preview absolute z-30 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur-md"
    style={{
      "--preview-left": product.x > 62 ? "auto" : `${Math.max(product.x, 4)}%`,
      "--preview-right": product.x > 62 ? `${Math.max(100 - product.x, 4)}%` : "auto",
      top: product.y > 65 ? "auto" : `calc(${product.y}% + 28px)`,
      bottom: product.y > 65 ? `calc(${100 - product.y}% + 28px)` : "auto",
    } as CSSProperties}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    onClick={(event) => event.stopPropagation()}
  >
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Shop this style</p>
    <div className="flex items-center gap-3">
      <img src={product.image} alt="" className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 object-contain" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{product.brand}</p>
        <p className="line-clamp-2 text-sm font-medium">{product.name}</p>
        <p className="mt-1 text-sm">{product.price}</p>
      </div>
    </div>
    <div className="mt-3 flex gap-2">
      <button type="button" onClick={onOpen} className="min-h-10 flex-1 rounded-full bg-gray-950 px-4 text-sm font-medium text-white">View details</button>
      {product.similar.length > 0 && <button type="button" onClick={onSimilar} className="min-h-10 rounded-full bg-gray-100 px-4 text-sm font-medium">Similar</button>}
    </div>
  </div>
)

const ProductCard = ({ product, selected, onClick, onSimilar, similar = false }: {
  product: StoreItem; selected?: boolean; onClick: () => void; onSimilar?: () => void; similar?: boolean
}) => (
  <article className={`overflow-hidden rounded-2xl border bg-white ${selected ? "border-gray-900" : "border-gray-200"}`}>
    <button type="button" className="block w-full text-left" onClick={onClick} aria-label={`View ${product.name}`}>
      <div className="relative aspect-[4/5] bg-gray-100 p-3">
        <img src={product.image} alt={`Style reference for ${product.name}`} className="h-full w-full object-contain" loading="lazy" />
        <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-gray-600">Style reference</span>
      </div>
      <div className="px-3 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{similar ? "Similar find · " + product.brand : product.brand}</p>
        <p className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5">{product.name}</p>
        <p className="mt-1 text-sm">{product.price}</p>
      </div>
    </button>
    <div className="flex items-center gap-2 px-3 pb-3 pt-3">
      <button type="button" onClick={onClick} className="min-h-10 flex-1 rounded-full bg-gray-950 px-3 text-xs font-medium text-white">View details</button>
      {onSimilar && <button type="button" onClick={onSimilar} className="min-h-10 rounded-full border border-gray-200 px-3 text-xs font-medium">Similar</button>}
    </div>
  </article>
)

const BottomSheet = ({ isOpen, onClose, products, selectedProduct, onSelectProduct, similarTarget, onShowSimilar, onClearSimilar, cobranded = true }: {
  isOpen: boolean; onClose: () => void; products: Product[]; selectedProduct: Product | StoreItem | null;
  onSelectProduct: (product: Product | StoreItem | null) => void; similarTarget: Product | null;
  onShowSimilar: (product: Product) => void; onClearSimilar: () => void; cobranded?: boolean
}) => {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose() }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  const relatedProduct = products.find((product) => product.id === selectedProduct?.id)
  const similarItems = similarTarget?.similar || relatedProduct?.similar || []
  const showingSimilar = Boolean(similarTarget)
  const heading = showingSimilar ? "Similar items" : selectedProduct ? "Item details" : "Shop the Look"

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} aria-hidden="true" />
      <section
        role="dialog" aria-modal={isOpen} aria-label={heading} aria-hidden={!isOpen}
        className={`fixed bottom-0 left-0 right-0 z-60 mx-auto flex max-h-[88dvh] w-full max-w-2xl flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out lg:inset-y-0 lg:right-0 lg:left-auto lg:mx-0 lg:max-h-none lg:w-[440px] lg:rounded-none ${isOpen ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-y-0 lg:translate-x-full"}`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Silvr</p>
            <h2 className="font-serif text-xl">{heading}</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100" aria-label="Close product details"><Icons.X /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {selectedProduct && !showingSimilar && (
            <button type="button" onClick={() => onSelectProduct(null)} className="mb-4 flex min-h-10 items-center gap-1 text-sm font-medium"><Icons.ChevronLeft /> All items</button>
          )}
          {showingSimilar && (
            <button type="button" onClick={onClearSimilar} className="mb-4 flex min-h-10 items-center gap-1 text-sm font-medium"><Icons.ChevronLeft /> Back to item</button>
          )}
          {showingSimilar ? (
            <>
              <p className="mb-4 text-sm text-gray-600">Based on {similarTarget?.name}</p>
              <div className="grid grid-cols-2 gap-3">{similarItems.map((item) => <ProductCard key={item.id} product={item} similar onClick={() => { onClearSimilar(); onSelectProduct(item) }} />)}</div>
            </>
          ) : selectedProduct ? (
            <>
              <div className="relative flex min-h-[250px] items-center justify-center rounded-2xl bg-gray-100 p-6 sm:min-h-[330px]">
                <img src={selectedProduct.image} alt={`Style reference for ${selectedProduct.name}`} className="max-h-[330px] w-full object-contain" />
                <span className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-600">Style reference</span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div><p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{relatedProduct ? selectedProduct.brand : "Similar find · " + selectedProduct.brand}</p><h3 className="mt-1 text-xl font-semibold">{selectedProduct.name}</h3></div>
                <p className="shrink-0 text-lg font-semibold">{selectedProduct.price}</p>
              </div>
              {similarItems.length > 0 && <button type="button" onClick={() => onShowSimilar(relatedProduct || products.find((p) => p.similar.some((s) => s.id === selectedProduct.id))!)} className="mt-6 flex min-h-20 w-full items-center gap-3 rounded-xl border-y border-gray-200 py-3 text-left">
                <span className="min-w-0 flex-1"><strong className="block text-base">See similar items</strong><span className="text-sm text-gray-500">Based on this match</span></span>
                <span className="flex shrink-0 -space-x-2">{similarItems.slice(0, 3).map((item) => <img key={item.id} src={item.image} alt="" className="h-10 w-10 rounded-md border-2 border-white bg-gray-100 object-cover" />)}</span>
                <span aria-hidden="true" className="text-2xl text-gray-500">›</span>
              </button>}
              <p className="mt-4 text-xs leading-5 text-gray-500">Images are style references. Check the retailer's photos, size, availability and final price before buying. Research updated 28 Sep 2026.</p>
              {selectedProduct.priceNote && <p className="mt-2 text-xs leading-5 text-gray-500">{selectedProduct.priceNote}</p>}
              <a href={selectedProduct.url} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#17171d] text-base font-medium text-white" aria-label={`Shop ${selectedProduct.name} at ${selectedProduct.brand} in a new tab`}>Shop at store ↗</a>
            </>
          ) : (
            <><p className="mb-4 text-sm text-gray-500">{products.length} items found</p><div className="grid grid-cols-2 gap-3">{products.map((product) => <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product)} onSimilar={product.similar.length ? () => { onSelectProduct(product); onShowSimilar(product) } : undefined} />)}</div></>
          )}
        </div>
        {cobranded && <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-3 text-center text-xs text-gray-500">Powered by <strong className="text-gray-900">Silvr</strong></div>}
      </section>
    </>
  )
}

const ShopChip = ({ label, count, active, onClick, video = false }: {
  label: string; count: number; active: boolean; onClick: () => void; video?: boolean
}) => (
  <div className="shop-chip-layer pointer-events-none absolute inset-0 z-30 p-4">
    <div className="shop-chip-sticky flex justify-start">
      <button type="button" onClick={(event) => { event.stopPropagation(); onClick() }} className={`pointer-events-auto flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md transition-colors ${video ? "border border-white/30 bg-gray-950/75 text-white hover:bg-gray-950" : "border border-gray-900/10 bg-white/95 text-gray-900 hover:bg-white"}`} aria-label={`${label}, ${count} items`}>
        <Icons.ShoppingBag /> {label} {!active && <span className="border-l border-current/20 pl-2 opacity-70">{count}</span>}
      </button>
    </div>
  </div>
)

const ShoppableImage = ({ imageSrc, products, nativeWidth }: { imageSrc: string; products: Product[]; nativeWidth: number }) => {
  const [shopMode, setShopMode] = useState(false)
  const [preview, setPreview] = useState<Product | null>(null)
  const [selected, setSelected] = useState<Product | StoreItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [similarTarget, setSimilarTarget] = useState<Product | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearLeave = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }
  const scheduleLeave = () => { clearLeave(); leaveTimer.current = setTimeout(() => setPreview(null), 160) }
  useEffect(() => () => clearLeave(), [])
  const openItem = (product: Product) => { clearLeave(); setPreview(null); setSelected(product); setSheetOpen(true) }
  const closeSheet = () => { setSheetOpen(false); setSimilarTarget(null); setSelected(null) }
  return (
    <div className="relative mx-auto my-8 w-full md:my-10 lg:my-12" style={{ maxWidth: nativeWidth }}>
      <div className="relative bg-gray-100" onClick={() => setPreview(null)}>
        <img src={imageSrc} alt="Fashion editorial" className={`block h-auto w-full transition-[filter] duration-300 ${shopMode ? "brightness-95" : ""}`} />
        {shopMode && <>
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          {products.map((product) => <Hotspot key={product.id} product={product} isActive={preview?.id === product.id} onHover={(p) => { clearLeave(); setPreview(p) }} onLeave={scheduleLeave} onOpen={openItem} />)}
          {preview && <ProductPreview product={preview} onEnter={clearLeave} onLeave={scheduleLeave} onOpen={() => openItem(preview)} onSimilar={() => { setSelected(preview); setSimilarTarget(preview); setSheetOpen(true); setPreview(null) }} />}
          <button type="button" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-950/65 text-white" onClick={(event) => { event.stopPropagation(); setShopMode(false); setPreview(null) }} aria-label="Exit shop mode"><Icons.X size={16} /></button>
        </>}
        <ShopChip label="Shop This Image" count={products.length} active={shopMode} onClick={() => { if (!shopMode) setShopMode(true); else { setSelected(null); setSimilarTarget(null); setSheetOpen(true) } }} />
      </div>
      <BottomSheet isOpen={sheetOpen} onClose={closeSheet} products={products} selectedProduct={selected} onSelectProduct={setSelected} similarTarget={similarTarget} onShowSimilar={setSimilarTarget} onClearSimilar={() => setSimilarTarget(null)} />
    </div>
  )
}

const ShoppableVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [shopMode, setShopMode] = useState(false)
  const [preview, setPreview] = useState<Product | null>(null)
  const [selected, setSelected] = useState<Product | StoreItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [similarTarget, setSimilarTarget] = useState<Product | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearLeave = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }
  const scheduleLeave = () => { clearLeave(); leaveTimer.current = setTimeout(() => setPreview(null), 160) }
  useEffect(() => () => clearLeave(), [])
  useEffect(() => {
    if (isPlaying || !imgRef.current || !canvasRef.current) return
    const image = imgRef.current, canvas = canvasRef.current
    canvas.width = image.naturalWidth; canvas.height = image.naturalHeight
    canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height)
  }, [isPlaying])
  const togglePlay = () => { setIsPlaying((value) => !value); setShopMode(false); setPreview(null) }
  const openItem = (product: Product) => { clearLeave(); setPreview(null); setSelected(product); setSheetOpen(true) }
  const closeSheet = () => { setSheetOpen(false); setSelected(null); setSimilarTarget(null) }
  return (
    <div className="relative mx-auto my-8 w-full max-w-[540px] bg-gray-950 md:my-10">
      <div className="relative aspect-[540/500]" onClick={() => { if (preview) setPreview(null); else togglePlay() }}>
        <img ref={imgRef} src={videoGif} alt="Fashion campaign video" className={`h-full w-full object-contain ${isPlaying ? "" : "hidden"}`} />
        <canvas ref={canvasRef} className={`h-full w-full object-contain ${isPlaying ? "hidden" : ""}`} />
        {!isPlaying && !shopMode && <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur"><Icons.Play /></div></div>}
        {!isPlaying && shopMode && <>
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          {VIDEO_PRODUCTS.map((product) => <Hotspot key={product.id} product={product} isActive={preview?.id === product.id} onHover={(p) => { clearLeave(); setPreview(p) }} onLeave={scheduleLeave} onOpen={openItem} />)}
          {preview && <ProductPreview product={preview} onEnter={clearLeave} onLeave={scheduleLeave} onOpen={() => openItem(preview)} onSimilar={() => { setSelected(preview); setSimilarTarget(preview); setSheetOpen(true); setPreview(null) }} />}
          <button type="button" onClick={(event) => { event.stopPropagation(); setShopMode(false); setPreview(null) }} className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-950/70 text-white" aria-label="Exit shop mode"><Icons.X size={16} /></button>
        </>}
        <ShopChip label="Shop This Video" count={VIDEO_PRODUCTS.length} active={shopMode} video onClick={() => { if (isPlaying) { setIsPlaying(false); setShopMode(true) } else if (!shopMode) setShopMode(true); else { setSelected(null); setSimilarTarget(null); setSheetOpen(true) } }} />
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <button type="button" onClick={(event) => { event.stopPropagation(); togglePlay() }} className="flex h-11 w-11 shrink-0 items-center justify-center" aria-label={isPlaying ? "Pause video" : "Play video"}>{isPlaying ? <Icons.Pause /> : <Icons.Play />}</button>
          <div className="h-1 flex-1 rounded-full bg-white/30"><div className="h-full w-1/3 rounded-full bg-white" /></div><span className="text-xs">0:15 / 0:45</span>
        </div>
      </div>
      <BottomSheet isOpen={sheetOpen} onClose={closeSheet} products={VIDEO_PRODUCTS} selectedProduct={selected} onSelectProduct={setSelected} similarTarget={similarTarget} onShowSimilar={setSimilarTarget} onClearSimilar={() => setSimilarTarget(null)} cobranded={false} />
    </div>
  )
}

// --- APP ---

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-200">
      {/* Editorial container — grows from mobile card to full desktop frame */}
      <div className="relative mx-auto min-h-screen w-full max-w-2xl overflow-x-clip border-x border-gray-100 bg-white pb-20 shadow-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">

        {/* Publisher Header */}
        <header className="px-6 md:px-10 lg:px-16 pb-4 pt-[env(safe-area-inset-top,0px)] border-b border-gray-100 sticky top-0 bg-white z-40">
          {/* Main header row */}
          <div className="flex items-center justify-between py-4">
            <button
              className="min-h-[44px] min-w-[44px] flex items-center -ml-2"
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16M4 6h16M4 18h16" />
              </svg>
            </button>

            <div className="text-2xl md:text-3xl font-serif tracking-widest font-bold uppercase">
              L'Édito
            </div>

            <button
              className="min-h-[44px] min-w-[44px] flex items-center justify-end -mr-2"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>

          {/* Desktop nav bar */}
          <nav className="hidden lg:flex items-center justify-center gap-10 pb-3 border-t border-gray-100 pt-3">
            {["Fashion", "Style", "Beauty", "Culture", "Living"].map((item, i) => (
              <a
                key={item}
                href="#"
                className={`text-[11px] uppercase tracking-widest transition-colors ${
                  i === 1
                    ? "text-gray-900 font-semibold"
                    : "text-gray-400 hover:text-gray-900"
                }`}
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* Article */}
        <main>
          <article className="pt-8 md:pt-12">

            {/* Article header — constrained reading measure */}
            <div className="px-6 md:px-10 lg:px-0 lg:max-w-2xl lg:mx-auto">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 block">
                Style / Editorial
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4 text-black">
                The Return of Structured Elegance
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-serif">
                This season, the ephemeral fluidity of past collections gives
                way to decisive tailoring and uncompromising luxury accessories.
              </p>
            </div>

            {/* Shoppable Image 1 */}
            <ShoppableImage
              imageSrc="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              products={FIRST_IMAGE_PRODUCTS}
              nativeWidth={800}
            />

            <div className="px-6 md:px-10 lg:px-0 lg:max-w-2xl lg:mx-auto space-y-6 text-gray-700 leading-relaxed font-serif text-xl md:text-[1.35rem]">
              <p>
                At the highly anticipated premiere of Spider-Man: Brand New Day,
                the red carpet was a masterclass in modern tailoring.
                Celebrities eschewed classic gowns for sharper, more structured
                silhouettes that captured the electric energy of the evening.
              </p>
            </div>

            {/* Shoppable Image 2 */}
            <ShoppableImage
              imageSrc={MULTIPERSON_IMAGE_1}
              products={MULTIPERSON_PRODUCTS_1}
              nativeWidth={1160}
            />

            <div className="px-6 md:px-10 lg:px-0 lg:max-w-2xl lg:mx-auto space-y-6 text-gray-700 leading-relaxed font-serif text-xl md:text-[1.35rem]">
              <p>
                Nostalgia continues to dictate current trends, and nowhere is
                this more evident than in the revival of 90s television
                aesthetics. Iconic moments, like this classic scene featuring
                Monica and Rachel from FRIENDS, remind us that true style is
                cyclical. Their effortless, casual layering remains the ultimate
                blueprint for transitional dressing.
              </p>
            </div>

            {/* Shoppable Image 3 */}
            <ShoppableImage
              imageSrc={MULTIPERSON_IMAGE_2}
              products={MULTIPERSON_PRODUCTS_2}
              nativeWidth={700}
            />

            {/* Shoppable Video */}
            <div className="mt-12 md:mt-16">
              <div className="px-6 md:px-10 lg:px-0 lg:max-w-2xl lg:mx-auto mb-6">
                <h2 className="text-2xl md:text-3xl font-serif mb-2">
                  In Motion: The Campaign
                </h2>
                <p className="text-gray-600 text-lg md:text-xl">
                  Experience the collection's movement and weight in our
                  exclusive short film.
                </p>
              </div>
              <div>
                <ShoppableVideo />
              </div>
            </div>

            <div className="px-6 md:px-10 lg:px-0 lg:max-w-2xl lg:mx-auto mt-8 space-y-6 text-gray-700 leading-relaxed font-serif text-xl md:text-[1.35rem]">
              <p>
                Notice how the fabric behaves—how it catches the light, how it
                moves with the wearer rather than against them. This is the
                hallmark of true craftsmanship.
              </p>
              <p>
                In conclusion, investing in these structured staples ensures a
                wardrobe that transcends seasonal micro-trends, anchoring your
                aesthetic in permanent style. They are not merely pieces you
                wear; they are pieces you live in, season after season.
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}
