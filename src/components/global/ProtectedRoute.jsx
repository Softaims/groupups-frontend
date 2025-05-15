import { Children, useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import api from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await api.get("/get-me");
        setUser(response.data);
      } catch {
        clearUser();
        navigate("/admin/login");
      }
    };
    if (!user) {
      getMe();
    }
  }, [clearUser, user, navigate, setUser]);

  if (user) {
    return children;
  }
};

export default ProtectedRoute;
