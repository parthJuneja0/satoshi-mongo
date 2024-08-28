import React from 'react';
import Image from 'next/image';
import Coin from '../../assets/coin.png';
const QRCodeComponent = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Scan the QR Code to Access the App on Mobile</h2>
            <Image src={Coin} alt="QR Code" width={200} height={200} />
        </div>
    );
};

export default QRCodeComponent;
