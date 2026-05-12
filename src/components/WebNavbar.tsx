import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Bell, User, ChevronDown, Search, MapPin } from 'lucide-react';
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
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Close mobile menu on route change
    useEffect(() => {
        setProfileOpen(false);
    }, [location.pathname]);

    const publicLinks = [
        { label: 'Categorías', path: '/marketplace' },
        { label: 'Torneos', path: '/tournaments' },
        { label: 'Comunidad', path: '/community' },
        { label: 'Ayuda', path: '/help' },
    ];

    const authLinks = [
        { label: 'Categorías', path: '/marketplace' },
        { label: 'Ofertas', path: '/marketplace?offers=true' },
        { label: 'Torneos', path: '/tournaments' },
        { label: 'Comunidad', path: '/community' },
        { label: 'Vender', path: '/my-store' },
    ];

    const navLinks = session ? authLinks : publicLinks;

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: 'var(--primary)', // #06140D Forest Green
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                height: '100px', // Taller for two rows
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '8px 20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    {/* Top Row: Logo, Search, Header Items */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                        {/* Logo */}
                        <Link to={session ? '/dashboard' : '/'} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textDecoration: 'none',
                            minWidth: '120px'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 900,
                                color: 'var(--primary)',
                            }}>
                                AG
                            </div>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: 800,
                                color: 'white',
                                letterSpacing: '1px'
                            }}>APEG</span>
                        </Link>

                        {/* Search Bar (Mercado Libre Style) */}
                        <div style={{
                            flex: 1,
                            maxWidth: '600px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <input
                                type="text"
                                placeholder="Buscar productos, marcas y más..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 45px 10px 15px',
                                    borderRadius: '2px',
                                    border: 'none',
                                    fontSize: '14px',
                                    background: 'white',
                                    color: '#333',
                                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)',
                                    outline: 'none'
                                }}
                            />
                            <button style={{
                                position: 'absolute',
                                right: '0',
                                height: '100%',
                                width: '45px',
                                background: 'transparent',
                                border: 'none',
                                borderLeft: '1px solid #eee',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666',
                                cursor: 'pointer'
                            }}>
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Banner Ad / Promotional text (ML style) */}
                        <div className="hide-mobile" style={{
                            fontSize: '12px',
                            color: 'white',
                            opacity: 0.8,
                            maxWidth: '150px',
                            textAlign: 'right'
                        }}>
                            <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>APEG Prime</span> disfruta envíos gratis
                        </div>
                    </div>

                    {/* Bottom Row: Location, Links, User Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                            {/* Location */}
                            <div className="hide-mobile" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}>
                                <MapPin size={16} color="var(--secondary)" />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '10px', opacity: 0.6 }}>Ingresa tu</span>
                                    <span>ubicación</span>
                                </div>
                            </div>

                            {/* Nav Links */}
                            <div className="hide-mobile" style={{ display: 'flex', gap: '20px' }}>
                                {navLinks.map(link => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        style={{
                                            fontSize: '13px',
                                            color: 'rgba(255,255,255,0.7)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'white'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* User Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {session ? (
                                <>
                                    <div className="hide-mobile" style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setProfileOpen(!profileOpen)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'rgba(255,255,255,0.8)',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                padding: '5px'
                                            }}
                                        >
                                            <User size={16} />
                                            {profile?.full_name?.split(' ')[0] || 'Usuario'}
                                            <ChevronDown size={12} />
                                        </button>
                                        <AnimatePresence>
                                            {profileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        right: 0,
                                                        width: '180px',
                                                        background: 'white',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                        overflow: 'hidden',
                                                        marginTop: '8px',
                                                        zIndex: 1100
                                                    }}
                                                >
                                                    <Link to="/profile" style={{ display: 'block', padding: '12px 15px', fontSize: '13px', color: '#333', textDecoration: 'none' }}>Mi Perfil</Link>
                                                    <Link to="/my-purchases" style={{ display: 'block', padding: '12px 15px', fontSize: '13px', color: '#333', textDecoration: 'none' }}>Mis Compras</Link>
                                                    <button 
                                                        onClick={async () => {
                                                            const { supabase } = await import('../services/SupabaseManager');
                                                            await supabase.auth.signOut();
                                                            navigate('/');
                                                        }}
                                                        style={{ width: '100%', textAlign: 'left', padding: '12px 15px', fontSize: '13px', color: '#f44336', background: 'transparent', border: 'none', borderTop: '1px solid #eee', cursor: 'pointer' }}
                                                    >
                                                        Cerrar sesión
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <Link to="/notifications" style={{ color: 'rgba(255,255,255,0.8)', position: 'relative' }}>
                                        <Bell size={20} />
                                        {unreadCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#f44336', color: 'white', fontSize: '10px', padding: '1px 4px', borderRadius: '10px' }}>{unreadCount}</span>}
                                    </Link>
                                    <Link to="/cart" style={{ color: 'rgba(255,255,255,0.8)', position: 'relative' }}>
                                        <ShoppingBag size={20} />
                                        {totalItems > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--secondary)', color: 'var(--primary)', fontSize: '10px', padding: '1px 4px', borderRadius: '10px', fontWeight: 'bold' }}>{totalItems}</span>}
                                    </Link>
                                </>
                            ) : (
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Link to="/auth" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Crea tu cuenta</Link>
                                    <Link to="/auth" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Ingresa</Link>
                                    <Link to="/marketplace" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Mis compras</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Bar (Only shown on mobile) */}
            <div className="hide-desktop" style={{
                position: 'fixed',
                top: '100px',
                left: 0,
                right: 0,
                zIndex: 999,
                padding: '10px 20px',
                background: 'var(--primary)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        style={{
                            width: '100%',
                            padding: '8px 35px 8px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '14px',
                            background: 'white'
                        }}
                    />
                    <Search size={16} color="#666" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
            </div>
        </>
    );
};

export default WebNavbar;
