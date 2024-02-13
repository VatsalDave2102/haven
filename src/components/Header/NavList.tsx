import LogoutBtn from "../Header/LogoutBtn";
import { useAppSelector } from "../../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

interface NavListProps {
  sidebar: boolean;
}
const NavList: React.FC<NavListProps> = ({ sidebar }) => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const location = useLocation();
  const endpoint = location.pathname;
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <ul
      className={`${
        sidebar ? "flex flex-col items-center md:hidden" : "md:flex hidden"
      } gap-6 navbar_list py-2`}
    >
      {navItems.map((item) =>
        item.active ? (
          <li key={item.name}>
            <button
              onClick={() => navigate(item.slug)}
              className={`navbar_button ${
                endpoint === item.slug
                  ? "text-primary dark:text-pink-400"
                  : "text-slate-400 dark:text-secondary"
              }`}
            >
              {item.name}
            </button>
          </li>
        ) : null
      )}
      {authStatus && (
        <li>
          <LogoutBtn />
        </li>
      )}
    </ul>
  );
};

export default NavList;
