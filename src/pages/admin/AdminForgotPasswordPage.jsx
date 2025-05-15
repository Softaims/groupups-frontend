import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/global/Header";
import TextInput from "../../components/ui/TextInput";
import { adminForgotPasswordSchema } from "../../validations/adminForgotPasswordSchema";
import { validateForm } from "../../utils/validateForm";
import api from "../../utils/apiClient";
import { toast } from "react-toastify";
import LoaderIcon from "../../../public/icons/LoaderIcon";

const AdminForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(adminForgotPasswordSchema, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setIsSubmitting(true);
    try {
      await api.post("/forgot-password", formData);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030d13] text-white">
      <Header />
      <div className="flex justify-center items-center px-4 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Forgot Password</h2>

          {submitted ? (
            <div className="mt-10">
              <p className="text-center text-lg text-[#4aa6a4] hover:text-[#5dbbb9]">Password Reset link has been sent to your email.</p>
              <div className="mt-4 py-3 px-4 bg-[#4aa6a4] hover:bg-[#3d8a88] text-white font-medium rounded-md transition duration-300 flex justify-center items-center">
                <Link to="/admin/login">Back to Login</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#D9D9D9]/5 p-10 rounded-xl">
              <TextInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
              />

              <div className="flex items-center justify-between">
                <Link to="/admin/login" className="text-sm text-[#4aa6a4] hover:text-[#5dbbb9]">
                  Back to Login
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full py-3 px-4 bg-[#4aa6a4] hover:bg-[#3d8a88] text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
              >
                {isSubmitting ? <LoaderIcon /> : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
