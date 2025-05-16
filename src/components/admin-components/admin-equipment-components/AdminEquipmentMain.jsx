import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import EquipmentTable from "./EquipmentTable";
import EquipmentModal from "./EquipmentModal";
import ConfirmationModal from "../../global/ConfirmationModal";
import { validateForm } from "../../../utils/validateForm";
import { adminEquipmentSchema } from "../../../validations/adminEquipmentSchema";
import { toast } from "react-toastify";
import { adminEquipments, adminIndustries } from "../../../constants/adminEquipmentIndustryData";
import AdminEquipmentHeader from "./AdminEquipmentHeader";
import EquipmentSearchFilter from "./EquipmentSearchFilter";

const AdminEquipmentMain = () => {
  const [equipment, setEquipment] = useState(adminEquipments);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", industryId: "" });
  const [formErrors, setFormErrors] = useState({});
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (equipment) => {
    setSelectedEquipment(equipment);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setEquipment(equipment.filter((i) => i.id !== selectedEquipment.id));
    setShowDeleteModal(false);
    setSelectedEquipment(null);
    toast.success("Equipment deleted successfully");
  };

  const handleEdit = (equipment) => {
    setSelectedEquipment(equipment);
    setFormData({
      name: equipment.name,
      industryId: equipment.industryId,
    });
    setShowEditModal(true);
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "industryId" ? (value ? Number(value) : "") : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const validationErrors = validateForm(adminEquipmentSchema, formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    if (showAddModal) {
      const newEquipment = {
        id: Date.now(),
        name: formData.name,
        industryId: formData.industryId,
        industryName: adminIndustries.find((i) => i.id === formData.industryId)?.name,
      };
      setEquipment([...equipment, newEquipment]);
      toast.success("Equipment added successfully");
    } else {
      setEquipment(
        equipment.map((i) =>
          i.id === selectedEquipment.id
            ? {
                ...i,
                name: formData.name,
                industryId: formData.industryId,
                industryName: adminIndustries.find((i) => i.id === formData.industryId)?.name,
              }
            : i
        )
      );
      toast.success("Equipment updated successfully");
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedEquipment(null);
    setFormData({ name: "", industryId: "" });
    setFormErrors({});
  };

  const handleAddNew = () => {
    setFormData({ name: "", industryId: "" });
    setFormErrors({});
    setShowAddModal(true);
  };

  const filteredEquipment = equipment.filter((item) => {
    const matchesIndustry = selectedIndustry === "all" || item.industryId === Number.parseInt(selectedIndustry);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminEquipmentHeader handleAddNew={handleAddNew} />
        <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
          <EquipmentSearchFilter
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            selectedIndustry={selectedIndustry}
            onIndustryChange={(e) => setSelectedIndustry(e.target.value)}
            industries={adminIndustries}
          />
          <EquipmentTable equipment={filteredEquipment} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          type="delete"
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedEquipment(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Equipment"
          message={`Are you sure you want to delete "${selectedEquipment?.name}"? This action cannot be undone.`}
        />
      )}

      <EquipmentModal
        isOpen={showAddModal || showEditModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        errors={formErrors}
        isEditMode={showEditModal}
        industries={adminIndustries}
      />
    </main>
  );
};

export default AdminEquipmentMain;
