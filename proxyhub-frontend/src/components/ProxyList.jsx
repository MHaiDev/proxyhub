import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  HStack,
  Box,
  Switch,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { useProxies } from '../context/ProxyContext'

// Mock data - will be replaced with real API data later
const MOCK_PROXIES = [
  { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
  { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
  { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
]

const ProxyList = ({ proxies, onEdit, onDelete }) => {
  const { toggleProxyStatus } = useProxies()
  const [hoveredId, setHoveredId] = useState(null)
  
  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'gray'
  }

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
          {proxies.map((proxy) => (
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
                      onMouseEnter={() => setHoveredId(proxy.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    />
                  </Box>
                </HStack>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button 
                    size="sm" 
                    colorScheme="blue"
                    onClick={() => onEdit(proxy)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="red"
                    onClick={() => onDelete(proxy.id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ProxyList 