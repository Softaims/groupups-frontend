import { useState } from "react";
import { toast } from "react-toastify";
import { productSchema } from "../validations/adminProductSchema";
import api from "../utils/apiClient";
import { useIndustryEquipmentStore } from "../store/industryEquipmentStore";

export const useProducts = () => {
  const { industries, equipment } = useIndustryEquipmentStore();
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
    stock: "",
    is_featured: false,
    equipment_id: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchProducts = async (selectedEquipment) => {
    if (!selectedEquipment?.id) {
      setProducts(null);
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get(`/products/products?equipmentId=${selectedEquipment.id}`);
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
    // Clear error when field is modified
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      is_featured: false,
      equipment_id: selectedEquipment.id,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      is_featured: product.is_featured,
      equipment_id: selectedEquipment.id,
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate with Zod
      const validatedData = productSchema.parse(formData);
      setIsLoading(true);
      
      if (selectedProduct) {
        await api.put(`/products/products/${selectedProduct.id}`, validatedData);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products/products", validatedData);
        toast.success("Product added successfully");
      }
      setIsFormModalOpen(false);
      fetchProducts(selectedEquipment);
    } catch (err) {
      if (err.errors) {
        // Handle Zod validation errors
        const errors = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFormErrors(errors);
      } else {
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/products/products/${selectedProduct.id}`);
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
    handleIndustrySelect,
    handleEquipmentSelect,
    handleFormChange,
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