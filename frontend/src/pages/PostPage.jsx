import {
  Avatar,
  Flex,
  Image,
  Box,
  Text,
  Divider,
  Button,
  Spinner,
  useColorModeValue,
  Tooltip,
  IconButton
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Action";
import Comment from "../components/comment";
import { useEffect } from "react";
import useGetUserProfiler from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtoms from "../atoms/postAtoms";

const PostPage = () => {
  const { user, loading } = useGetUserProfiler();
  const [posts, setPosts] = useRecoilState(postAtoms);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted successfully", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} mt={10}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!currentPost) return null;

  const bg = useColorModeValue("white", "#1f1f1f");
  const border = useColorModeValue("gray.200", "gray.700");
  const textSecondary = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      borderRadius="xl"
      border="1px solid"
      borderColor={border}
      p={6}
      mt={4}
      bg={bg}
      boxShadow="md"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={3}>
          <Avatar src={user.profilePic} size="md" name={user.username} />
          <Box>
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="bold">{user.username}</Text>
              <Image src="/verified.png" w={4} h={4} />
            </Flex>
          </Box>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Text fontSize="xs" color={textSecondary} textAlign="right">
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <Tooltip label="Delete Post" hasArrow>
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleDeletePost}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>

      <Text my={4} fontSize="md">
        {currentPost.text}
      </Text>

      {currentPost.img && (
        <Box
          borderRadius="lg"
          overflow="hidden"
          border="1px solid"
          borderColor={border}
          mb={4}
        >
          <Image src={currentPost.img} w="full" />
        </Box>
      )}

      <Flex gap={3} mb={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={2}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius="md"
      >
        <Flex alignItems="center" gap={2}>
          <Text fontSize="xl">🫱🏻‍🫲🏻</Text>
          <Text fontSize="sm" color={textSecondary}>
            Get the app for liking and replying
          </Text>
        </Flex>
        <Button colorScheme="blue" size="sm">
          Get
        </Button>
      </Flex>
      <Divider my={4} />

      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            currentPost.replies[currentPost.replies.length - 1] === reply
          }
        />
      ))}
    </Box>
  );
};

export default PostPage;
