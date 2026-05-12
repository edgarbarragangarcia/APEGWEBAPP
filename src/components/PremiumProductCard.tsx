import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLikes } from '../hooks/useLikes';

import { optimizeImage } from '../services/SupabaseManager';

interface PremiumProductCardProps {
    product: any;
    onAddToCart?: (product: any) => void;
    onClick: () => void;
    cardHeight?: string;
    cardImageHeight?: string;
}

const PremiumProductCard: React.FC<PremiumProductCardProps> = ({ 
    product, 
    onClick, 
    cardHeight = '380px',
    cardImageHeight = '240px'
}) => {
    const { likedProducts, toggleLike } = useLikes();
    const isLiked = likedProducts.has(product.id);


    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="amazon-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                width: '100%',
                height: '100%',
                minHeight: cardHeight,
                boxSizing: 'border-box',
            }}
        >
            {/* Image Container - Amazon style (Pure background) */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: cardImageHeight,
                background: '#FFFFFF', // Amazon-style white background for product focus
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 1
            }}>
                <img
                    src={optimizeImage(product.image_url, { width: 500, height: 500 })}
                    alt={product.name}
                    style={{
                        width: '90%',
                        height: '90%',
                        objectFit: 'contain', // Amazon usually uses contain for products
                        transition: 'transform 0.4s ease'
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=500';
                    }}
                />

                {/* Negociable Badge */}
                {product.is_negotiable && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#FFD814', // Amazon-style yellow
                        color: '#0F1111',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        zIndex: 10,
                    }}>
                        OFERTA
                    </div>
                )}

                {/* Heart Icon */}
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
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #DDD',
                            color: isLiked ? '#B12704' : '#565959',
                            cursor: 'pointer'
                        }}
                    >
                        <Heart size={16} fill={isLiked ? '#B12704' : 'none'} />
                    </button>
                </div>
            </div>

            {/* Info Section - Clean & Structured */}
            <div style={{
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: 'var(--bg-card)'
            }}>
                <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--secondary)',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                }}>
                    {product.brand || 'APEG'}
                </span>

                <h3 style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: 'white',
                    lineHeight: '1.3',
                    margin: '0 0 10px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {product.name}
                </h3>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '12px', color: 'white', fontWeight: '400' }}>$</span>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: 'white',
                            letterSpacing: '-0.5px'
                        }}>
                            {Number(product.price).toLocaleString()}
                        </span>
                    </div>
                    
                    <div style={{
                        fontSize: '12px',
                        color: '#A0A0A0',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span>Envío gratis</span>
                        <span style={{ color: 'var(--secondary)', fontWeight: '700' }}>APEG Prime</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PremiumProductCard;
