import NavList from "@components/Header/NavList";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar: React.FC<SidebarProps> = ({ setIsOpen, isOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <aside
      className={`${
        isOpen ? "block w-[280px]" : "hidden w-0"
      } md:hidden sidebar h-screen absolute right-0 top-0 z-50 bg-secondary dark:bg-slate-900 py-3  transition-all duration-500`}
      onClick={handleClose}
    >
      <button className="rounded-full hover:bg-primary/40 dark:hover:bg-pink-400/40 flex items-center p-2 ml-auto mr-2 duration-300">
        <span className="material-symbols-outlined text-primary dark:text-secondary">
          close
        </span>
      </button>
      <NavList sidebar={true} />
    </aside>
  );
};

export default Sidebar;
