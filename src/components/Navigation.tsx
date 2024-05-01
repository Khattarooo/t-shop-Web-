import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/Redux/slices/authSlice";
import Auth from "@/pages/auth";
import MainNavigation from "./MainNavigation";

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <MainNavigation/>
        </>
      ) : (
        <>
          <Auth/>
        </>
      )}
    </nav>
  );
};

export default Navigation;
