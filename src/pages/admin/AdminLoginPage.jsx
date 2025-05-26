import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/global/Header";
import TextInput from "../../components/ui/TextInput";
import { adminLoginSchema } from "../../validations/adminLoginSchema";
import api from "../../utils/apiClient";
import { toast } from "react-toastify";
import { validateForm } from "../../utils/validateForm";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const AdminLogin = () => {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    const validationErrors = validateForm(adminLoginSchema, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await api.post("/login", formData);
      setUser(response.user);
      toast.success("Login Successful");
      setTimeout(() => {
        toast.dismiss();
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log("error is", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030d13] text-white">
      <Header />
      <div className="flex justify-center items-center px-4 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Admin Login</h2>

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
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <div className="flex items-center justify-between">
              <Link to="/admin/forgot-password" className="text-sm text-[#4aa6a4] hover:text-[#5dbbb9]">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#4aa6a4] hover:bg-[#3d8a88] text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
