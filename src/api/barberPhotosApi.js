import axios from 'axios';

import { API_URL } from '../config';

const fetchBarberPhotos = async (barberId) => {
    try {
        const response = await axios.get(`${API_URL}/clients/barbers/${barberId}/photos/`);
        console.log('Barber Photos:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber Photos:', error);
        return null;
    }
};

export { fetchBarberPhotos };