import {
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Box
} from '@chakra-ui/react'

const ProxyListSkeleton = () => {
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
          {[1, 2, 3].map((item) => (
            <Tr key={item}>
              <Td><Skeleton height="20px" width="100px" /></Td>
              <Td><Skeleton height="20px" width="120px" /></Td>
              <Td><Skeleton height="20px" width="60px" /></Td>
              <Td>
                <HStack spacing={3}>
                  <Skeleton height="24px" width="70px" />
                  <Skeleton height="20px" width="40px" />
                </HStack>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Skeleton height="32px" width="60px" />
                  <Skeleton height="32px" width="60px" />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ProxyListSkeleton 