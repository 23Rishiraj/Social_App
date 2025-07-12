import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
// import React, { useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Action'
import { useState, useEffect } from 'react'
import useShowToast from '../hooks/useShowToast'
import {DeleteIcon} from '@chakra-ui/icons'
import {formatDistanceToNow} from 'date-fns'
import userAtom from '../atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import postAtoms from '../atoms/postAtoms'

const Post = ({ post, postedBy }) => {
    const [liked, setliked] = useState(false);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useRecoilState(postAtoms);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const currentUser = useRecoilValue(userAtom);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json();
                console.log(data);
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setUser(null);
            }
        };
        getUser()
    }, [postedBy, showToast])

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault();
            if(!window.confirm("Are you sure you want to delete this post?")) return;
            const res =await fetch(`/api/posts/${post._id}`, {
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
            setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));

        } catch (error) {
            showToast("Error", error.message, "error");
            console.log("Error deleting post:", error);
        }
    }

    if(!user) return null;

    return (
        <Link to={`/${user.username}/posts/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size={{ base: "md", md: "xl", }} name={user.name} src={user.profilPic}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${user.username}`);
                        }}>
                    </Avatar>
                    <Box w="1.25px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies.length === 0 && <Text textAlign={"center"}>😒</Text>}
                        {post.replies[0] && (
                            <Avatar
                                size={'xs'}
                                name='Jonathan'
                                src={post.replies[0].userProfilePic}
                                position={"absolute"}
                                top={0}
                                left="15px"
                                padding={"2px"}
                            />
                        )}


                        {post.replies[1] && (
                            <Avatar
                                size={'xs'}
                                name='Jonathan'
                                src={post.replies[1].userProfilePic}
                                position={"absolute"}
                                bottom={0}
                                right="-5px"
                                padding={"2px"}
                            />
                        )}

                        {post.replies[2] && (
                            <Avatar
                                size={'xs'}
                                name='Jonathan'
                                src={post.replies[2].userProfilePic}
                                position={"absolute"}
                                bottom={0}
                                left="5px"
                                padding={"2px"}
                            />
                        )}
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${user.username}`);
                                }}>
                                {user?.username}</Text>

                            <Image src="/verified.png" w={3} h={3} ml={1} />

                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"} >
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text>
                            {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (

                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"} >
                            <Image src={post.img} w={"full"} />
                        </Box>

                    )}

                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>
                    {/* <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>{post.replies.length || 0} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text fontSize={"sm"} color={"gray.light"}> {post.likes.length || 0} likes</Text>
                    </Flex> */}
                </Flex>
            </Flex>
        </Link>

    )
}

export default Post