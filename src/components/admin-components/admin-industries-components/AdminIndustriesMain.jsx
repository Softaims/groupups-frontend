import { useState } from "react";
import ConfirmationModal from "../../global/ConfirmationModal";
import IndustryCard from "./IndustryCard";
import IndustryModal from "./IndustryModal";
import AdminIndustriesHeader from "./AdminIndustriesHeader";
import { initialIndustries } from "../../../constants/initialIndustries";
import { toast } from "react-toastify";
import { adminIndustrySchema } from "../../../validations/adminIndustrySchema";
import { validateForm } from "../../../utils/validateForm";
import SkeletonIndustryCard from "./SkeletonIndustryCard";

const AdminIndustriesMain = () => {
  const [industries, setIndustries] = useState(initialIndustries);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleDelete = (industry) => {
    setSelectedIndustry(industry);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setIndustries(industries.filter((i) => i.id !== selectedIndustry.id));
    setShowDeleteModal(false);
    setSelectedIndustry(null);
    toast.success("Industry deleted successfully");
  };

  const handleEdit = (industry) => {
    setSelectedIndustry(industry);
    setFormData({ name: industry.name, image: null });
    setPreviewImage(industry.image);
    setShowEditModal(true);
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
      if (formErrors.image) {
        setFormErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (formErrors.image) {
      setFormErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const validationErrors = validateForm(adminIndustrySchema, {
      name: formData.name,
      image: formData.image || previewImage,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    if (showAddModal) {
      const newIndustry = {
        id: industries.length + 1,
        name: formData.name,
        image: previewImage,
      };
      setIndustries([...industries, newIndustry]);
      toast.success("Industry added successfully");
    } else {
      setIndustries(industries.map((i) => (i.id === selectedIndustry.id ? { ...i, name: formData.name, image: previewImage } : i)));
      toast.success("Industry updated successfully");
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedIndustry(null);
    setFormData({ name: "", image: null });
    setPreviewImage(null);
    setFormErrors({});
  };

  const handleAddNew = () => {
    setFormData({ name: "", image: null });
    setPreviewImage(null);
    setFormErrors({});
    setShowAddModal(true);
  };

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminIndustriesHeader onAddNew={handleAddNew} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} handleEdit={handleEdit} handleDelete={handleDelete} />
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedIndustry(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Industry"
          message={`Are you sure you want to delete ${selectedIndustry?.name}? This action cannot be undone.`}
        />
      )}

      <IndustryModal
        isOpen={showAddModal || showEditModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        onImageChange={handleImageChange}
        previewImage={previewImage}
        onRemoveImage={handleRemoveImage}
        isEditMode={showEditModal}
        errors={formErrors}
      />
    </main>
  );
};

export default AdminIndustriesMain;
