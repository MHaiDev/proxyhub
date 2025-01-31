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
import { useProxies } from '../context/ProxyContext'

const DashboardPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingProxy, setEditingProxy] = useState(null)
  const { proxies, addProxy, updateProxy, deleteProxy } = useProxies()

  const handleSubmit = (data) => {
    if (editingProxy) {
      updateProxy(editingProxy.id, data)
    } else {
      addProxy(data)
    }
    setEditingProxy(null)
    onClose()
  }

  const handleEdit = (proxy) => {
    setEditingProxy(proxy)
    onOpen()
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
              onDelete={deleteProxy}
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