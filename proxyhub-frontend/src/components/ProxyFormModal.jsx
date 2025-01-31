import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  VStack,
  FormErrorMessage
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ProxyFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    port: '',
    status: false
  })

  const [errors, setErrors] = useState({})

  // Reset form data when initialData changes
  useEffect(() => {
    setFormData({
      name: initialData?.name || '',
      host: initialData?.host || '',
      port: initialData?.port || '',
      status: initialData?.status === 'active'
    })
    setErrors({})
  }, [initialData])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.host) newErrors.host = 'Host is required'
    if (!formData.port) newErrors.port = 'Port is required'
    if (formData.port && (formData.port < 1 || formData.port > 65535)) {
      newErrors.port = 'Port must be between 1 and 65535'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...formData,
        status: formData.status ? 'active' : 'inactive'
      })
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? 'Edit Proxy' : 'Add New Proxy'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Proxy"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.host}>
              <FormLabel>Host</FormLabel>
              <Input
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                placeholder="192.168.1.1 or proxy.example.com"
              />
              <FormErrorMessage>{errors.host}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.port}>
              <FormLabel>Port</FormLabel>
              <Input
                type="number"
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) || '' })}
                placeholder="8080"
              />
              <FormErrorMessage>{errors.port}</FormErrorMessage>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Active</FormLabel>
              <Switch
                isChecked={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {initialData ? 'Save Changes' : 'Add Proxy'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

ProxyFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    host: PropTypes.string,
    port: PropTypes.number,
    status: PropTypes.string
  })
}

export default ProxyFormModal 