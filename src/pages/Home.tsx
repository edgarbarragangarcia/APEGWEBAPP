import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Loader2, CheckCircle2, ArrowLeft, ShoppingBag, MapPin, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase, optimizeImage } from '../services/SupabaseManager';
import { useProfile } from '../hooks/useProfile';
import { useFeaturedProducts, useUpcomingTournaments, useCategories } from '../hooks/useHomeData';

import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useInteractions } from '../hooks/useInteractions';
import PremiumProductCard from '../components/PremiumProductCard';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { warning } = useToast();
    const { id: productId } = useParams();
    const { data: featuredProducts = [], isLoading: featuredLoading } = useFeaturedProducts(); // No limit to fetch all
    const { data: tournaments = [] } = useUpcomingTournaments(3);

    const [activeTab, setActiveTab] = React.useState('Todo');
    const { user } = useAuth();
    const { addToCart } = useCart();
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
    const [showOfferModal, setShowOfferModal] = React.useState(false);
    const [offerAmount, setOfferAmount] = React.useState('');
    const [sendingOffer, setSendingOffer] = React.useState(false);
    const [offerSuccess, setOfferSuccess] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    // Interaction Tracking
    const { logView, logDuration } = useInteractions();
    const productStartTime = React.useRef<number | null>(null);

    // Track duration for selected product
    useEffect(() => {
        if (selectedProduct) {
            productStartTime.current = Date.now();
        } else {
            if (productStartTime.current && productId) {
                const duration = (Date.now() - productStartTime.current) / 1000;
                if (duration > 1) { // Only log if viewed for more than 1 second
                    logDuration('product', productId, duration);
                }
            }
            productStartTime.current = null;
        }
    }, [selectedProduct, productId, logDuration]);

    const productImages = React.useMemo(() => {
        if (!selectedProduct) return [];
        const imgs = [];
        if (selectedProduct.image_url) imgs.push(selectedProduct.image_url);
        if (selectedProduct.images && Array.isArray(selectedProduct.images)) {
            const additionalImgs = selectedProduct.images.filter((img: string) => img !== selectedProduct.image_url);
            imgs.push(...additionalImgs);
        }
        return imgs;
    }, [selectedProduct]);

    // Reset index when product changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedProduct]);

    // Redirect to My Purchases if legacy/notification parameters are present
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        const offerId = params.get('offer_id');

        if (offerId || tab === 'myorders' || tab === 'myoffers') {
            const redirectUrl = offerId ? `/my-purchases?offer_id=${offerId}` : '/my-purchases';
            navigate(redirectUrl, { replace: true });
        }
    }, [location.search, navigate]);

    // Handle initial product from URL
    useEffect(() => {
        if (productId) {
            if (featuredProducts.length > 0) {
                const product = featuredProducts.find(p => p.id === productId);
                if (product) {
                    setSelectedProduct(product);
                } else {
                    const fetchProduct = async () => {
                        try {
                            const { data } = await supabase.from('products').select('*').eq('id', productId).single();
                            if (data) setSelectedProduct(data);
                        } catch (err) {
                            console.error(err);
                        }
                    };
                    fetchProduct();
                }
            } else if (!featuredLoading) {
                const fetchProduct = async () => {
                    try {
                        const { data } = await supabase.from('products').select('*').eq('id', productId).single();
                        if (data) setSelectedProduct(data);
                    } catch (err) {
                        console.error(err);
                    }
                };
                fetchProduct();
            }
        } else {
            setSelectedProduct(null);
        }
    }, [productId, featuredProducts, featuredLoading]);

    const handleProductSelect = (product: any) => {
        setSelectedProduct(product);
        navigate(`/product/${product.id}`, { replace: false });
    };

    const handleCloseProduct = () => {
        setSelectedProduct(null);
        navigate('/', { replace: true });
    };

    // Auto-scroll for featured carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const container = carouselRef.current;
                const scrollAmount = container.clientWidth * 0.8; // Move 80% of width
                const maxScroll = container.scrollWidth - container.clientWidth;

                if (container.scrollLeft >= maxScroll - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 4000); // Every 4 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Removed buyer orders/offers fetching as it moved to Profile/MyPurchases
    }, [user]);



    const { data: categories = ['Todo'] } = useCategories(user?.id);

    const filteredProducts = featuredProducts.filter(product => {
        const matchesCategory = activeTab === 'Todo' ||
            (product.category || '').toLowerCase() === activeTab.toLowerCase();

        return matchesCategory;
    });

    const promotions = [
        {
            badge: "🎉 Oferta Especial",
            title: "Hasta 30% OFF en equipamiento",
            subtitle: "Descubre las mejores ofertas del mes",
            image: "/images/promos/clubs.png",
            color: "rgba(163, 230, 53, 0.4)"
        },
        {
            badge: "⭐ Premium",
            title: "Colección Exclusiva",
            subtitle: "Acceso anticipado a productos elite",
            image: "/images/promos/apparel.png",
            color: "rgba(212, 175, 55, 0.4)"
        },
        {
            badge: "⚡ Flash Sale",
            title: "Bolas Titliest Pro V1",
            subtitle: "20% de descuento adicional hoy",
            image: "/images/promos/balls.png",
            color: "rgba(59, 130, 246, 0.4)"
        },
        {
            badge: "👟 Nuevo Ingreso",
            title: "Calzado Performance 2024",
            subtitle: "Tracción avanzada para tu juego",
            image: "/images/promos/shoes.png",
            color: "rgba(236, 72, 153, 0.4)"
        },
        {
            badge: "🎒 Accesorios Elite",
            title: "Bolsas de Cuero Hand-made",
            subtitle: "Estilo y funcionalidad premium",
            image: "/images/promos/bags.png",
            color: "rgba(139, 92, 246, 0.4)"
        },
        {
            badge: "🆕 Nueva Temporada",
            title: "Guantes de Piel Natural",
            subtitle: "Siente cada golpe con precisión",
            image: "/images/promos/clubs.png", // Reusing image for 7th
            color: "rgba(245, 158, 11, 0.4)"
        }
    ];







    const isDeepLink = !!productId;
    const isWaitingForProduct = isDeepLink && !selectedProduct;
    // ───── Card configuration parameters ─────
    const cardConfig = {
        height: '480px',      // Más altas
        imageHeight: '300px', // Área de imagen más grande
        minWidth: '190px'     // Más pequeñas (estrechas)
    };

    return (
        <>
            <div style={{
                minHeight: '100vh',
                width: '100%',
                background: 'var(--primary)',
                paddingTop: 'var(--navbar-height)',
                overflowX: 'hidden'
            }}>
                {isWaitingForProduct && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 110000,
                        background: 'var(--primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px'
                    }}>
                        <Loader2 className="animate-spin" size={40} color="var(--secondary)" />
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: '600', opacity: 0.6 }}>Cargando producto...</span>
                    </div>
                )}

                <div style={{
                    opacity: isWaitingForProduct ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    width: '100%',
                }}>


                    {/* Fixed Header: Categories Sub-nav (Never moves) */}
                    <div style={{
                        position: 'fixed',
                        top: '100px', // New Navbar height
                        left: 0,
                        right: 0,
                        zIndex: 990,
                        background: 'var(--primary)',
                        padding: '5px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}>
                        <div className="main-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Category Tabs */}
                            <div style={{
                                display: 'flex',
                                gap: '25px',
                                overflowX: 'auto',
                                padding: '5px 0',
                                scrollbarWidth: 'none',
                            }}>
                                {categories.map((tab, idx) => (
                                    <button
                                        key={tab || `tab-${idx}`}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            logView('category', tab);
                                        }}
                                        style={{
                                            padding: '8px 0',
                                            background: 'transparent',
                                            color: activeTab === tab ? 'var(--secondary)' : 'rgba(255,255,255,0.7)',
                                            fontSize: '13px',
                                            fontWeight: activeTab === tab ? '700' : '400',
                                            border: 'none',
                                            borderBottom: activeTab === tab ? '2px solid var(--secondary)' : '2px solid transparent',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>



                    {/* Main content area */}
                    <div className="main-container" style={{ position: 'relative', zIndex: 10, paddingTop: '160px' }}>
                        
                        {/* Benefits Bar (ML Style) */}
                        <div style={{ 
                            background: 'white', 
                            borderRadius: '8px', 
                            padding: '20px', 
                            marginBottom: '40px',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            color: '#333'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShoppingBag size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Pago seguro</div>
                                    <div style={{ fontSize: '12px', opacity: 0.7 }}>Con todas las tarjetas</div>
                                </div>
                            </div>
                            <div style={{ width: '1px', height: '30px', background: '#eee' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Envíos rápidos</div>
                                    <div style={{ fontSize: '12px', opacity: 0.7 }}>A todo el país</div>
                                </div>
                            </div>
                            <div style={{ width: '1px', height: '30px', background: '#eee' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Compra protegida</div>
                                    <div style={{ fontSize: '12px', opacity: 0.7 }}>Garantía APEG</div>
                                </div>
                            </div>
                        </div>

                        {/* Promotions Carousel */}
                        <div ref={carouselRef} style={{ marginBottom: '40px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                {promotions.map((promo, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            minWidth: '320px',
                                            height: '180px',
                                            borderRadius: '20px',
                                            background: promo.color,
                                            padding: '25px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            color: 'white',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            scrollSnapAlign: 'start'
                                        }}
                                    >
                                        <div style={{ position: 'relative', zIndex: 2 }}>
                                            <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '8px', letterSpacing: '1px' }}>{promo.badge}</div>
                                            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: 0, lineHeight: 1.1 }}>{promo.title}</h3>
                                            <p style={{ fontSize: '13px', opacity: 0.8, margin: '8px 0 0 0' }}>{promo.subtitle}</p>
                                        </div>
                                        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '150px', height: '150px', backgroundImage: `url(${promo.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', opacity: 0.6 }} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div style={{ marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '24px' }}>
                                Productos <span style={{ color: 'var(--secondary)' }}>Destacados</span>
                            </h2>
                            <div className="product-grid" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: `repeat(auto-fill, minmax(${cardConfig.minWidth}, 1fr))`,
                                gap: '20px'
                            }}>
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id || `p-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <PremiumProductCard
                                            product={product}
                                            onAddToCart={addToCart}
                                            onClick={() => handleProductSelect(product)}
                                            cardHeight={cardConfig.height}
                                            cardImageHeight={cardConfig.imageHeight}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Tournaments */}
                        <div style={{ paddingBottom: '80px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Próximos Torneos</h3>
                                <button onClick={() => navigate('/tournaments')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer' }}>
                                    Ver calendario <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                                {tournaments.map((tournament, index) => (
                                    <div key={tournament.id || index} className="amazon-card" onClick={() => navigate('/tournaments')} style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center', cursor: 'pointer' }}>
                                        <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--primary-light)', backgroundImage: `url(${tournament.image_url})`, backgroundSize: 'cover' }} />
                                        <div>
                                            <div style={{ fontWeight: '800', color: 'white', fontSize: '16px' }}>{tournament.name}</div>
                                            <div style={{ color: 'var(--secondary)', fontSize: '13px', marginTop: '4px' }}>{new Date(tournament.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        key="product-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 100000,
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px',
                            pointerEvents: 'auto'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{
                                width: '100%',
                                maxWidth: '1100px',
                                height: '85vh',
                                background: 'var(--primary)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                display: 'flex',
                                position: 'relative',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
                            }}
                        >
                            <button onClick={handleCloseProduct} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ArrowLeft size={20} />
                            </button>

                            <div style={{ width: '55%', background: '#FFFFFF', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                                    <img src={optimizeImage(productImages[currentImageIndex], { width: 800, height: 800 })} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={selectedProduct.name} />
                                </div>
                                {productImages.length > 1 && (
                                    <div style={{ padding: '20px', display: 'flex', gap: '10px', justifyContent: 'center', background: 'rgba(0,0,0,0.02)' }}>
                                        {productImages.map((img, idx) => (
                                            <button key={idx} onClick={() => setCurrentImageIndex(idx)} style={{ width: '60px', height: '60px', borderRadius: '8px', border: idx === currentImageIndex ? '2px solid var(--secondary)' : '1px solid #ddd', overflow: 'hidden', padding: 0, background: 'white' }}>
                                                <img src={optimizeImage(img, { width: 100, height: 100 })} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ width: '45%', padding: '50px', display: 'flex', flexDirection: 'column', overflowY: 'auto', background: 'var(--bg-card)' }}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase' }}>{selectedProduct.brand}</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>• {selectedProduct.category}</span>
                                </div>
                                <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'white', marginBottom: '15px', lineHeight: '1.1' }}>{selectedProduct.name}</h1>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '30px' }}>
                                    <span style={{ fontSize: '18px', color: 'white' }}>$</span>
                                    <span style={{ fontSize: '42px', fontWeight: '800', color: 'white' }}>{Number(selectedProduct.price).toLocaleString()}</span>
                                </div>
                                <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Descripción</div>
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>{selectedProduct.description || 'Sin descripción.'}</p>
                                </div>
                                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <motion.button whileTap={{ scale: 0.98 }} onClick={() => { addToCart(selectedProduct); warning('Producto añadido'); }} style={{ width: '100%', padding: '18px', borderRadius: '12px', background: 'var(--secondary)', color: 'var(--primary)', fontSize: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <ShoppingCart size={20} /> AÑADIR AL CARRITO
                                    </motion.button>
                                    {selectedProduct.is_negotiable && (
                                        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setShowOfferModal(true)} style={{ width: '100%', padding: '18px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '16px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                                            HACER UNA OFERTA
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {showOfferModal && selectedProduct && (
                    <div key="offer-modal" style={{ position: 'fixed', inset: 0, zIndex: 110000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOfferModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} style={{ width: '100%', maxWidth: '500px', background: 'var(--primary)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '30px', position: 'relative', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {!offerSuccess ? (
                                <>
                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                                        <img src={selectedProduct.image_url || ''} style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }} alt="" />
                                        <div><h3 style={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>Nueva Oferta</h3><p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>{selectedProduct.name}</p></div>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '10px' }}>Tu propuesta</label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontWeight: '900', color: 'var(--secondary)', fontSize: '20px' }}>$</span>
                                            <input type="text" value={offerAmount} onChange={(e) => setOfferAmount(e.target.value.replace(/\D/g, ''))} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px 20px 20px 45px', color: 'white', fontSize: '28px', fontWeight: '900', outline: 'none' }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button onClick={() => setShowOfferModal(false)} style={{ flex: 1, padding: '18px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: '800' }}>CANCELAR</button>
                                        <button disabled={sendingOffer || !offerAmount} onClick={async () => {
                                            setSendingOffer(true);
                                            try {
                                                const { error } = await supabase.from('offers').insert([{ product_id: selectedProduct.id, buyer_id: user?.id, seller_id: selectedProduct.seller_id, offer_amount: parseFloat(offerAmount), status: 'pending' }]).select().single();
                                                if (error) throw error;
                                                setOfferSuccess(true);
                                                setTimeout(() => { setOfferSuccess(false); setShowOfferModal(false); setSelectedProduct(null); navigate('/', { replace: true }); }, 2000);
                                            } catch (err) { console.error(err); } finally { setSendingOffer(false); }
                                        }} className="btn-primary" style={{ flex: 2, width: 'auto' }}>{sendingOffer ? 'ENVIANDO...' : 'ENVIAR OFERTA'}</button>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <CheckCircle2 size={40} color="var(--secondary)" style={{ margin: '0 auto 25px' }} />
                                    <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>¡Propuesta Enviada!</h3>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Home;
