import { useState, useEffect } from "react";
import api from "../utils/apiClient";

const useEquipment = (industryName, equipmentName) => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await api.get(
          `/industry-equipment/check-equipment?industry=${industryName}&equipment=${equipmentName}`
        );
        setEquipment(response.data);
      } catch (err) {
        console.log("Failed to fetch equipment", err);
        setEquipment(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipments();
  }, [industryName, equipmentName]);

  return { equipment, loading };
};

export default useEquipment;
