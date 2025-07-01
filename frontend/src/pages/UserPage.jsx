import { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
// import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfiler from "../hooks/useGetUserProfile";

const UserPage = () => {
  const { user, loading } = useGetUserProfiler();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {

    const getPost = async () =>{
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data)
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   posts: data.posts,
        // }));
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally{
        setFetchingPosts(false);
      }
    }

    getPost();
  }, [username, showToast]);
  // console.log( user);
  if (!user && loading) {
  return (
    <Flex justifyContent="center" alignItems="center" minH="60vh">
      <Spinner size="xl" />
    </Flex>
  );
}
if (!user && !loading) {
  return (
    <Flex justifyContent="center" alignItems="center" minH="60vh">
      <Text fontSize="2xl" color="red.400" fontWeight="bold" letterSpacing="wide">
        🚫 User not found
      </Text>
    </Flex>
  );
}
  return (<>
    <UserHeader user={user} />
    {/* <UserPost likes={1200} replies={351} postImg="/post1.png" postTitle="Let's talk about threads" />
    <UserPost likes={575} replies={54} postImg="/post2.png" postTitle="Tutorials of leetcode" />
    <UserPost likes={545} replies={556} postImg="/post3.png" postTitle="Richest man on earth" />
    <UserPost likes={54542} replies={2545} postImg="/toji3.jpg" postTitle=" Favourite Anime Physique" /> */}
        {fetchingPosts && (
          <Flex justifyContent="center" alignItems="center" my={12} minH="30vh">
            <Spinner size="xl" />
          </Flex>
        )}
    {!fetchingPosts && posts.length === 0 && (
      <Flex justifyContent="center" alignItems="center" minH="30vh">
        <Text fontSize="xl" color="gray.500" fontWeight="semibold">
          💤 User has no posts found
        </Text>
      </Flex>
    )}
    {posts.map((post) => (
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
  </>
  );
}

export default UserPage; 