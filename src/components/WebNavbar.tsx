import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Bell, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useProfile } from '../hooks/useProfile';

const WebNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { session } = useAuth();
    const { totalItems } = useCart();
    const { unreadCount } = useNotifications();
    const { data: profile } = useProfile();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setProfileOpen(false);
    }, [location.pathname]);

    const publicLinks = [
        { label: 'Inicio', path: '/' },
        { label: 'Marketplace', path: '/marketplace' },
        { label: 'Torneos', path: '/tournaments' },
        { label: 'Comunidad', path: '/community' },
    ];

    const authLinks = [
        { label: 'Inicio', path: '/dashboard' },
        { label: 'Marketplace', path: '/marketplace' },
        { label: 'Torneos', path: '/tournaments' },
        { label: 'Comunidad', path: '/community' },
        { label: 'Mi Tienda', path: '/my-store' },
    ];

    const navLinks = session ? authLinks : publicLinks;

    const isActive = (path: string) =>
        location.pathname === path || (path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path));

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
                background: scrolled
                    ? 'rgba(6, 6, 6, 0.95)'
                    : 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                backdropFilter: scrolled ? 'blur(30px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(30px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
                boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5)' : 'none',
            }}>
                <div style={{
                    maxWidth: 'var(--content-max-width)',
                    margin: '0 auto',
                    padding: '0 20px',
                    height: 'var(--navbar-height)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {/* Logo */}
                    <Link to={session ? '/dashboard' : '/'} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                    }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: 'white',
                            padding: '2px',
                            border: '2px solid var(--secondary)',
                            boxShadow: '0 0 15px rgba(163, 230, 53, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 900,
                                color: 'var(--secondary)',
                                letterSpacing: '1px',
                            }}>
                                AG
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                                fontSize: '20px',
                                fontWeight: 800,
                                letterSpacing: '2px',
                                lineHeight: 1.1,
                                color: 'white',
                                textShadow: '0 0 10px rgba(163,230,53,0.15)'
                            }}>APEG</span>
                            <span style={{
                                fontSize: '9px',
                                fontWeight: 500,
                                color: 'var(--text-dim)',
                                letterSpacing: '0.5px',
                                marginTop: '-1px'
                            }}>Amor Por El Golf</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hide-mobile" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: isActive(link.path) ? 700 : 500,
                                    color: isActive(link.path) ? 'var(--secondary)' : 'rgba(255,255,255,0.7)',
                                    background: isActive(link.path) ? 'rgba(163,230,53,0.1)' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {session && (
                            <>
                                {/* Cart */}
                                <button
                                    onClick={() => navigate('/cart')}
                                    style={{
                                        color: 'rgba(255,255,255,0.7)',
                                        background: 'none',
                                        border: 'none',
                                        padding: '10px',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ShoppingBag size={20} />
                                    {totalItems > 0 && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '4px',
                                            right: '2px',
                                            background: 'var(--secondary)',
                                            color: 'var(--primary)',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            padding: '2px 5px',
                                            borderRadius: '10px',
                                            minWidth: '16px',
                                            height: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {totalItems}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications */}
                                <button
                                    onClick={() => navigate('/notifications')}
                                    style={{
                                        color: 'rgba(255,255,255,0.7)',
                                        background: 'none',
                                        border: 'none',
                                        padding: '10px',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Bell size={20} />
                                    {unreadCount > 0 && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '4px',
                                            right: '2px',
                                            background: '#ef4444',
                                            color: 'white',
                                            fontSize: '10px',
                                            fontWeight: 'bold',
                                            padding: '2px 5px',
                                            borderRadius: '10px',
                                            minWidth: '16px',
                                            height: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Profile Dropdown (Desktop) */}
                                <div className="hide-mobile" style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '4px 8px 4px 4px',
                                            borderRadius: '24px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    >
                                        <img
                                            src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=0E2F1F&color=A3E635`}
                                            alt="Perfil"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid var(--secondary)',
                                            }}
                                        />
                                        <ChevronDown size={14} color="rgba(255,255,255,0.5)" style={{
                                            transition: 'transform 0.2s',
                                            transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
                                        }} />
                                    </button>

                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                style={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '100%',
                                                    marginTop: '8px',
                                                    width: '220px',
                                                    background: 'rgba(6, 6, 6, 0.98)',
                                                    backdropFilter: 'blur(30px)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    borderRadius: '20px',
                                                    padding: '12px',
                                                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                                                }}
                                            >
                                                <div style={{
                                                    padding: '12px',
                                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                                    marginBottom: '4px',
                                                }}>
                                                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                                                        {profile?.full_name || 'Golfista'}
                                                    </div>
                                                    <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                                                        HCP: {profile?.handicap ?? '—'}
                                                    </div>
                                                </div>
                                                {[
                                                    { label: 'Mi Perfil', path: '/profile', icon: User },
                                                    { label: 'Mis Compras', path: '/my-purchases', icon: ShoppingBag },
                                                ].map(item => (
                                                    <button
                                                        key={item.path}
                                                        onClick={() => { navigate(item.path); setProfileOpen(false); }}
                                                        style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            padding: '10px 12px',
                                                            borderRadius: '10px',
                                                            fontSize: '13px',
                                                            fontWeight: 500,
                                                            color: 'rgba(255,255,255,0.8)',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'background 0.15s',
                                                        }}
                                                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                                    >
                                                        <item.icon size={16} />
                                                        {item.label}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={async () => {
                                                        const { supabase } = await import('../services/SupabaseManager');
                                                        await supabase.auth.signOut();
                                                        navigate('/');
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        padding: '10px 12px',
                                                        borderRadius: '10px',
                                                        fontSize: '13px',
                                                        fontWeight: 500,
                                                        color: '#f87171',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        marginTop: '4px',
                                                        borderTop: '1px solid rgba(255,255,255,0.06)',
                                                        paddingTop: '12px',
                                                    }}
                                                >
                                                    <LogOut size={16} />
                                                    Cerrar Sesión
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}

                        {!session && (
                            <div className="hide-mobile" style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
                                <button
                                    onClick={() => navigate('/auth')}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '12px',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: 'rgba(255,255,255,0.8)',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Iniciar Sesión
                                </button>
                                <button
                                    onClick={() => navigate('/auth')}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '12px',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        color: 'var(--primary)',
                                        background: 'var(--secondary)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 15px rgba(163,230,53,0.3)',
                                    }}
                                >
                                    Registrarse
                                </button>
                            </div>
                        )}

                        {/* Mobile Hamburger */}
                        <button
                            className="hide-desktop"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                color: 'white',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '4px',
                            }}
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0,0,0,0.6)',
                                zIndex: 998,
                            }}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '280px',
                                background: 'rgba(6,6,6,0.98)',
                                backdropFilter: 'blur(30px)',
                                zIndex: 999,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '80px 24px 32px',
                                borderLeft: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            {session && profile && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '24px',
                                    padding: '16px',
                                    borderRadius: '16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <img
                                        src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'U'}&background=0E2F1F&color=A3E635`}
                                        alt=""
                                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary)' }}
                                    />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>{profile.full_name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>HCP: {profile.handicap ?? '—'}</div>
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                {navLinks.map(link => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        style={{
                                            padding: '14px 16px',
                                            borderRadius: '12px',
                                            fontSize: '15px',
                                            fontWeight: isActive(link.path) ? 700 : 500,
                                            color: isActive(link.path) ? 'var(--secondary)' : 'rgba(255,255,255,0.7)',
                                            background: isActive(link.path) ? 'rgba(163,230,53,0.1)' : 'transparent',
                                            textDecoration: 'none',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {session && (
                                    <>
                                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
                                        <Link to="/profile" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Mi Perfil</Link>
                                        <Link to="/my-purchases" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Mis Compras</Link>
                                        <Link to="/settings" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Configuración</Link>
                                    </>
                                )}
                            </div>

                            {!session ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                                    <button
                                        onClick={() => navigate('/auth')}
                                        style={{
                                            width: '100%',
                                            padding: '14px',
                                            borderRadius: '14px',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            color: 'var(--primary)',
                                            background: 'var(--secondary)',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Iniciar Sesión
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={async () => {
                                        const { supabase } = await import('../services/SupabaseManager');
                                        await supabase.auth.signOut();
                                        navigate('/');
                                    }}
                                    style={{
                                        marginTop: 'auto',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '14px',
                                        borderRadius: '14px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: '#f87171',
                                        background: 'rgba(248,113,113,0.08)',
                                        border: '1px solid rgba(248,113,113,0.15)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <LogOut size={18} />
                                    Cerrar Sesión
                                </button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default WebNavbar;
