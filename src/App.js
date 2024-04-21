import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BarberProfile from './components/BarberProfile';
// import BarberSlots from './components/BarberSlots';
import BookingPage from './components/BookingPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/barbers/:id" element={<BarberProfile />} />
                {/* <Route path="/slots" element={<BarberSlots />} /> */}
                <Route path="/booking/:id" element={<BookingPage />} />
            </Routes>
        </Router>
    );
};

export default App;
