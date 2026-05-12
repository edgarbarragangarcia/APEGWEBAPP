import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trophy, Users, Activity, ChevronRight, Star, Shield, Zap, ArrowRight } from 'lucide-react';
import { useFeaturedProducts, useUpcomingTournaments } from '../hooks/useHomeData';
import PremiumProductCard from '../components/PremiumProductCard';
import Footer from '../components/Footer';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const }
    }),
};

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: products = [], isLoading: productsLoading } = useFeaturedProducts(8);
    const { data: tournaments = [] } = useUpcomingTournaments(3);

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
        <div style={{ background: 'var(--primary)', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Simple Landing Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '80px',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 40px',
                background: 'rgba(6, 20, 13, 0.4)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        color: 'var(--primary)',
                        fontSize: '18px'
                    }}>AG</div>
                    <span style={{ fontSize: '22px', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>APEG</span>
                </div>

                <button
                    onClick={() => navigate('/auth')}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '12px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'var(--secondary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    }}
                >
                    Ingresar
                </button>
            </header>

            {/* ═══════ HERO SECTION ═══════ */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
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
                        background: 'linear-gradient(135deg, rgba(14,47,31,0.9) 0%, rgba(14,47,31,0.7) 50%, rgba(14,47,31,0.95) 100%)',
                    }} />
                </div>

                {/* Animated Orbs */}
                <motion.div
                    animate={{ x: [-80, 80, -80], y: [-40, 60, -40], scale: [1, 1.3, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />
                <motion.div
                    animate={{ x: [60, -60, 60], y: [40, -80, 40], scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '10%',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
                        filter: 'blur(50px)',
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
                    paddingTop: '120px',
                    paddingBottom: '80px',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
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
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(36px, 7vw, 72px)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: '-2px',
                            color: 'white',
                            marginBottom: '20px',
                            maxWidth: '800px',
                        }}
                    >
                        Tu pasión por el golf,{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #A3E635, #10b981)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            en un solo lugar
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(16px, 2vw, 20px)',
                            color: 'rgba(255,255,255,0.7)',
                            maxWidth: '600px',
                            lineHeight: 1.7,
                            marginBottom: '36px',
                        }}
                    >
                        Marketplace de equipamiento, torneos, tracking de hándicap y la comunidad más grande de golfistas.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <button
                            onClick={() => navigate('/marketplace')}
                            style={{
                                padding: '16px 32px',
                                borderRadius: '16px',
                                fontSize: '15px',
                                fontWeight: 800,
                                color: 'var(--primary)',
                                background: 'linear-gradient(135deg, var(--secondary) 0%, #10b981 100%)',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 30px rgba(163,230,53,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Explorar Marketplace <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/auth')}
                            className="btn-outline"
                            style={{ padding: '16px 32px', borderRadius: '16px' }}
                        >
                            Crear Cuenta
                        </button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{
                            display: 'flex',
                            gap: '24px',
                            marginTop: '60px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        {stats.map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center', minWidth: '100px' }}>
                                <div style={{
                                    fontSize: 'clamp(24px, 3vw, 36px)',
                                    fontWeight: 900,
                                    color: 'var(--secondary)',
                                    lineHeight: 1,
                                }}>
                                    {stat.value}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.5)',
                                    fontWeight: 500,
                                    marginTop: '4px',
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════ FEATURES SECTION ═══════ */}
            <section style={{
                padding: '80px 0',
                background: 'linear-gradient(180deg, var(--primary) 0%, rgba(10,10,10,0.5) 100%)',
            }}>
                <div className="section-container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        style={{ textAlign: 'center', marginBottom: '48px' }}
                    >
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            style={{
                                fontSize: 'clamp(28px, 4vw, 44px)',
                                fontWeight: 900,
                                color: 'white',
                                letterSpacing: '-1px',
                                marginBottom: '12px',
                            }}
                        >
                            Todo lo que necesitas para{' '}
                            <span className="gradient-text">tu juego</span>
                        </motion.h2>
                        <motion.p
                            custom={1}
                            variants={fadeUp}
                            style={{
                                fontSize: '16px',
                                color: 'var(--text-dim)',
                                maxWidth: '500px',
                                margin: '0 auto',
                            }}
                        >
                            Desde equipamiento hasta torneos, tenemos todo cubierto.
                        </motion.p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '20px',
                    }}>
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
                                style={{
                                    padding: '32px',
                                    borderRadius: '24px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    backdropFilter: 'blur(10px)',
                                    cursor: 'default',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '16px',
                                    background: feature.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                }}>
                                    <feature.icon size={24} color={feature.iconColor} />
                                </div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 800,
                                    color: 'white',
                                    marginBottom: '8px',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    fontSize: '14px',
                                    color: 'var(--text-dim)',
                                    lineHeight: 1.6,
                                }}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ FEATURED PRODUCTS SECTION ═══════ */}
            <section style={{
                padding: '80px 0',
                background: 'var(--primary)',
            }}>
                <div className="section-container">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '32px',
                        flexWrap: 'wrap',
                        gap: '12px',
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: 'clamp(24px, 3.5vw, 40px)',
                                fontWeight: 900,
                                color: 'white',
                                letterSpacing: '-1px',
                            }}>
                                Productos{' '}
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Destacados</span>
                            </h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginTop: '4px' }}>
                                Los más recientes del marketplace
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/marketplace')}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '14px',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                                padding: '10px 20px',
                                borderRadius: '14px',
                            }}
                        >
                            Ver todo <ChevronRight size={16} />
                        </motion.button>
                    </div>

                    {productsLoading ? (
                        <div className="product-grid">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        height: '300px',
                                        borderRadius: '24px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }}
                                    className="skeleton-shimmer"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="product-grid">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id || `p-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <PremiumProductCard
                                        product={product}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════ TOURNAMENTS SECTION ═══════ */}
            {tournaments.length > 0 && (
                <section style={{
                    padding: '80px 0',
                    background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, var(--primary) 100%)',
                }}>
                    <div className="section-container">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '32px',
                            flexWrap: 'wrap',
                            gap: '12px',
                        }}>
                            <h2 style={{
                                fontSize: 'clamp(24px, 3.5vw, 40px)',
                                fontWeight: 900,
                                color: 'white',
                                letterSpacing: '-1px',
                            }}>
                                Torneos{' '}
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Próximos</span>
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/tournaments')}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    cursor: 'pointer',
                                    padding: '10px 20px',
                                    borderRadius: '14px',
                                }}
                            >
                                Calendario <ChevronRight size={16} />
                            </motion.button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '16px',
                        }}>
                            {tournaments.map((tournament: any, index: number) => (
                                <motion.div
                                    key={tournament.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    onClick={() => navigate('/tournaments')}
                                    style={{
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'center',
                                        padding: '20px',
                                        borderRadius: '24px',
                                        background: 'rgba(255,255,255,0.03)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '18px',
                                        backgroundImage: tournament.image_url ? `url(${tournament.image_url})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        flexShrink: 0,
                                    }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: '16px', color: 'white', marginBottom: '4px', letterSpacing: '-0.3px' }}>
                                            {tournament.name}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {new Date(tournament.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.3)',
                                        flexShrink: 0,
                                    }}>
                                        <ChevronRight size={18} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ CTA SECTION ═══════ */}
            <section style={{
                padding: '100px 0',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(163,230,53,0.06) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }} />

                <div className="section-container" style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            maxWidth: '700px',
                            margin: '0 auto',
                            padding: '60px 40px',
                            borderRadius: '32px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '20px',
                        }}>
                            <Shield size={20} color="#A3E635" />
                            <Zap size={20} color="#D4AF37" />
                            <Trophy size={20} color="#3B82F6" />
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(24px, 4vw, 40px)',
                            fontWeight: 900,
                            color: 'white',
                            letterSpacing: '-1px',
                            marginBottom: '12px',
                        }}>
                            Únete a la comunidad APEG
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: 'var(--text-dim)',
                            maxWidth: '500px',
                            margin: '0 auto 28px',
                            lineHeight: 1.6,
                        }}>
                            Miles de golfistas ya confían en nosotros. Crea tu cuenta gratis y empieza a disfrutar de todas las herramientas.
                        </p>
                        <button
                            onClick={() => navigate('/auth')}
                            style={{
                                padding: '16px 40px',
                                borderRadius: '16px',
                                fontSize: '15px',
                                fontWeight: 800,
                                color: 'var(--primary)',
                                background: 'linear-gradient(135deg, var(--secondary) 0%, #10b981 100%)',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 30px rgba(163,230,53,0.3)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            Crear Cuenta Gratis <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <Footer />
        </div>
    );
};

export default LandingPage;
