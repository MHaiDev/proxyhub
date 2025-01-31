import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import DashboardHeader from '../components/DashboardHeader'

const DashboardPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box minH="100vh" bg={bgColor}>
      <DashboardHeader />
      <Container maxW="container.xl" py={8}>
        <Flex direction="column" gap={6}>
          <Heading size="lg">Dashboard</Heading>
          <Text>Welcome to your ProxyHub Dashboard</Text>
          {/* Proxy list and controls will be added here */}
        </Flex>
      </Container>
    </Box>
  )
}

export default DashboardPage 