import React, { useState } from 'react';
import { sendVerificationCode } from '../api/sendCodeApi';

const VerifyPhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleVerify = async () => {
        const response = await sendVerificationCode(phoneNumber, code);
        setMessage(response ? 'Verification successful!' : 'Verification failed.');
    };

    return (
        <div>
            <h1>Verify Phone Number</h1>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleVerify}>Verify</button>
            <p>{message}</p>
        </div>
    );
};

export default VerifyPhoneNumber;
