import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Container,
  Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = () => {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      bg={bgColor} 
      borderBottom="1px" 
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="container.xl">
        <Flex py={4} align="center" justify="space-between">
          <Text 
            fontSize="xl" 
            fontWeight="bold" 
            cursor="pointer"
            onClick={() => navigate('/')}
          >
            ProxyHub
          </Text>
          
          <Flex gap={4}>
            <Button variant="ghost" onClick={() => navigate('/settings')}>
              Settings
            </Button>
            <Button colorScheme="blue" onClick={() => navigate('/profile')}>
              Profile
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default DashboardHeader 