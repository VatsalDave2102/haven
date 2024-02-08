import toast from "react-hot-toast";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const handleLogout = () => {
    authService.logout().then(() => {
      toast.success(`Logged out from ${userData?.email}`);
      dispatch(logout());
    });
  };

  return (
    <button className="navbar_button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
