import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

const DashboardHeader = () => {
  const { user, logout } = useAuth()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      as="header" 
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      px={8}
    >
      <Flex justify="space-between" align="center" maxW="100%" mx="auto">
        <Text fontSize="2xl" fontWeight="bold">ProxyHub</Text>
        
        <HStack spacing={4}>
          <Text>
            Welcome, <Text as="span" fontWeight="bold">{user?.name || user?.email}</Text>
          </Text>
          <Button onClick={logout} variant="ghost">
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}

export default DashboardHeader 