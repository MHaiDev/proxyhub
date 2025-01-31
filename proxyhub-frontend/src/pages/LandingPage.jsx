import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <Container maxW="container.xl" centerContent>
      <VStack spacing={8} py={20}>
        <Heading size="2xl" textAlign="center">
          Welcome to ProxyHub
        </Heading>
        <Button 
          size="lg" 
          colorScheme="blue"
          onClick={() => navigate('/dashboard')}
        >
          Let's get started
        </Button>
      </VStack>
    </Container>
  )
}

export default LandingPage 