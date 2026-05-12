import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/SupabaseManager';
import { Mail, Lock, User, Loader2, ArrowRight, Phone, Award, Hash, Trophy, Activity, Zap, Users, Eye, EyeOff } from 'lucide-react';


const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        handicap: '',
        federationCode: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const features = [
        { icon: Trophy, label: 'Torneos' },
        { icon: Activity, label: 'Hándicap' },
        { icon: Zap, label: 'Resultados' },
        { icon: Users, label: 'Comunidad' }
    ];

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // --- SOLUCIÓN RADICAL: Si es LOCALHOST, usar FETCH PROXY de inmediato ---
        if (import.meta.env.DEV && isLogin) {
            console.log('--- MODO DE RESILIENCIA ACTIVADO: Usando bypass de red ---');
            try {
                const { manualLogin } = await import('../services/SupabaseManager');
                const authData = await manualLogin(formData.email, formData.password);

                if (authData.access_token) {
                    const { error: sessionError } = await supabase.auth.setSession({
                        access_token: authData.access_token,
                        refresh_token: authData.refresh_token
                    });
                    if (sessionError) throw sessionError;
                    return; // ÉXITO TOTAL
                }
            } catch (err: any) {
                console.error('Fallo en Bypass:', err);
                setError('Error crítico de red en tu sistema. Supabase no responde.');
            } finally {
                setLoading(false);
            }
            return;
        }

        // Si no es dev o es registro, usar flujo normal (con timeout)
        const authPromise = isLogin
            ? supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            : supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        handicap: formData.handicap,
                        federation_code: formData.federationCode,
                        phone: formData.phone
                    }
                }
            });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('La conexión está tardando demasiado. Revisa tu conexión o extensiones del navegador.')), 10000)
        );

        try {
            const { error }: any = await Promise.race([authPromise, timeoutPromise]);
            if (error) throw error;
            if (!isLogin && !error) {
                setError('¡Registro exitoso! Por favor revisa tu correo para confirmar.');
            }
        } catch (err: any) {
            console.error('Auth Error:', err);

            // BYPASS LOGIC: Si es un timeout o error de conexión, intentar login directo
            if (isLogin && (err.message.includes('tardando') || err.message.includes('timeout') || err.message.includes('bloqueadas'))) {
                console.log('--- INICIANDO BYPASS DE SEGURIDAD (DIRECT FETCH) ---');
                try {
                    const { manualLogin } = await import('../services/SupabaseManager');
                    const authData = await manualLogin(formData.email, formData.password);

                    if (authData.access_token) {
                        console.log('--- BYPASS EXITOSO ---');
                        const { error: sessionError } = await supabase.auth.setSession({
                            access_token: authData.access_token,
                            refresh_token: authData.refresh_token
                        });
                        if (sessionError) throw sessionError;
                        return; // Éxito, el AuthProvider detectará el cambio
                    }
                } catch (bypassErr: any) {
                    console.error('Bypass failed:', bypassErr);
                    setError(`Error crítico: ${bypassErr.message}. Tu navegador bloquea toda conexión a la base de datos.`);
                }
            } else {
                setError(err.message || 'Error de conexión. Las peticiones están siendo bloqueadas por tu navegador.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{
            minHeight: '100dvh',
            width: '100%',
            display: 'flex',
            fontFamily: '"Outfit", sans-serif',
            background: 'var(--primary)',
            overflow: 'hidden'
        }}>
            {/* Left Side - Image/Branding (Hidden on mobile) */}
            <div className="hide-mobile" style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                overflow: 'hidden'
            }}>
                <img
                    src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200"
                    alt="Golf background"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.4
                    }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(14, 47, 31, 0.9) 0%, rgba(14, 47, 31, 0.6) 100%)'
                }} />
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}
                >
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'white',
                        padding: '3px',
                        border: '3px solid var(--secondary)',
                        boxShadow: '0 0 20px rgba(163, 230, 53, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '32px',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            fontWeight: 900,
                            color: 'var(--secondary)',
                        }}>AG</div>
                    </div>
                    <h1 style={{
                        fontSize: '48px',
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.1,
                        marginBottom: '20px',
                        letterSpacing: '-1px'
                    }}>
                        Amor Por El <span className="gradient-text">Golf</span>
                    </h1>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.6,
                        marginBottom: '40px'
                    }}>
                        Únete a la comunidad de golfistas más activa. Marketplace premium, torneos locales y tracking de hándicap.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {features.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'rgba(163, 230, 53, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <item.icon size={20} color="var(--secondary)" />
                                </div>
                                <span style={{ color: 'white', fontWeight: 600 }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Auth Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 20px',
                position: 'relative',
                background: 'rgba(10, 10, 10, 0.4)',
                backdropFilter: 'blur(20px)'
            }}>
                {/* Mobile Animated Background Blobs */}
                <div className="hide-desktop">
                    <motion.div
                        animate={{ x: [-50, 50, -50], y: [-20, 40, -20] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            top: '10%',
                            right: '-10%',
                            width: '300px',
                            height: '300px',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.08) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                            zIndex: -1,
                        }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Mobile Logo */}
                    <div className="hide-desktop" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'white',
                            padding: '2px',
                            border: '2px solid var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, color: 'var(--secondary)' }}>AG</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                        </h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '15px' }}>
                            {isLogin ? 'Ingresa tus datos para continuar' : 'Únete a la plataforma definitiva de golf'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    key="register-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input
                                            id="full-name"
                                            type="text"
                                            placeholder="Nombre Completo"
                                            required={!isLogin}
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            style={inputStyle}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div style={{ position: 'relative' }}>
                                            <Award size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                            <input
                                                id="handicap"
                                                type="number"
                                                placeholder="Hándicap"
                                                required={!isLogin}
                                                value={formData.handicap}
                                                onChange={(e) => setFormData({ ...formData, handicap: e.target.value })}
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <Hash size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                            <input
                                                type="text"
                                                placeholder="Código Fed."
                                                required={!isLogin}
                                                value={formData.federationCode}
                                                onChange={(e) => setFormData({ ...formData, federationCode: e.target.value })}
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ position: 'relative' }}>
                                        <Phone size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="Teléfono Celular"
                                            required={!isLogin}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            style={inputStyle}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ position: 'relative' }}>
                            <Mail size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                id="email"
                                type="email"
                                placeholder="Correo Electrónico"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    fontSize: '13px',
                                    color: error.includes('exitoso') ? '#4ade80' : '#f87171',
                                    background: error.includes('exitoso') ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: `1px solid ${error.includes('exitoso') ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.01, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ marginTop: '8px', fontSize: '15px', padding: '16px' }}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-dim)',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'white'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                        >
                            {isLogin ? (
                                <span>¿Nuevo en APEG? <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Regístrate</span></span>
                            ) : (
                                <span>¿Ya tienes cuenta? <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Inicia Sesión</span></span>
                            )}
                        </button>

                        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                        <button
                            disabled={true}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'white',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                opacity: 0.5
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continuar con Google
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Extracted styles and handlers
const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontSize: '13px',
    fontWeight: '400',
    outline: 'none',
    transition: 'all 0.3s ease'
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'var(--secondary)';
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
};

export default Auth;

