import { Avatar, Center, Flex, Image, Box, Text, Divider, Button, Spinner } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Action"
import Comment from "../components/comment"
import { use, useEffect, useState } from "react"
import useGetUserProfiler from "../hooks/useGetUserProfile"
import useShowToast from "../hooks/useShowToast"
import { useNavigate, useParams } from "react-router-dom"
import { DeleteIcon } from "@chakra-ui/icons"
import { formatDistanceToNow } from "date-fns"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import postAtoms from "../atoms/postAtoms"

const PostPage = () => {
  // const [liked, setliked] = useState(false)
  // const [post, setPost] = useState(null);
  const { user, loading } = useGetUserProfiler();
  const [posts,setPosts] = useRecoilState(postAtoms);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate= useNavigate();

  const currentPost =posts[0];
  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`); // Replace with actual post ID
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
        console.log("Error fetching post:");
      }
    };
    getPost();
  }, [showToast, pid,setPosts]);

  const handleDeletePost = async () => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`
        }
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
      console.log("Error deleting post:", error);
    }
  }

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner sixe={"xl"} />
      </Flex>
    )
  }

  if (!currentPost) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name="Mark Hennery" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"} >{user.username}</Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"} >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && <DeleteIcon cursor={"pointer"} size={20} onClick={handleDeletePost} />}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"} >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>


      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>🫱🏻‍🫲🏻</Text>
          <Text color={"gray.light"}>Get the app for like post and reply</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      {currentPost.replies.map(reply=>(
        <Comment 
        key={reply._id}
        reply={reply}  
        lastReply={currentPost.replies[currentPost.replies.length - 1] === reply}    
      />
      ))}
      {/* <Comment 
      comment ="looks really good"
      createdAt="2d" 
      likes={100}
      username="john_ceenaa"
      
      />
      <Comment 
      comment ="looks really good"
      createdAt="2d" 
      likes={354}
      username="john cena"
      userAvatar="https://bit.ly/sage-adebayo"
      />
      <Comment
       comment="Amazing post!"
       createdAt="1d"
       likes={86}
       username="Jane Doe"
       userAvatar="https://bit.ly/dan-abramov"
       />
      <Comment
        comment="Great insights!"
        createdAt="5d"
        likes={512}
        username="Bill Gates"
        userAvatar="https://bit.ly/ryan-florence"
       /> */}


    </>
  );
};

export default PostPage