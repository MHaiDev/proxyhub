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

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { register, isLoading } = useAuth()
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register(email, password, name)
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
          Create an Account
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
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
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
                Create Account
              </Button>
            </VStack>
          </form>
          <Text mt="6" textAlign="center">
            Already have an account?{' '}
            <ChakraLink as={Link} to="/login" color="blue.500">
              Login
            </ChakraLink>
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default RegisterPage 