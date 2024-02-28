import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Logo } from "@components/index";
import DarkModeButton from "@components/Header/DarkModeButton";
import Sidebar from "@components/Header/Sidebar";
import NavList from "@components/Header/NavList";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpen = () => {
    setSidebarOpen(true);
  };
  return (
    <header className="py-3 shadow bg-secondary dark:bg-slate-900">
      <Container>
        <nav className="flex items-center">
          <div className="mr-auto">
            <Link to="/" className="flex items-center gap-1">
              <Logo />
              <h1 className="font-bold text-3xl text-primary dark:text-pink-400 tracking-wide ">
                aven
              </h1>
            </Link>
          </div>
          <DarkModeButton />
          <NavList sidebar={false} />
          <button
            className="rounded-full hover:bg-primary/40 dark:hover:bg-pink-400/40 flex items-center p-2 duration-300 md:hidden"
            onClick={handleOpen}
          >
            <span className="material-symbols-outlined text-primary dark:text-secondary">
              menu
            </span>
          </button>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
