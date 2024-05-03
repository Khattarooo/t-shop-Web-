import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "@/Redux/slices/authSlice";
import Image from "next/image";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRegistering) {
      document.title = "SignUp - T-Shop";
    } else {
      document.title = "Login - T-Shop";
    }
  }, [isRegistering]);
  const handleAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      setLoading(true);
      const endpoint = isRegistering ? "/signup" : "/login";
      const response = await fetch(
        `https://backend-practice.euriskomobility.me${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            token_expires_in: "0.3m",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleAuthResponse(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Authentication failed");
        console.log(errorData.message);
      }
    } catch (err) {
      console.error("Error authenticating:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleAuthResponse = (data: {
    accessToken: string;
    refreshToken: string;
  }) => {
    dispatch(setAccessToken(data.accessToken));
    dispatch(setRefreshToken(data.refreshToken));
    console.log("Authentication successful", data);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/w2.png')] min-w-[250px] bg-cover bg-center">
      <form
        onSubmit={handleAuth}
        style={{ backgroundColor: "#72d87a" }}
        className="p-8 rounded-3xl shadow-xl max-w-sm w-full  mx-auto"
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={150}
          priority
          className="mx-auto mb-4"
          style={{ maxWidth: "150px" }}
        />
        <div className="mb-2">
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
        <div className="mb-2">
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
        {isRegistering && (
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-black">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        )}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={
            !email ||
            !password ||
            (isRegistering && !confirmPassword) ||
            loading ||
            submitting
          }
          className={`mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {submitting ? "Submitting..." : isRegistering ? "Register" : "Log in"}{" "}
        </button>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleForm}
            className="inline-block align-baseline font-bold text-sm text-white hover:text-green-700 focus:outline-none"
          >
            {isRegistering
              ? "Already have an account? Log in"
              : "Don't have an account? Register now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
