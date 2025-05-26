import { useState, useEffect } from "react";
import EquipmentButton from "./EquipmentButton";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/apiClient";
import SkeletonEquipmentButton from "./SkeletonEquipmentButton";
import { Navigate } from "react-router-dom";
import EmptyEquipmentState from "./EmptyEquipmentState";
const EquipmentSelection = () => {
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const { industryName } = useParams();
  const navigate = useNavigate();

  const [equipments, setEquipments] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await api.get(`/industry-equipment/equipments?industry=${industryName}`);
        setEquipments(response.data?.equipments || []);
        setIndustry(response.data?.industry || {});
      } catch (err) {
        console.log("Failed to fetch equipments:", err);
        setEquipments([]);
        setIndustry({});
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [industryName]);

  return (
    <div className="px-4 w-full">
      {(loading || equipments?.length > 0) && (
        <h2 className="text-lg mb-8 text-[#EEEEEE]">Select Equipment you want recommendations for</h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <SkeletonEquipmentButton key={index} />)
        ) : equipments?.length > 0 ? (
          equipments.map((equipment, index) => (
            <EquipmentButton
              key={index}
              equipment={equipment}
              selectedEquipment={selectedEquipment}
              setSelectedEquipment={setSelectedEquipment}
            />
          ))
        ) : industry?.name && equipments?.length === 0 ? (
          <EmptyEquipmentState />
        ) : (
          <Navigate to={"/404"} />
        )}
      </div>

      {equipments?.length > 0 && (
        <button
          onClick={() => navigate(`/${industryName}/${selectedEquipment?.name}`)}
          disabled={!selectedEquipment}
          className={`${
            selectedEquipment ? "bg-[#FFFFFF]" : "bg-[#4AA6A4]/14"
          } cursor-pointer text-black font-bold rounded-full p-4 flex flex-col items-center justify-center gap-6 mt-10 mx-auto`}
        >
          Find My Ideal Equipment
        </button>
      )}
    </div>
  );
};

export default EquipmentSelection;
