import axios from 'axios';

import { API_URL } from '../config';
import {generateHMAC, getCurrentEpochTime} from '../util';

const createReservation = async (reservationData) => {
    console.log('reservationData:',reservationData)
    try {
        const response = await axios.post(`${API_URL}/web-reservations/`, reservationData, { 
            headers: { "Authorization-HMAC" :  generateHMAC(null, getCurrentEpochTime()), "Timestamp" : getCurrentEpochTime()},
        });
        return response.data;
    } catch (error) {
        console.error('Error creating reservation:', error);
        return error.response.data;
    }
};

export { createReservation };
