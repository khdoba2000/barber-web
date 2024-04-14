import axios from 'axios';

import { API_URL } from '../config';

const sendVerificationCode = async (phoneNumber, code) => {
    try {
        const response = await axios.post(`${API_URL}/send-code/verify/${phoneNumber}/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error sending verification code:', error);
        return null;
    }
};

export { sendVerificationCode };