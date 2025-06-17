import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import api from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";
import SkeletonAdminPage from "../../pages/admin/SkeletonAdminPage";
import { useIndustryEquipmentStore } from "../../store/industryEquipmentStore";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();
  const { fetchIndustries, fetchEquipment, industries, equipment } = useIndustryEquipmentStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await api.get("/get-me");
        setUser(response.data);
      } catch {
        clearUser();
        navigate("/admin/login");
      }
    };

    if (!user) {
      initialize();
    }
    if (user && (!industries || !equipment)) {
      fetchIndustries();
      fetchEquipment();
    }
  }, [user, setUser, clearUser, navigate, fetchIndustries, fetchEquipment, industries, equipment]);

  if (user) {
    return children;
  } else {
    return <SkeletonAdminPage />;
  }
};

export default ProtectedRoute;
