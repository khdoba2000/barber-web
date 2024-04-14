import axios from 'axios';

import { API_URL } from '../config';

const fetchBarberPhotos = (barberId, date) => {
    try {
        const response = axios.get(`${API_URL}/clients/barbers/${barberId}/photos/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber Photos:', error);
        return null;
    }
};

export { fetchBarberPhotos };