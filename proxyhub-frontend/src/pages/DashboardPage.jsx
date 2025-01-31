import {
  Box,
  Flex,
  Heading,
  Button,
  useColorModeValue,
  HStack
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import DashboardHeader from '../components/DashboardHeader'
import ProxyList from '../components/ProxyList'

const DashboardPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Flex direction="column" minH="100vh" w="100vw">
      <DashboardHeader />
      <Box 
        flex="1"
        bg={bgColor}
        w="100%"
        py={6}
      >
        <Flex 
          direction="column" 
          gap={6}
          px={{ base: 4, md: 6, lg: 8 }}
          maxW="100%"
          mx="auto"
        >
          <HStack justify="space-between" w="100%">
            <Heading size="lg">Dashboard</Heading>
            <Button 
              leftIcon={<AddIcon />} 
              colorScheme="blue"
              size="lg"
              onClick={() => {/* TODO: Implement add proxy */}}
            >
              Add Proxy
            </Button>
          </HStack>
          <Box 
            bg="white" 
            borderRadius="lg" 
            boxShadow="sm"
            w="100%"
            overflow="hidden"
          >
            <ProxyList />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default DashboardPage 