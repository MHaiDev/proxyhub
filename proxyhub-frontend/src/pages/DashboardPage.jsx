import {
  Box,
  Flex,
  Heading,
  Button,
  useColorModeValue,
  HStack,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import ProxyList from '../components/ProxyList'
import ProxyFormModal from '../components/ProxyFormModal'

const DashboardPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [proxies, setProxies] = useState([
    { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
    { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
    { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
  ])
  const [editingProxy, setEditingProxy] = useState(null)

  const handleSubmit = (data) => {
    if (editingProxy) {
      // Edit existing proxy
      setProxies(proxies.map(proxy => 
        proxy.id === editingProxy.id ? { ...data, id: proxy.id } : proxy
      ))
    } else {
      // Add new proxy
      setProxies([...proxies, { ...data, id: Date.now() }])
    }
    setEditingProxy(null)
  }

  const handleEdit = (proxy) => {
    setEditingProxy(proxy)
    onOpen()
  }

  const handleDelete = (proxyId) => {
    setProxies(proxies.filter(proxy => proxy.id !== proxyId))
  }

  const handleAddNew = () => {
    setEditingProxy(null)
    onOpen()
  }

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
              onClick={handleAddNew}
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
            <ProxyList 
              proxies={proxies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        </Flex>
      </Box>

      <ProxyFormModal
        isOpen={isOpen}
        onClose={onClose}
        initialData={editingProxy}
        onSubmit={handleSubmit}
      />
    </Flex>
  )
}

export default DashboardPage 