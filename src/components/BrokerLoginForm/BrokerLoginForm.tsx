import React, { useState } from "react";
import { useRouter } from "next/router";
import { loginApi } from "@/utils/mockData";
import useAppStore from "@/store/useAppStore";
import { toast } from "react-hot-toast";
import { BrokerLoginFormProps } from "./BrokerLoginForm.types";

const BrokerLoginForm: React.FC<BrokerLoginFormProps> = ({
  brokerId,
  loading,
  setLoading,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setLoggedIn = useAppStore((state) => state.setLoggedIn);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginApi(brokerId, username, password);

      switch (response.status) {
        case 200:
          setLoggedIn(true);
          toast.success("Logged in successfully!");
          router.push("/holdings");
          break;
        case 400:
          toast.error("Invalid username or password.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      // Ensure error is typed as string
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default BrokerLoginForm;
