import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/Redux/slices/authSlice";
import Auth from "@/pages/auth";
import MainNavigation from "./MainNavigation";
import { Toaster } from "sonner";

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <MainNavigation />
          <Toaster richColors position="bottom-right" />
        </>
      ) : (
        <>
          <Auth />
          <Toaster richColors position="bottom-right" />
        </>
      )}
    </nav>
  );
};

export default Navigation;
