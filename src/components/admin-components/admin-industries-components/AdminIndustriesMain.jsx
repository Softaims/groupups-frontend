import { useState } from "react";
import { Plus } from "lucide-react";
import ConfirmationModal from "../../global/ConfirmationModal";
import { initialIndustries } from "../../../constants/initialIndustries";
import { toast } from "react-toastify";
import IndustryCard from "./IndustryCard";
import IndustryModal from "./IndustryModal";

const AdminIndustriesMain = () => {
  const [industries, setIndustries] = useState(initialIndustries);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);

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
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || (!formData.image && !previewImage)) {
      toast.error("Please fill in all fields");
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

    setFormData({ name: "", image: null });
    setPreviewImage(null);
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedIndustry(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedIndustry(null);
    setFormData({ name: "", image: null });
    setPreviewImage(null);
  };

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold tracking-tight break-words text-white">Industries</h1>
            <p className="text-gray-400">Manage your industries and their details.</p>
          </div>
          <button
            onClick={() => {
              setFormData({ name: "", image: null });
              setPreviewImage(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3CBFAE] hover:bg-[#35a99a] text-white rounded-md transition-colors"
          >
            <Plus size={20} />
            <span>Add Industry</span>
          </button>
        </div>

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
      />
    </main>
  );
};

export default AdminIndustriesMain;
