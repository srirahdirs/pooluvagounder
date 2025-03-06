import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const Upi = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        // Adjusted UPI Link for proper format
        const upiLink = `upi://pay?pa=9789253515@upi&pn=YoungZenTechnologies&tn=PaymentForOrder123&am=1&cu=INR`;

        // Generate the QR Code and set it to the state
        QRCode.toDataURL(upiLink, (err, url) => {
            if (err) {
                console.error('Error generating QR Code:', err);
            } else {
                setQrCodeUrl(url); // Set the generated QR code URL
            }
        });
    }, []);

    return (
        <div>
            <h2>Pay via UPI</h2>
            {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="UPI Payment QR Code" />
            ) : (
                <p>Generating QR Code...</p>
            )}
        </div>
    );
};

export default Upi;
