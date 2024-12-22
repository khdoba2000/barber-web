import axios from 'axios';

import { API_URL } from '../config';

import {dateFormatter} from '../util';
import {generateHMAC, getCurrentEpochTime} from '../util';


const fetchAvailableSlots = async (barberId, date, selectedServices) => {
    try {
       
        const serviceIDs = selectedServices.map((service) => service.id)
        console.log('Fetching slots serviceIDs:', serviceIDs);
        const response = await axios.get(`${API_URL}/clients/barber/${barberId}/${dateFormatter(date)}/slots/?service_ids=${serviceIDs}`, { 
            headers: { "Authorization-HMAC" :  generateHMAC(null, getCurrentEpochTime()), "Timestamp" : getCurrentEpochTime()},
        });
        console.log('api: barber Slots:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber slots:', error);
        return null;
    }
};

export { fetchAvailableSlots };