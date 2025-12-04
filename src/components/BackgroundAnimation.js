// BackgroundAnimation.js
import React from 'react';
import '../components/styles.css';

const BackgroundAnimation = () => {
    const boxTypes = ['type-1', 'type-2', 'type-3', 'type-4', 'type-5', 'type-6'];
    const effects = ['', 'wave-effect', 'glow'];
    
    return (
        <div className="animation-background">
            {[...Array(15)].map((_, i) => {
                const boxType = boxTypes[i % boxTypes.length];
                const effect = effects[i % effects.length];
                
                return (
                    <div 
                        key={i} 
                        className={`floating-box ${boxType} ${effect}`}
                    ></div>
                );
            })}
        </div>
    );
};

export default BackgroundAnimation;