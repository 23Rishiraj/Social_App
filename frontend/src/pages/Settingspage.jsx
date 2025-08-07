import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import useLogout from '../hooks/useLogout';

const Settingspage = () => {
    const [selectedOption, setSelectedOption] = useState();
    const showToast = useShowToast();
    const logout = useLogout();

    const freezeAccount = async () => {
        if (!window.confirm("Are you sure you want to freeze your account?")) return;

        try {
            const res = await fetch("api/users/freeze", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (data.error) {
                return showToast("Error", data.error, "error");
            }

            if (data.success) {
                await logout();
                showToast("Success", "Your account has been frozen", "success");
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Flex w="100%" minH="85vh" bg="gray.100">
            {/* Sidebar */}
            <Box
                w="260px"
                p={6}
                bg="white"
                borderRight="1px solid"
                borderColor="gray.200"
                boxShadow="md"
            >
                <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    mb={6}
                    color="blue.600"
                    borderBottom="2px solid"
                    borderColor="blue.100"
                    pb={2}
                >
                    Settings
                </Text>

                {['account', 'privacy', 'freeze'].map((option) => (
                    <Text
                        key={option}
                        mb={4}
                        cursor="pointer"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="md"
                        fontWeight={selectedOption === option ? 'bold' : 'normal'}
                        color={selectedOption === option ? 'blue.500' : 'gray.600'}
                        bg={selectedOption === option ? 'blue.50' : 'transparent'}
                        _hover={{
                            bg: 'blue.50',
                            color: 'blue.500',
                        }}
                        onClick={() => setSelectedOption(option)}
                    >
                        {option === 'account' && 'Account Settings'}
                        {option === 'privacy' && 'Privacy Settings'}
                        {option === 'freeze' && 'Freeze Account'}
                    </Text>
                ))}
            </Box>

            {/* Content Area */}
            <Box flex={1} p={10}>
                {selectedOption === 'freeze' && (
                    <Box
                        bg="white"
                        p={10}
                        borderRadius="xl"
                        boxShadow="lg"
                        maxW="2xl"
                        mx="auto"
                        border="1px solid"
                        borderColor="gray.200"
                    >
                        <Text fontSize="3xl" fontWeight="bold" mb={4} color="red.500">
                            ❄️ Freeze Account
                        </Text>
                        <Text fontSize="md" mb={6} color="gray.600">
                            Freezing your account will temporarily hide your profile and activity. You can unfreeze anytime by logging back in.
                        </Text>
                        <Button colorScheme="red" size="lg" onClick={freezeAccount}>
                            Freeze My Account
                        </Button>
                    </Box>
                )}

                {selectedOption === 'account' && (
                    <Box
                        bg="white"
                        p={10}
                        borderRadius="xl"
                        boxShadow="lg"
                        maxW="2xl"
                        mx="auto"
                        border="1px solid"
                        borderColor="gray.200"
                    >
                        <Text fontSize="3xl" fontWeight="bold" mb={4} color="blue.600">
                            🧑‍💼 Account Settings
                        </Text>
                        <Text fontSize="md" color="gray.600">
                            Update your personal information, email, or password here.
                        </Text>
                    </Box>
                )}

                {selectedOption === 'privacy' && (
                    <Box
                        bg="white"
                        p={10}
                        borderRadius="xl"
                        boxShadow="lg"
                        maxW="2xl"
                        mx="auto"
                        border="1px solid"
                        borderColor="gray.200"
                    >
                        <Text fontSize="3xl" fontWeight="bold" mb={4} color="purple.600">
                            🔒 Privacy Settings
                        </Text>
                        <Text fontSize="md" color="gray.600">
                            Control who can view your profile and content. Adjust visibility preferences.
                        </Text>
                    </Box>
                )}

                {!selectedOption && (
                    <Box
                        textAlign="center"
                        mt={32}
                        p={10}
                        bg="white"
                        borderRadius="xl"
                        boxShadow="2xl"
                        maxW="2xl"
                        mx="auto"
                        border="1px solid"
                        borderColor="gray.200"
                        transition="all 0.3s ease-in-out"
                        _hover={{
                            boxShadow: 'dark-lg',
                        }}
                    >
                        <Text fontSize="5xl" mb={4} color="blue.400">
                            ⚙️
                        </Text>
                        <Text fontSize="2xl" fontWeight="semibold" mb={2} color="blackAlpha.800">
                            Welcome to Settings
                        </Text>
                        <Text fontSize="md" color="gray.500">
                            Please select an option from the sidebar to view or modify your preferences.
                        </Text>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};

export default Settingspage;
