import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/global/Header";
import TextInput from "../../components/ui/TextInput";
import { adminForgotPasswordSchema } from "../../validations/adminForgotPasswordSchema";

const AdminForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateForm = () => {
    const result = adminForgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      return result.error.errors[0].message;
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Reset email submitted:", email);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
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
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={error}
              />

              <div className="flex items-center justify-between">
                <Link to="/admin/login" className="text-sm text-[#4aa6a4] hover:text-[#5dbbb9]">
                  Back to Login
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
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
