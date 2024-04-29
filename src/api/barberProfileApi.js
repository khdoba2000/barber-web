import axios from 'axios';
import {generateHMAC, getCurrentEpochTime} from '../util';

import { API_URL } from '../config';


const fetchBarberProfile = async (id) => {
    try {
        console.log('API_URL:', API_URL);
        const response = await axios.get(`${API_URL}/clients/barbers/${id}/profile/`, { 
            headers: { "Authorization-HMAC" :  generateHMAC(null, getCurrentEpochTime()), "Timestamp" : getCurrentEpochTime()},
        });
        console.log('Barber profile:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber profile:', error);
        return null;
    }
};

export { fetchBarberProfile };