import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trophy, Users, Activity, Star, ArrowRight } from 'lucide-react';
import { useFeaturedProducts } from '../hooks/useHomeData';
import PremiumProductCard from '../components/PremiumProductCard';
import Footer from '../components/Footer';

const Section: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; id?: string }> = ({ children, style, id }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);

    return (
        <motion.section
            ref={ref}
            id={id}
            style={{
                ...style,
                scale,
                rotateX,
                opacity,
                y,
                position: 'relative',
                perspective: '1000px',
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </motion.section>
    );
};

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: products = [] } = useFeaturedProducts(8);

    const features = [
        {
            icon: ShoppingBag,
            title: 'Marketplace',
            description: 'Compra y vende equipamiento de golf entre la comunidad. Palos, bolas, ropa y accesorios.',
            color: 'rgba(163, 230, 53, 0.15)',
            iconColor: '#A3E635',
        },
        {
            icon: Trophy,
            title: 'Torneos',
            description: 'Inscríbete y participa en torneos locales. Seguimiento de resultados en tiempo real.',
            color: 'rgba(212, 175, 55, 0.15)',
            iconColor: '#D4AF37',
        },
        {
            icon: Activity,
            title: 'Estadísticas',
            description: 'Registra tus rondas, trackea tu hándicap y analiza tu swing con inteligencia artificial.',
            color: 'rgba(59, 130, 246, 0.15)',
            iconColor: '#3B82F6',
        },
        {
            icon: Users,
            title: 'Comunidad',
            description: 'Conecta con otros golfistas, forma grupos de juego y comparte tu experiencia.',
            color: 'rgba(236, 72, 153, 0.15)',
            iconColor: '#EC4899',
        },
    ];

    const stats = [
        { value: '500+', label: 'Golfistas activos' },
        { value: '50+', label: 'Torneos este año' },
        { value: '1,200+', label: 'Productos vendidos' },
        { value: '15+', label: 'Campos afiliados' },
    ];

    return (
        <div style={{ background: '#06140D', minHeight: '100vh', overflowX: 'hidden' }}>
            
            {/* ═══════ HERO SECTION ═══════ */}
            <section style={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 10
            }}>
                {/* Background Image */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2000"
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.35,
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(6,20,13,0.9) 0%, rgba(6,20,13,0.7) 50%, rgba(6,20,13,0.95) 100%)',
                    }} />
                </div>

                {/* Animated Orbs */}
                <motion.div
                    animate={{ x: [-100, 100, -100], y: [-50, 80, -50], scale: [1, 1.4, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        right: '10%',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(163,230,53,0.12) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />

                {/* Hero Content */}
                <div className="section-container" style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 20px',
                            borderRadius: '40px',
                            background: 'rgba(163,230,53,0.1)',
                            border: '1px solid rgba(163,230,53,0.2)',
                            marginBottom: '24px',
                        }}
                    >
                        <Star size={14} color="#A3E635" />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--secondary)' }}>
                            La plataforma #1 de golf en Colombia
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(40px, 8vw, 90px)',
                            fontWeight: 950,
                            lineHeight: 0.95,
                            letterSpacing: '-4px',
                            color: 'white',
                            marginBottom: '25px',
                            maxWidth: '900px',
                        }}
                    >
                        Tu pasión por el golf,{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #A3E635, #10b981)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            evolucionada
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            fontSize: 'clamp(18px, 2.5vw, 24px)',
                            color: 'rgba(255,255,255,0.6)',
                            maxWidth: '700px',
                            lineHeight: 1.6,
                            marginBottom: '45px',
                            fontWeight: 400
                        }}
                    >
                        Marketplace premium, torneos exclusivos y la comunidad más grande de golfistas en un solo ecosistema.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        style={{
                            display: 'flex',
                            gap: '15px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(163,230,53,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/marketplace')}
                            style={{
                                padding: '20px 40px',
                                borderRadius: '20px',
                                fontSize: '16px',
                                fontWeight: 900,
                                color: 'var(--primary)',
                                background: 'linear-gradient(135deg, var(--secondary) 0%, #10b981 100%)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Explorar Marketplace <ArrowRight size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/auth')}
                            style={{ 
                                padding: '20px 40px', 
                                borderRadius: '20px', 
                                background: 'rgba(255,255,255,0.05)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                color: 'white', 
                                fontWeight: '800',
                                cursor: 'pointer' 
                            }}
                        >
                            Crear Cuenta
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/auth')}
                            style={{ 
                                padding: '20px 40px', 
                                borderRadius: '20px', 
                                background: 'transparent', 
                                border: '1px solid rgba(255,255,255,0.2)', 
                                color: 'white', 
                                fontWeight: '800',
                                cursor: 'pointer' 
                            }}
                        >
                            Ingresar
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: '40px', color: 'rgba(255,255,255,0.3)' }}
                >
                    <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--secondary), transparent)' }} />
                </motion.div>
            </section>

            {/* ═══════ SCROLLING SECTIONS ═══════ */}
            <div style={{ position: 'relative', zIndex: 5 }}>
                
                <Section style={{ padding: '120px 0' }}>
                    <div className="section-container">
                        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 950, color: 'white', marginBottom: '20px' }}>
                                Todo para tu <span className="gradient-text">mejor versión</span>
                            </h2>
                            <p style={{ fontSize: '18px', color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto' }}>
                                Un ecosistema diseñado por y para golfistas apasionados.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '25px',
                        }}>
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10, rotateY: 10 }}
                                    style={{
                                        padding: '40px',
                                        borderRadius: '32px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        backdropFilter: 'blur(20px)',
                                        perspective: '1000px'
                                    }}
                                >
                                    <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: feature.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                                        <feature.icon size={32} color={feature.iconColor} />
                                    </div>
                                    <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'white', marginBottom: '12px' }}>{feature.title}</h3>
                                    <p style={{ fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.7 }}>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section style={{ padding: '120px 0', background: 'rgba(255,255,255,0.01)' }}>
                    <div className="section-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', gap: '20px', flexWrap: 'wrap' }}>
                            <div>
                                <h2 style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 950, color: 'white' }}>
                                    Marketplace <span style={{ opacity: 0.3 }}>Premium</span>
                                </h2>
                                <p style={{ color: 'var(--text-dim)', marginTop: '10px' }}>Equipamiento de alto nivel a tu alcance.</p>
                            </div>
                            <motion.button whileHover={{ x: 5 }} onClick={() => navigate('/marketplace')} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                Ver todo el catálogo <ArrowRight size={20} />
                            </motion.button>
                        </div>

                        <div className="product-grid">
                            {products.map((product) => (
                                <motion.div key={product.id} whileHover={{ scale: 1.02 }}>
                                    <PremiumProductCard product={product} onClick={() => navigate(`/product/${product.id}`)} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section style={{ padding: '120px 0' }}>
                    <div className="section-container">
                        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                            <h2 style={{ fontSize: 'clamp(40px, 8vw, 120px)', fontWeight: 950, color: 'white', opacity: 0.05, position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                                COMUNIDAD APEG
                            </h2>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 950, color: 'white' }}>Números que hablan</h2>
                                <p style={{ color: 'var(--text-dim)', marginTop: '15px' }}>El crecimiento constante de nuestra red.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 950, color: 'var(--secondary)', letterSpacing: '-4px' }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section style={{ padding: '120px 0' }}>
                    <div className="section-container">
                        <div style={{ 
                            background: 'linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(16,185,129,0.1) 100%)',
                            padding: '80px 40px',
                            borderRadius: '48px',
                            border: '1px solid rgba(163,230,53,0.2)',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h2 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 950, color: 'white', marginBottom: '30px' }}>
                                    ¿Listo para tu próxima <span className="gradient-text">victoria</span>?
                                </h2>
                                <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 50px', lineHeight: 1.6 }}>
                                    Únete hoy mismo y accede a beneficios exclusivos, torneos y la mejor comunidad de golf en Colombia.
                                </p>
                                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('/auth')}
                                        style={{ padding: '20px 50px', borderRadius: '24px', background: 'white', color: 'black', fontWeight: 900, border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                    >
                                        Comenzar Ahora
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            {/* ═══════ FOOTER ═══════ */}
            <Footer />
        </div>
    );
};

export default LandingPage;
