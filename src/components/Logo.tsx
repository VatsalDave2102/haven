import { useAppSelector } from "../store/hooks";

const Logo = () => {
  const darkMode = useAppSelector((state) => state.view.darkMode);

  return darkMode ? (
    <img className="w-[30px]" src="/haven-dark-logo.png" alt="logo" />
  ) : (
    <img className="w-[30px]" src="/haven-light-logo.png" alt="logo" />
  );
};

export default Logo;
