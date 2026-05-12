import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            background: 'linear-gradient(180deg, var(--primary) 0%, #061210 100%)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '60px',
            paddingBottom: '30px',
        }}>
            <div className="section-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px',
                marginBottom: '40px',
            }}>
                {/* Brand Column */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: 'white',
                            padding: '2px',
                            border: '2px solid var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 900,
                                color: 'var(--secondary)',
                            }}>AG</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '2px', color: 'white' }}>APEG</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '0.5px', marginTop: '-2px' }}>Amor Por El Golf</div>
                        </div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '280px' }}>
                        La plataforma definitiva para golfistas. Compra, vende, compite y conecta con la comunidad más grande de golf.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                        {[
                            { icon: Instagram, href: '#' },
                            { icon: Facebook, href: '#' },
                            { icon: Mail, href: 'mailto:contacto@apeg.golf' },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-dim)',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links Column */}
                <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                        Navegación
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { label: 'Marketplace', path: '/marketplace' },
                            { label: 'Torneos', path: '/tournaments' },
                            { label: 'Comunidad', path: '/community' },
                            { label: 'Iniciar Sesión', path: '/auth' },
                        ].map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.6)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Golf Column */}
                <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                        Golf
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { label: 'Registrar Ronda', path: '/play-mode' },
                            { label: 'Análisis de Swing', path: '/swing-analysis' },
                            { label: 'Green Fee', path: '/green-fee' },
                            { label: 'Mi Bolsa', path: '/my-bag' },
                        ].map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.6)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                        Contacto
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                            <MapPin size={16} style={{ flexShrink: 0 }} />
                            <span>Colombia</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                            <Mail size={16} style={{ flexShrink: 0 }} />
                            <span>contacto@apeg.golf</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                            <Phone size={16} style={{ flexShrink: 0 }} />
                            <span>+57 300 000 0000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="section-container">
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px' }}>
                        © 2026 APEG — Amor Por El Golf. Todos los derechos reservados.
                    </p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="#" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Términos</a>
                        <a href="#" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
