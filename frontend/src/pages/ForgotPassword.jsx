import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setResetUrl("");
    try {
      const response = await forgotPassword(email);
      setMessage(response.message || "Check your email for reset instructions.");
      if (response.resetUrl) {
        setResetUrl(response.resetUrl);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Failed to copy reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {message && (
          <p className="text-sm mt-4 text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}

        {resetUrl && (
          <div className="mt-3 rounded-xl border border-indigo-300/40 bg-indigo-50/60 dark:bg-indigo-900/20 p-3">
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
              Dev reset link (local testing)
            </p>
            <a
              href={resetUrl}
              className="text-sm break-all text-indigo-600 hover:underline"
            >
              {resetUrl}
            </a>
            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleCopy}
              >
                {copied ? "Copied" : "Copy Link"}
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => window.open(resetUrl, "_self")}
              >
                Open Reset Page
              </Button>
            </div>
          </div>
        )}

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Remembered password?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
