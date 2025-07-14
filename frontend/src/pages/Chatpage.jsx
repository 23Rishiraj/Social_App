import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Conversion from '../components/Conversion'
import { GiConversation } from 'react-icons/gi'
import MessageContainer from '../components/MessageContainer'

const Chatpage = () => {
    return (
        <Box position={"absolute"}
            left={"50%"}
            w={{
                base: "100%",
                md: "80%",
                lg: "750px",
    
            }}
            p={4}
            transform={"translateX(-50%)"}
        >
            <Flex
                gap={4}
                flexDirection={{
                    base: "column",
                    md: "row",
                }}
                // justifyContent={"space-between"}
                // alignItems={"center"}
                maxW={{
                    sm: "400px",
                    md: "full",
                }}
                mx={"auto"}
            >
                <Flex flex="30" 
                    flexDirection={"column"}
                    gap={2}
                    maxW={{
                        sm: "250px",
                        md: "full",
                    }}
                    mx={"auto"}
                    
                >
                    <Text fontWeight={"700"} color={useColorModeValue("gray.600", "gray.400")} >
                        Your conversations
                    </Text>
                    <form>
                        <Flex alignItems={"center"} gap={2}>
                            <Input placeholder='Search for a user' />
                            <Button size={"sm"} colorScheme='blue' ml={2}>
                                <SearchIcon />
                            </Button>
                        </Flex>
                    </form>

                    {false && (
                        [0, 1, 2, 3, 4].map((_, i) => (
                            <Flex key={i} alignItems={"center"} gap={2} mt={2} p={2} borderRadius={"md"} _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}>
                                <Box>
                                    <SkeletonCircle size='10' />
                                </Box>
                                <Flex flexDirection={"column"} gap={3} w={"full"}>
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </Flex>
                        ))
                    )}
                    <Conversion />
                    <Conversion />
                    <Conversion />
                    
                </Flex>

                <Flex
                    flex={0}
                    borderRadius={"md"}
                    p={2}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"400px"}
                >
                    {/* <GiConversation size={100} />
                    <Text fontSize={20}> Select a conversations</Text> */}
                </Flex>
                <MessageContainer/>
            </Flex>
        </Box>
    )

}

export default Chatpage