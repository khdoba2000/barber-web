import axios from 'axios';

import { API_URL } from '../config';

const fetchBarberSlots = async (barberId, date) => {
    try {
        const response = await axios.get(`${API_URL}/clients/barber/${barberId}/${date}/slots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber slots:', error);
        return null;
    }
};

export { fetchBarberSlots };