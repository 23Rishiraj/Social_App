import { Avatar, Center, Flex, Image, Box, Text, Divider, Button } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Action"
import Comment from "../components/comment"
import { useState } from "react"

const postpage = () => {
  const [liked, setliked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Hennery" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"} >Mark Hennery</Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Let's talk about threads</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"} >
        <Image src={"/post1.png"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setliked={setliked} />
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Text color={"gray.light"} fontSize={"sm"}>323 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {654 + (liked ? 1 : 0)} likes
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
      <Comment 
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
       />


    </>
  );
};

export default postpage