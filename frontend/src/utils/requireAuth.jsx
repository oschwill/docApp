import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingElement from '../components/loading/LoadingElement';

const requireAuth = (Component, checkLogin) => {
  // Higher Order Component
  const AuthenticatedComponent = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      checkLogin().then((isLoggedIn) => {
        setIsLoggedIn(isLoggedIn);
      });
    }, []);

    if (isLoggedIn === null) {
      return <LoadingElement />;
    }

    if (!isLoggedIn) {
      return (
        <Navigate
          to="/login"
          replace
          state={{ message: 'Bitte loggen Sie sich ein, um Profile einsehen zu können!' }}
        />
      );
    }

    return <Component {...props} />;
  };

  // Hier können wir für die Entwicklertools einen displayName für unser HOC erzeugen zu debugging zwecken
  // Da die Komponente glaub ich sonst anonym wäre
  AuthenticatedComponent.displayName = `RequireAuth(${
    Component.displayName || Component.name || 'Component'
  })`;

  return AuthenticatedComponent;
};

export default requireAuth;
