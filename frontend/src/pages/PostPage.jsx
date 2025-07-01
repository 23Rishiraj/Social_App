import { Avatar, Center, Flex, Image, Box, Text, Divider, Button, Spinner } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Action"
import Comment from "../components/comment"
import { use, useEffect, useState } from "react"
import useGetUserProfiler from "../hooks/useGetUserProfile"
import useShowToast from "../hooks/useShowToast"
import { useParams } from "react-router-dom"  
import { DeleteIcon } from "@chakra-ui/icons"
import { formatDistanceToNow } from "date-fns"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"

const postpage = () => {
  const [liked, setliked] = useState(false)
  const { user, loading } = useGetUserProfiler();
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/${pid}`); // Replace with actual post ID
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        getPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    getPost();
  }, [showToast, pid]);

  const handleDeletePost = async (e) => {}

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner sixe={"xl"} />
      </Flex>
    )
  }

  if (!post) return null;

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
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
        </Flex>
      </Flex>

      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"} >
          {formatDistanceToNow(new Date(post.createdAt))} ago
        </Text>
        {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
      </Flex>

      <Text my={3}>{post.text}</Text>
      {post.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"} >
          <Image src={post.img} w={"full"} />
        </Box>
      )}
      <Flex gap={3} my={3}>
        <Actions post={post} />
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post.likes.length} likes
        </Text>

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

export default postpage