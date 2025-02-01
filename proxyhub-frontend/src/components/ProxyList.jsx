import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  HStack,
  VStack,
  Switch,
  Text,
  useDisclosure,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { useProxies } from '../context/ProxyContext'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import ProxyListSkeleton from './ProxyListSkeleton'
import PropTypes from 'prop-types'

// Mock data - will be replaced with real API data later
/*const MOCK_PROXIES = [
  { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
  { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
  { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
]*/

const ProxyList = ({ proxies, onEdit }) => {
  const { 
    toggleProxyStatus, 
    deleteProxy, 
    isLoading,
    isDeleting,
    isToggling,
  } = useProxies()
  const [hoveredId, setHoveredId] = useState(null)
  const [proxyToDelete, setProxyToDelete] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // Responsive Layout
  const isMobile = useBreakpointValue({ base: true, md: false })

  // Validierung der Proxy-Daten
  const validProxies = proxies.map(proxy => ({
    ...proxy,
    id: proxy.id?.toString()
  }))

  if (isLoading) {
    return <ProxyListSkeleton />
  }

  const handleDeleteClick = (proxy) => {
    setProxyToDelete(proxy)
    onOpen()
  }

  const handleDeleteConfirm = () => {
    if (proxyToDelete) {
      deleteProxy(proxyToDelete.id)
      setProxyToDelete(null)
      onClose()
    }
  }

  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'gray'
  }

  const handleEdit = (proxy) => {
    onEdit(proxy)
  }

  // Hover-Handler für Switch
  const handleMouseEnter = (id) => {
    setHoveredId(id)
  }

  const handleMouseLeave = () => {
    setHoveredId(null)
  }

  // Mobile Card Layout
  if (isMobile) {
    return (
      <VStack spacing={4} align="stretch" w="full">
        {validProxies.map((proxy) => (
          <Box 
            key={proxy.id}
            p={4}
            bg="white"
            shadow="sm"
            rounded="lg"
          >
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontWeight="bold">{proxy.name}</Text>
                <Badge 
                  colorScheme={getStatusColor(proxy.status)}
                  width="70px"
                  textAlign="center"
                >
                  {proxy.status}
                </Badge>
              </HStack>
              
              <HStack justify="space-between">
                <Text color="gray.600">Host:</Text>
                <Text>{proxy.host}</Text>
              </HStack>
              
              <HStack justify="space-between">
                <Text color="gray.600">Port:</Text>
                <Text>{proxy.port}</Text>
              </HStack>
              
              <HStack justify="space-between" align="center">
                <Text color="gray.600">Status:</Text>
                <Box position="relative">
                  {hoveredId === proxy.id && (
                    <Text
                      position="absolute"
                      bottom="100%"
                      left="50%"
                      transform="translateX(-50%)"
                      fontSize="xs"
                      color="gray.600"
                      mb={1}
                      whiteSpace="nowrap"
                      bg="white"
                      px={2}
                      py={1}
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      Click to {proxy.status === 'active' ? 'deactivate' : 'activate'}
                    </Text>
                  )}
                  <Switch
                    size="sm"
                    isChecked={proxy.status === 'active'}
                    onChange={() => toggleProxyStatus(proxy.id)}
                    onMouseEnter={() => handleMouseEnter(proxy.id)}
                    onMouseLeave={handleMouseLeave}
                    isDisabled={isToggling}
                  />
                </Box>
              </HStack>
              
              <HStack spacing={2} justify="flex-end">
                <Button 
                  size="sm" 
                  colorScheme="blue"
                  onClick={() => handleEdit(proxy)}
                  isDisabled={isDeleting || isToggling}
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  colorScheme="red"
                  onClick={() => handleDeleteClick(proxy)}
                  isDisabled={isDeleting || isToggling}
                  leftIcon={isDeleting ? <Spinner size="sm" /> : null}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
        
        <DeleteConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleDeleteConfirm}
          proxyName={proxyToDelete?.name || ''}
          isLoading={isDeleting}
        />
      </VStack>
    )
  }

  // Desktop Table Layout
  return (
    <Box overflowX="auto" w="full">
      <Table variant="simple" w="full">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Host</Th>
            <Th>Port</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {validProxies.map((proxy) => (
            <Tr key={proxy.id}>
              <Td>{proxy.name}</Td>
              <Td>{proxy.host}</Td>
              <Td isNumeric>{proxy.port}</Td>
              <Td>
                <HStack spacing={3} justifyContent="flex-start" minW="140px">
                  <Badge 
                    colorScheme={getStatusColor(proxy.status)}
                    width="70px"
                    textAlign="center"
                  >
                    {proxy.status}
                  </Badge>
                  <Box position="relative">
                    {hoveredId === proxy.id && (
                      <Text
                        position="absolute"
                        bottom="100%"
                        left="50%"
                        transform="translateX(-50%)"
                        fontSize="xs"
                        color="gray.600"
                        mb={1}
                        whiteSpace="nowrap"
                        bg="white"
                        px={2}
                        py={1}
                        borderRadius="md"
                        boxShadow="sm"
                      >
                        Click to {proxy.status === 'active' ? 'deactivate' : 'activate'}
                      </Text>
                    )}
                    <Switch
                      size="sm"
                      isChecked={proxy.status === 'active'}
                      onChange={() => toggleProxyStatus(proxy.id)}
                      onMouseEnter={() => handleMouseEnter(proxy.id)}
                      onMouseLeave={handleMouseLeave}
                      isDisabled={isToggling}
                    />
                  </Box>
                </HStack>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button 
                    size="sm" 
                    colorScheme="blue"
                    onClick={() => handleEdit(proxy)}
                    isDisabled={isDeleting || isToggling}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="red"
                    onClick={() => handleDeleteClick(proxy)}
                    isDisabled={isDeleting || isToggling}
                    leftIcon={isDeleting ? <Spinner size="sm" /> : null}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <DeleteConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteConfirm}
        proxyName={proxyToDelete?.name || ''}
        isLoading={isDeleting}
      />
    </Box>
  )
}

ProxyList.propTypes = {
  proxies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      port: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired
}

export default ProxyList 