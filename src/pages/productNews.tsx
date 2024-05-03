import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";
import {
  selectAccessToken,
  selectRefreshToken,
  setAccessToken,
  resetAuthState,
} from "../Redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Image from "next/image";
import { Post } from "@/utils/types";

const ProductNews: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshedOnce, setRefreshedOnce] = useState<boolean>(false);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  const accessToken: string | null = useSelector(selectAccessToken);
  const refreshToken: string | null = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "News - T-Shop";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const windowTop = window.scrollY;

      if (windowTop === 0 && hasNextPage && !loading) {
        handleRefresh();
      } else {
        const docHeight = document.documentElement.scrollHeight;
        const windowBottom = windowHeight + window.scrollY;

        if (windowBottom >= docHeight && hasNextPage && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasNextPage]);

  const fetchPosts = async () => {
    try {
      console.log("Fetching posts...");
      console.log("AccessToken:", accessToken);
      console.log("RefreshedOnce:", refreshedOnce);
      console.log("Refreshing:", refreshing);

      if (!accessToken) {
        console.log("Session 1 - No access token");
        dispatch(resetAuthState());
        navigate("/");
        return;
      }

      const response = await fetch(
        `https://backend-practice.euriskomobility.me/posts?page=${page}&pageSize=8`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Error fetching posts:", response.status);
        if (response.status === 403 && refreshedOnce) {
          console.log("Session 1 - New access token has expired");
          dispatch(resetAuthState());
          navigate("/");
        } else if (response.status === 403 && !refreshedOnce) {
          console.log("Refreshing access token...");
          await refreshAccessToken();
          setRefreshedOnce(true);
        }
        return;
      }

      const { pagination, results } = await response.json();
      setPosts((prevPosts) =>
        page === 1 ? results : [...prevPosts, ...results]
      );
      setHasNextPage(pagination.hasNextPage);
      setShowFooter(!pagination.hasNextPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      console.log("Refreshing access token...");

      const response = await fetch(
        "https://backend-practice.euriskomobility.me/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
            token_expires_in: "0.3m",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const { accessToken: newAccessToken } = await response.json();
      console.log("Previous Access Token:", accessToken);
      console.log("New Access Token:", newAccessToken);
      dispatch(setAccessToken(newAccessToken));
      setRefreshedOnce(true);
    } catch (error) {
      console.log("Error refreshing access token:", error);
    }
  };

  useEffect(() => {
    if (accessToken && hasNextPage && !refreshing) {
      fetchPosts();
    }
  }, [accessToken, page, hasNextPage, refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-fixed bg-center bg-[url('/w1.jpg')]">
          <div className="p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
            <Image src="/logo.svg" alt="Logo" width={120} height={120} />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="flex-grow p-5 pt-24 bg-cover bg-fixed bg-center bg-[url('/w1.jpg')] min-w-[400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                image_url={post.image_url}
                title={post.title}
                description={post.description}
              />
            ))}
            {showFooter && (
              <PostCard image_url={"/logo.svg"} title="No More Posts To Load" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductNews;
