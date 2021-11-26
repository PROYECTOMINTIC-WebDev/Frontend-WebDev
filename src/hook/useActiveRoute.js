import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const useActiveRoute = (to) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (location.pathname.includes(to)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [location, to]);

    return isActive;
};

export default useActiveRoute;