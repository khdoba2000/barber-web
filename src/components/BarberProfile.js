import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBarberProfile } from '../api/barberProfileApi';

const BarberProfile = () => {
    const { id } = useParams(); // Get the ID parameter from the URL path
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getBarberProfile = async () => {
            const data = await fetchBarberProfile(id);
            setProfile(data);
        };
        getBarberProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.fullname}</h1>
            <img src={profile.profile_photo} alt="Barber Profile" />
            <p>{profile.bio}</p>
            <p>Profile data</p>
            
            {/* Render other profile details */}
        </div>
    );
};

export default BarberProfile;