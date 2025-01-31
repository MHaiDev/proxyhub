import {
  Box,
  Flex,
  Button,
  Heading,
  Spacer,
  HStack,
  Text
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  return (
    <Box px={4} shadow="sm">
      <Flex h={16} alignItems="center" maxW="container.xl" mx="auto">
        <Heading size="md" as={Link} to="/">
          ProxyHub
        </Heading>
        <Spacer />
        {user && (
          <HStack spacing={4}>
            <Text>Welcome, {user.name}</Text>
            {!isDashboard && (
              <Button 
                colorScheme="blue" 
                variant="ghost"
                as={Link} 
                to="/dashboard"
              >
                Dashboard
              </Button>
            )}
            {isDashboard && (
              <>
                <Button 
                  colorScheme="blue" 
                  variant="ghost"
                  as={Link} 
                  to="/settings"
                >
                  Settings
                </Button>
                <Button 
                  colorScheme="blue" 
                  variant="ghost"
                  as={Link} 
                  to="/profile"
                >
                  Profile
                </Button>
              </>
            )}
            <Button 
              colorScheme="blue" 
              variant="ghost" 
              onClick={logout}
            >
              Logout
            </Button>
          </HStack>
        )}
        {!user && (
          <HStack spacing={4}>
            <Button 
              colorScheme="blue" 
              variant="ghost" 
              as={Link} 
              to="/login"
            >
              Login
            </Button>
            <Button 
              colorScheme="blue" 
              as={Link} 
              to="/register"
            >
              Register
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  )
}

export default Header 