import { useEffect } from "react";
import { Link, Location } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  value: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ icon, to, value }) => {
  const location = useLocation();

  const handleActiveLink = (location: Location, to: string): boolean => {
    if (location.pathname === to) return true;
    return false;
  };

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-2 text-base font-normal ${
          handleActiveLink(location, to) ? "text-rose-500" : "text-gray-900"
        } rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
      >
        <span className="flex items-center text-xl">{icon}</span>
        <span className="flex items-center ml-3 font-medium">{value}</span>
      </Link>
    </li>
  );
};
