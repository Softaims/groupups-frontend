import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import api from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";
import SkeletonAdminPage from "../../pages/admin/SkeletonAdminPage";
import { useIndustryEquipmentStore } from "../../store/industryEquipmentStore";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();
  const { fetchIndustries, fetchEquipment } = useIndustryEquipmentStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await api.get("/get-me");
        setUser(response.data);
        fetchIndustries();
        fetchEquipment();
      } catch {
        clearUser();
        navigate("/admin/login");
      }
    };

    if (!user) {
      initialize();
    }
  }, [user, setUser, clearUser, navigate, fetchIndustries, fetchEquipment]);

  if (user) {
    return children;
  } else {
    return <SkeletonAdminPage />;
  }
};

export default ProtectedRoute;
