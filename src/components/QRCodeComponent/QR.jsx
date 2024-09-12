import React from 'react';
import Image from 'next/image';
// import Coin from '../../assets/coin.png';
import QR from '@/assets/qr.png';

const QRCodeComponent = () => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#1e1e1e', // Dark background
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '90px',
                background: 'linear-gradient(90deg, #ffec99, #ffcc00)', // Yellow gradient text
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', // Clip the gradient to the text
                letterSpacing: '1px',
            }}>
                Scan the QR Code to Access the App on Mobile
            </h2>

            {/* Adjusted size of the container */}
            <div style={{
                position: 'relative',
                width: '150px',
                height: '150px',
                // borderRadius: '50%',
                background: '#333', // Dark grey background for the image container
                // boxShadow: '0 0 50px 20px rgba(255, 223, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible', // Allow the image to overflow outside the div
                zIndex: '1', // Set z-index for the container
            }}>
                {/* Coin Image larger than the container */}
                <Image
                    src={QR}
                    alt="QR Code"
                    width={300} // Larger than the container width
                    height={300} // Larger than the container height
                    style={{
                        position: 'fixed', 
                        zIndex: '2',
                        borderRadius: '50%', // Make the image a perfect circle
                        overflow: 'hidden',
                        
                    }} 
                />
            </div>
        </div>
    );
};

export default QRCodeComponent;
