import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtoms from "../atoms/postAtoms";
import SuggestedUser from "../components/SuggestedUsers";

const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postAtoms);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        console.log("Fetched posts data:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          showToast("Error", "Invalid response format", "error");
          setPosts([]);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap={10} alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <Box
            textAlign="center"
            fontSize="xl"
            color="gray.500"
            mt={10}
            fontWeight="medium"
          >
            Follow some users to see the feed 👥
          </Box>
        )}

        {loading && (
          <Flex justify="center" mt={10}>
            <Spinner size="xl" />
          </Flex>
        )}

        {Array.isArray(posts) &&
          posts.map((post) => (
            <Box
              key={post._id}
              bg="white"
              _dark={{ bg: "gray.900" }}
              borderRadius="2xl"
            //   border="1px solid"
              borderColor="gray.200"
              _darkBorderColor="gray.500"
              boxShadow="xl"
              mb={5}
              overflow="hidden"
              transition="all 0.55s ease-in-out"
              _hover={{
                boxShadow: "sm",
                transform: "scale(1.01)",
              }}
            >
              <Box px={6} py={4}>
                <Post post={post} postedBy={post.postedBy} />
              </Box>

            </Box>
          ))}
      </Box>

      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUser />
      </Box>
    </Flex>
  );
};

export default HomePage;
