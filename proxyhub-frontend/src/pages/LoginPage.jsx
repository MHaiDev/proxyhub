import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState(import.meta.env.DEV ? 'test@test.com' : '')
  const [password, setPassword] = useState(import.meta.env.DEV ? 'test123' : '')
  const { login, isLoading } = useAuth()
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <Box 
      minH="100vh"
      w="100vw"
      display="flex"
      alignItems="center" 
      justifyContent="center"
      bg={bgColor}
      p={{ base: 4, md: 8 }}
    >
      <VStack 
        spacing={{ base: 8, md: 12 }}
        w="100%"
        maxW="md"
      >
        <Heading 
          size={{ base: "xl", md: "2xl" }}
          textAlign="center"
          bgGradient="linear(to-r, blue.500, blue.600)"
          bgClip="text"
          lineHeight={1.4}
        >
          Login to ProxyHub
        </Heading>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py="8"
          px={{ base: '6', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
          w="100%"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing="6">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isLoading}
                width="full"
                boxShadow="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }}
              >
                Sign in
              </Button>
            </VStack>
          </form>
          <Text mt="6" textAlign="center">
            Don't have an account?{' '}
            <ChakraLink as={Link} to="/register" color="blue.500">
              Register
            </ChakraLink>
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default LoginPage 