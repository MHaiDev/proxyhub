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
  Box
} from '@chakra-ui/react'

// Mock data - will be replaced with real API data later
const MOCK_PROXIES = [
  { id: 1, name: 'Proxy 1', host: '192.168.1.1', port: 8080, status: 'active' },
  { id: 2, name: 'Proxy 2', host: '192.168.1.2', port: 8081, status: 'inactive' },
  { id: 3, name: 'Proxy 3', host: '192.168.1.3', port: 8082, status: 'active' }
]

const ProxyList = () => {
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
          {MOCK_PROXIES.map((proxy) => (
            <Tr key={proxy.id}>
              <Td>{proxy.name}</Td>
              <Td>{proxy.host}</Td>
              <Td isNumeric>{proxy.port}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(proxy.status)}>
                  {proxy.status}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="blue">
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red">
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