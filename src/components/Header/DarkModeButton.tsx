import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDarkMode } from "../../store/viewSlice";

const DarkModeButton = () => {
  const darkMode = useAppSelector((state) => state.view.darkMode);
  const dispatch = useAppDispatch();
  const switchMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <button
      className="mr-3 hover:bg-primary/40 dark:hover:bg-pink-400/40 rounded-full p-2 duration-300"
      onClick={switchMode}
    >
      {darkMode ? (
        <img src="/sun.svg" alt="sun" />
      ) : (
        <img src="/moon.svg" alt="moon" />
      )}
    </button>
  );
};

export default DarkModeButton;
