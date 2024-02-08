import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "..";
import { useAppSelector } from "../../store/hooks";

const Header = () => {
  const authStatus = useAppSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-secondary">
      <Container>
        <nav className="flex items-center">
          <div className="">
            <Link to="/" className="flex items-center gap-1">
              <Logo />
              <h1 className="font-bold text-3xl text-primary tracking-wide ">
                aven
              </h1>
            </Link>
          </div>
          <ul className="flex ml-auto gap-6 navbar_list py-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="navbar_button"
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
        </nav>
      </Container>
    </header>
  );
};

export default Header;
