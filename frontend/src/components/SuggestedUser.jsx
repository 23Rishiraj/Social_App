import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react';

const SuggestedUser = () => {
  return (
    <>
        <Text mb={4} fontWeight={"bold"} >
            Suggested Users
        </Text>

        <Flex direction={"column"} gap={4}>
            {true &&[0,1,2,3,4].map((_,i) => (
                <Flex key={i} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
                    <Box>
                        <SkeletonCircle size={"10"} />
                    </Box>

                    <Flex w={"full"} flexDirection={"column"} gap={2}>
                        <Skeleton h={"8px"} w={"80px"} />
                        <Skeleton h={"8px"} w={"80px"} />
                    </Flex>

                    <Flex >
                        <Skeleton h={"20px"} w={"60px"} />
                    </Flex>
                </Flex>    
            ))}
        </Flex>
    </>
  );
};

export default SuggestedUser