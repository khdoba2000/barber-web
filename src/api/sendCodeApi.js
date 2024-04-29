import axios from 'axios';

import { API_URL } from '../config';
import {generateHMAC, getCurrentEpochTime} from '../util';

const sendVerificationCode = async (phoneNumber) => {
    try {
        const response = await axios.post(
            `${API_URL}/send-code/`, 
           {"phone_number": phoneNumber},
           { 
            headers: { "Authorization-HMAC" :  generateHMAC(null, getCurrentEpochTime()), "Timestamp" : getCurrentEpochTime()},
         }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending verification code:', error);
        return null;
    }
};


const verifyVerificationCode = async (phoneNumber, code) => {
    try {
        const response = await axios.get(`${API_URL}/verify/${phoneNumber}/${code}/`, { 
            headers: { "Authorization-HMAC" :  generateHMAC(null, getCurrentEpochTime()), "Timestamp" : getCurrentEpochTime()},
        });
        return response.data;
    } catch (error) {
        console.error('Error verifying code:', error);
        return null;
    }
};
export { verifyVerificationCode, sendVerificationCode }