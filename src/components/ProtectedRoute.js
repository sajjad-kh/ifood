import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // چک کردن session با API سمت سرور
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/fa/day?date=${today}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify({ loggedIn: true }));
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('user');
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  // حالت بارگذاری
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        در حال بررسی وضعیت ورود...
      </div>
    );
  }

  // اگر لاگین نیست → بفرست لاگین
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // اگر لاگین شده → نشون بده محتوای محافظت‌شده رو
  return children;
};

export default ProtectedRoute;
