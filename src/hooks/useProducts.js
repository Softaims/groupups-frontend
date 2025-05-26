import { useState } from "react";
import { toast } from "react-toastify";
import { productSchema } from "../validations/adminProductSchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";
import { validateForm } from "../utils/validateForm";

export const useProducts = () => {
  const { industries } = useIndustryEquipmentStore();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    why_good_fit_reason: "",
    equipment_id: null,
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProducts = async (selectedEquipment) => {
    if (!selectedEquipment?.id) {
      setProducts(null);
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get(`/products/get-by-equipment/${selectedEquipment.id}`);
      setProducts(response.data || []);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setSelectedEquipment(null);
  };

  const handleEquipmentSelect = (equipment) => {
    if (selectedEquipment?.id != equipment.id) {
      setSelectedEquipment(equipment);
      fetchProducts(equipment);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
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
        setFormErrors((prev) => ({ ...prev, image: null }));
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (formErrors.image) {
      setFormErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const handleAddClick = () => {
    if (products?.length >= 3) {
      toast.warning("You cannot add more than 3 products for an equipment");
      return;
    }
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      why_good_fit_reason: "",
      equipment_id: selectedEquipment.id,
      image: null,
    });
    setFormErrors({});
    setPreviewImage(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      why_good_fit_reason: product.why_good_fit_reason,
      equipment_id: selectedEquipment.id,
      image: product.image,
    });
    setPreviewImage(product.image);
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const validationData = {
      ...formData,
      equipment_id: selectedEquipment.id,
    };
    const validationErrors = validateForm(productSchema, validationData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else if (key !== "image") {
          formDataToSend.append(key, formData[key]);
        }
      });
      let response;
      if (selectedProduct) {
        response = await api.put(`/products/update-product/${selectedProduct.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts((prev) => prev.map((p) => (p.id === selectedProduct.id ? response.data : p)));
        toast.success("Product updated successfully");
      } else {
        response = await api.post("/products/create-product", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts((prev) => [...(prev || []), response.data]);
        toast.success("Product added successfully");
      }

      handleCloseModal();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/products/delete-product/${selectedProduct.id}`);
      toast.success("Product deleted successfully");
      setIsDeleteModalOpen(false);
      fetchProducts(selectedEquipment);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setFormErrors({});
    setPreviewImage(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      why_good_fit_reason: "",
      equipment_id: null,
      image: null,
    });
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    selectedIndustry,
    selectedEquipment,
    products,
    isLoading,
    industries,
    isFormModalOpen,
    isDeleteModalOpen,
    selectedProduct,
    formData,
    formErrors,
    searchQuery,
    previewImage,
    handleIndustrySelect,
    handleEquipmentSelect,
    handleFormChange,
    handleImageChange,
    handleRemoveImage,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleSubmit,
    handleDeleteProduct,
    handleCloseModal,
    handleCloseDeleteModal,
    setSearchQuery,
  };
};
