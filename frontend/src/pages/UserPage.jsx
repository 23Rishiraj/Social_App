import { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Text, Box, useColorModeValue } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfiler from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postAtoms from "../atoms/postAtoms";

const UserPage = () => {
  const { user, loading } = useGetUserProfiler();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtoms);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const emptyTextColor = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    const getPost = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setFetchingPosts(false);
      }
    };

    getPost();
  }, [username, showToast, setPosts, user]);

  if (!user && loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="60vh" px={4}>
        <Spinner size="xl" thickness="4px" color="blue.400" />
      </Flex>
    );
  }

  if (!user && !loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="60vh" px={4}>
        <Text
          fontSize="2xl"
          color="red.400"
          fontWeight="bold"
          letterSpacing="wide"
          textAlign="center"
        >
          🚫 User not found
        </Text>
      </Flex>
    );
  }

  return (
    <Box maxW="700px" mx="auto" px={4} pt={6}>
      <UserHeader user={user} />

      {fetchingPosts && (
        <Flex justifyContent="center" alignItems="center" my={16} minH="30vh">
          <Spinner size="xl" thickness="4px" color="purple.400" />
        </Flex>
      )}

      {!fetchingPosts && posts.length === 0 && (
        <Flex justifyContent="center" alignItems="center" minH="30vh">
          <Text fontSize="xl" color={emptyTextColor} fontWeight="semibold" textAlign="center">
            💤 This user hasn't posted anything yet.
          </Text>
        </Flex>
      )}

      {!fetchingPosts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            postedBy={post.postedBy}
            likes={post.likes.length}
            replies={post.replies.length}
            postImg={post.postImg}
            postTitle={post.title}
          />
        ))}
    </Box>
  );
};

export default UserPage;
