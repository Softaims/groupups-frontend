import { useState } from "react";
import { useUserStore } from "../../../store/userStore";
import AdminPageHeader from "../admin-global/AdminPageHeader";
import TextInput from "../../ui/TextInput";
import { adminProfilePasswordSchema } from "../../../validations/adminProfilePasswordSchema";
import { validateForm } from "../../../utils/validateForm";
import api from "../../../utils/apiClient";
import { toast } from "react-toastify";

const AdminProfileMain = () => {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(adminProfilePasswordSchema, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.patch("/update-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success("Password updated successfully");

      // Clear form after successful update
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-64 w-full transition-all duration-300 pt-16 md:pt-6">
      <div className="space-y-6">
        <AdminPageHeader title="Profile Settings" description="Manage your account settings and update your password." />

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information Card */}
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="px-4 py-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md text-white">{user?.email || "Loading..."}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
                <div className="px-4 py-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md text-white">Administrator</div>
              </div>
            </div>
          </div>

          {/* Password Update Card */}
          <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Update Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextInput
                label="Current Password"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                error={errors.currentPassword}
              />
              <TextInput
                label="New Password"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                error={errors.newPassword}
              />
              <TextInput
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                error={errors.confirmNewPassword}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#4aa6a4] hover:bg-[#3d8a88] disabled:bg-[#2a2e34] text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
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
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminProfileMain;
