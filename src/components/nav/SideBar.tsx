import {
  AiFillDashboard,
  AiFillPicture,
  AiOutlineHistory,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { SiReact } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../ui/ButtonForm";
import { NavLink } from "./NavLink";

export const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full  overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="transition-all duration-200 w-full p-2 py-5 bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
          <a href="https://benoitgarcia.dev" className="flex items-center ">
            <img
              src="https://static-cdn.jtvnw.net/jtv_user_pictures/3eddbb0c-6bbb-4284-8bc1-08527c920bd5-profile_image-70x70.png"
              className="h-6 mr-3 sm:h-7 rounded-full object-cover"
              alt="Flowbite Logo"
            />
          </a>
        </div>
        <ul className="px-3 py-4 space-y-2">
          <NavLink icon={<AiFillDashboard />} to="/" value="Dashboard" />
          <NavLink icon={<AiOutlineUser />} to="/about" value="About-me" />
          <NavLink
            icon={<AiOutlineHistory />}
            to="/historic"
            value="Historic"
          />
          <NavLink icon={<SiReact />} to="/skills" value="Skills" />
          <NavLink icon={<AiFillPicture />} to="/projects" value="Projects" />
        </ul>
        <div className="absolute bottom-0 w-full p-4">
          <ButtonForm
            loading={false}
            type="button"
            value={<AiOutlineLogout className="text-xl" />}
            color="dark"
            fullWidth
            func={handleLogout}
          />
        </div>
      </div>
    </aside>
  );
};
