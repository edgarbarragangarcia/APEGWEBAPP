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
    cardHeight = '480px',
    cardImageHeight = '300px'
}) => {
    const { likedProducts, toggleLike } = useLikes();
    const isLiked = likedProducts.has(product.id);

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                width: '100%',
                height: '100%',
                minHeight: cardHeight,
                boxSizing: 'border-box',
                background: '#FFFFFF',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #EEEEEE',
                transition: 'all 0.3s ease'
            }}
        >
            {/* Image Container - ML style */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: cardImageHeight,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderBottom: '1px solid #F5F5F5',
                padding: '10px'
            }}>
                <img
                    src={optimizeImage(product.image_url, { width: 500, height: 500 })}
                    alt={product.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=500';
                    }}
                />

                {/* Heart Icon (ML style subtle) */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
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
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #EEE',
                            color: isLiked ? '#3483FA' : '#CCC', // ML Blue for like
                            cursor: 'pointer'
                        }}
                    >
                        <Heart size={16} fill={isLiked ? '#3483FA' : 'none'} />
                    </button>
                </div>
            </div>

            {/* Info Section - ML style */}
            <div style={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: 'white'
            }}>
                {/* Product Name (ML style: truncated) */}
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#333333',
                    lineHeight: '1.2',
                    margin: '0 0 8px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {product.name}
                </h3>

                <div style={{ marginTop: '4px' }}>
                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '400',
                            color: '#333333',
                        }}>
                            $ {Number(product.price).toLocaleString()}
                        </span>
                    </div>
                    
                    {/* Offers / Installments */}
                    <div style={{
                        fontSize: '13px',
                        color: '#333',
                        marginTop: '4px'
                    }}>
                        en <span style={{ fontWeight: '500' }}>12x $ {(Number(product.price)/12).toLocaleString(undefined, {maximumFractionDigits: 0})} sin interés</span>
                    </div>

                    {/* Free Shipping (ML green) */}
                    <div style={{
                        fontSize: '14px',
                        color: '#00A650', // ML Green
                        fontWeight: '600',
                        marginTop: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span>Envío gratis</span>
                        {product.is_negotiable && <span style={{ color: '#00A650', fontSize: '12px', fontWeight: 'bold' }}>FULL</span>}
                    </div>
                </div>

                {/* Star rating placeholder (ML style) */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {[1,2,3,4,5].map(i => <div key={i} style={{ width: '10px', height: '10px', background: '#3483FA', borderRadius: '50%', opacity: 0.8 }} />)}
                    <span style={{ fontSize: '11px', color: '#999', marginLeft: '4px' }}>124</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PremiumProductCard;
