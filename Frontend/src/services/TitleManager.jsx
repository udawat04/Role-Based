import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const getTitleFromPath = (pathname) => {
      switch (pathname) {
        case "/":
          return "Login ";
        case "/signup":
          return "Signup ";
        case "/super-admin":
          return "Super - Admin-Dashboard";
        case "/super-admin/total-clients":
          return "Super - Clients";
        case "/super-admin/total-users":
          return "Super - Users";
        case "/super-admin/create-client":
          return "Super - Client-Create";
        case "/super-admin/specific-client/":
          return "Super - Specific-Client";
        case "/client":
          return "Client Dashboard";
        case "/client/users":
          return "Client - Users";
        case "/client/create-users":
          return "Client Create-Users";
        case "/users":
          return "User - Dashboard";
        
        default:
          return "Dashboard";
      }
    };

    document.title = getTitleFromPath(location.pathname);
  }, [location]);

  return null;
};

export default TitleManager;
