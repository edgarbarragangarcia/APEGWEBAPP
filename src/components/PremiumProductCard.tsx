import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLikes } from '../hooks/useLikes';

import { optimizeImage } from '../services/SupabaseManager';

interface PremiumProductCardProps {
    product: any;
    onAddToCart?: (product: any) => void;
    onClick: () => void;
}

const PremiumProductCard: React.FC<PremiumProductCardProps> = ({ product, onClick }) => {
    const { likedProducts, toggleLike } = useLikes();
    const isLiked = likedProducts.has(product.id);


    return (
        <motion.div
            whileHover={{ y: -6 }}
            onClick={onClick}
            style={{
                background: 'transparent',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                width: '100%',
                minWidth: 0,
                boxSizing: 'border-box',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            {/* Image Container - Sleek box for the product */}
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1', // Uniform square container
                borderRadius: '20px',
                background: '#121212', // Pure deep gray
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '12px',
                zIndex: 1
            }}>
                <img
                    src={optimizeImage(product.image_url, { width: 500, height: 500 })}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                    }}
                    onMouseEnter={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=500';
                    }}
                />

                {/* Negociable Ribbon - Minimalist style */}
                {product.is_negotiable && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'var(--secondary)',
                        color: 'var(--primary)',
                        fontSize: '9px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        letterSpacing: '0.05em',
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(163, 230, 53, 0.3)',
                    }}>
                        Negociable
                    </div>
                )}

                {/* Heart Icon Overlay - Clean Glassmorphism */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 2
                }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(product.id);
                        }}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: isLiked ? '#ff4b4b' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Heart size={18} fill={isLiked ? '#ff4b4b' : 'none'} strokeWidth={isLiked ? 0 : 2} />
                    </button>
                </div>
            </div>

            {/* Info Section - Clean Typography */}
            <div style={{
                padding: '0 4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {product.brand || 'APEG GOLF'}
                    </span>
                    <span style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        color: 'var(--secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        opacity: 0.8
                    }}>
                        {product.category}
                    </span>
                </div>

                <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    lineHeight: '1.4',
                    margin: '2px 0 6px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    letterSpacing: '-0.01em'
                }}>
                    {product.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        letterSpacing: '-0.02em'
                    }}>
                        ${Number(product.price).toLocaleString()}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default PremiumProductCard;
