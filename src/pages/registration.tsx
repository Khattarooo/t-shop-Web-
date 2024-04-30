import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "@/Redux/slices/authSlice";
import { useRouter } from "next/router";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegistration = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-practice.euriskomobility.me/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleRegistrationResponse(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error registering:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationResponse = (data: {
    accessToken: string;
    refreshToken: string;
  }) => {
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));
    console.log("Registration successful", data);
  };
  const handleRegistrationClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/w2.png')] bg-cover bg-center">
      <form
        onSubmit={handleRegistration}
        style={{ backgroundColor: "#72d87a" }}
        className="p-8 rounded-lg shadow-lg max-w-sm w-full mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-black">
            Email
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-black">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={!email || !password || loading}
          className={`mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleRegistrationClick}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 focus:outline-none"
          >
            Dont have an account? Register now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
