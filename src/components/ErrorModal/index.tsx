import { Box, Modal } from '@mui/material'
import { AxiosResponse } from 'axios'

export const ErrorModal = ({ error }: { error?: AxiosResponse }) => {
  return (
    <Modal open={!!error}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'auto',
          padding: 4,
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
        }}
      >
        {error?.data.message}
      </Box>
    </Modal>
  )
}
