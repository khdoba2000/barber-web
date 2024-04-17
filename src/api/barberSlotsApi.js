import axios from 'axios';

import { API_URL } from '../config';

const fetchAvailableSlots = async (barberId, date) => {
    try {
        const response = await axios.get(`${API_URL}/clients/barber/${barberId}/${date}/slots/`);
        console.log('Barber Slots:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber slots:', error);
        return null;
    }
};

export { fetchAvailableSlots };