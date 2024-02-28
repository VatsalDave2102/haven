import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  authentication: boolean;
}

const Protected: React.FC<Props> = ({ children, authentication }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading</h1> : <>{children}</>;
};
export default Protected;
