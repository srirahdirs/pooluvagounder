import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext

const Logout = () => {
    const navigate = useNavigate();
    const { setUser, setIsLoggedIn } = useAuth(); // Destructure setUser and setIsLoggedIn from context

    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');

        // Set user to null and isLoggedIn to false
        setUser(null);
        setIsLoggedIn(false);

        // Redirect to login page after logout
        navigate('/login');
    }, [navigate, setUser, setIsLoggedIn]); // Add dependencies

    return null; // No UI needed for logout
};

export default Logout;
