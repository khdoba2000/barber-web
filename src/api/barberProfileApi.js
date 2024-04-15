import axios from 'axios';

import { API_URL } from '../config';

const fetchBarberProfile = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/clients/barbers/${id}/profile/`);
        console.log('Barber profile:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching barber profile:', error);
        return null;
    }
};

export { fetchBarberProfile };