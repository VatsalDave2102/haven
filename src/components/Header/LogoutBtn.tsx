import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
