import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <Box 
      minH="100vh"
      w="100vw"
      display="flex"
      alignItems="center" 
      justifyContent="center"
      bg="gray.50"
      p={{ base: 4, md: 8 }}
    >
      <VStack 
        spacing={{ base: 12, md: 16 }}
        w="100%"
        maxW="100%"
      >
        <Heading 
          size={{ base: "xl", md: "2xl" }}
          textAlign="center"
          bgGradient="linear(to-r, blue.500, blue.600)"
          bgClip="text"
          lineHeight={1.4}
        >
          Welcome to ProxyHub
        </Heading>
        <Button 
          size="lg" 
          height={{ base: "14", md: "16" }}
          px={{ base: "8", md: "12" }}
          fontSize={{ base: "lg", md: "xl" }}
          colorScheme="blue"
          boxShadow="lg"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          }}
          onClick={() => navigate('/dashboard')}
        >
          Let's get started
        </Button>
      </VStack>
    </Box>
  )
}

export default LandingPage 