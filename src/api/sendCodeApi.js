import axios from 'axios';

import { API_URL } from '../config';

const sendVerificationCode = async (phoneNumber, code) => {
    try {
        const response = await axios.post(
            `${API_URL}/send-code/`, 
           {"phone_number": '+998905741148'},
            { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true} }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending verification code:', error);
        return null;
    }
};


const verifyVerificationCode = async (phoneNumber, code) => {
    phoneNumber= '+998905741148'
    try {
        const response = await axios.get(`${API_URL}/verify/${phoneNumber}/${code}/`);
        return response.data;
    } catch (error) {
        console.error('Error verifying code:', error);
        return null;
    }
};
export { verifyVerificationCode, sendVerificationCode }