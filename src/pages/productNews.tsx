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

interface Post {
  _id: string;
  image_url?: string;
  title: string;
  description: string;
}

const ProductNews: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshedOnce, setRefreshedOnce] = useState<boolean>(false); // New state to track if refresh token is used once

  const accessToken: string | null = useSelector(selectAccessToken);
  const refreshToken: string | null = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "News - T-Shop";
  }, []);

  const fetchPosts = async () => {
    try {
      if (!accessToken || (refreshedOnce && !refreshing)) {
        console.log("session 1");
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
        if (response.status === 403 && !refreshedOnce) {
          await refreshAccessToken();
          setRefreshedOnce(true);
        }
        throw new Error("Failed to fetch posts");
      }
      const { pagination, results } = await response.json();
      setPosts((prevPosts) =>
        page === 1 ? results : [...prevPosts, ...results]
      );
      setHasNextPage(pagination.hasNextPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
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
      console.error("Error refreshing access token:", error);
      dispatch(resetAuthState());
    }
  };

  useEffect(() => {
    if (accessToken && hasNextPage && !refreshing) {
      fetchPosts();
    }
  }, [accessToken, page, hasNextPage, refreshing]);

  const handleNextPage = () => {
    if (hasNextPage && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col bg-white p-5 min-w-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  image_url={post.image_url}
                  title={post.title}
                  description={post.description}
                />
              ))}
              {!loading && !hasNextPage && <p>No more posts to load.</p>}
            </>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage || loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductNews;
