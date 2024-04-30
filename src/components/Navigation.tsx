import { useDispatch, useSelector } from "react-redux";
import {
  resetAuthState,
  selectIsAuthenticated,
} from "../Redux/slices/authSlice";
import { useRouter } from "next/router";
import Auth from "../pages/auth";

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetAuthState());
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Auth />
        </>
      )}
    </nav>
  );
};

export default Navigation;
