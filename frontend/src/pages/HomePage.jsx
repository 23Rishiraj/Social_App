import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtoms from "../atoms/postAtoms";
import SuggestedUser from "../components/SuggestedUser";

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

                // Ensure data is an array or extract posts array if wrapped
                if (Array.isArray(data)) {
                    setPosts(data);
                } else if (Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    showToast("Error", "Invalid response format", "error");
                    setPosts([]); // fallback to empty array
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
        <>
            <Flex gap={10} alignItems={"flex-start"}>
                <Box flex={70}>
                {!loading && posts.length === 0 && (
                    <h1>Follow some users to see the feed</h1>
                )}

                {loading && (
                    <Flex justify="center">
                        <Spinner size="xl" />
                    </Flex>
                )}

                {Array.isArray(posts) &&
                    posts.map((post) => (
                        <Post key={post._id} post={post} postedBy={post.postedBy} />
                    ))}
            </Box>

            <Box flex={30} border={"1px solid black"}>
                <SuggestedUser/>
            </Box>
            </Flex>
        </>
    );
};

export default HomePage;
