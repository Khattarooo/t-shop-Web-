import React, { useEffect, useState, useCallback } from "react";
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
import { BaseUrl } from "@/utils/api";
import { toast } from "sonner";

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

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch(`${BaseUrl}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
          token_expires_in: "0.2m",
        }),
      });
      const newAccessToken = await response.json();
      dispatch(setAccessToken(newAccessToken));
      setRefreshedOnce(true);
    } catch (error) {}
  }, [dispatch, refreshToken]);

  const fetchPosts = useCallback(async () => {
    try {
      if (!accessToken) {
        toast.error("Session Terminated - No access token");
        dispatch(resetAuthState());
        navigate("/");
        return;
      }

      const response = await fetch(`${BaseUrl}/posts?page=${page}&pageSize=8`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403 || refreshedOnce) {
          toast.error("Session Terminated - New access token has expired");
          dispatch(resetAuthState());
          navigate("/");
        } else if (response.status === 403 && !refreshedOnce) {
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
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [
    accessToken,
    refreshedOnce,
    page,
    dispatch,
    navigate,
    refreshAccessToken,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      document.title = "News - T-Shop";

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

  useEffect(() => {
    if (accessToken && hasNextPage && !refreshing) {
      fetchPosts();
    }
  }, [accessToken, page, hasNextPage, refreshing, fetchPosts]);

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
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={120}
              className="h-auto w-auto"
              priority
            />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="flex-grow p-5 pt-24 bg-cover bg-fixed bg-center bg-[url('/w1.jpg')] min-w-[400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={`${post._id}-${index}`}
                image_url={post.image_url}
                title={post.title}
                keywords={post.keywords}
              />
            ))}
            {showFooter && (
              <div className="flex justify-center items-center ">
                <div className="bg-white w-64 h-54 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="h-auto w-auto"
                    priority
                  />
                  <p className="text-xl">No More Posts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductNews;
