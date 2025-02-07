import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import { useRef } from 'react'
import PropTypes from 'prop-types'

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, proxyName, isLoading }) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Proxy
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete proxy &quot;{proxyName}&quot;? This action cannot be undone.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={onConfirm} 
              ml={3}
              isLoading={isLoading}
              loadingText="Deleting..."
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

DeleteConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  proxyName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

export default DeleteConfirmationDialog 