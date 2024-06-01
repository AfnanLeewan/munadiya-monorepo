import { IconButton } from '@mui/material'
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import { ReactNode, useCallback } from 'react'

export const useSnackbarQueue = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const dismissAction = useCallback(
    (key: SnackbarKey) => (
      <IconButton onClick={() => closeSnackbar(key)} size="small">
        <CloseIcon
          style={{
            color: 'inherit',
          }}
        />
      </IconButton>
    ),
    [closeSnackbar],
  )

  const enqueue = useCallback(
    (message: string | ReactNode, options: OptionsObject = {}) => {
      let snackbarOptions: OptionsObject = {
        ...options,
      }

      if (options.persist) {
        snackbarOptions = {
          ...options,
          action: dismissAction,
        }
      }

      return enqueueSnackbar(message, snackbarOptions)
    },
    [enqueueSnackbar, dismissAction],
  )

  return { enqueueSnackbar: enqueue, closeSnackbar }
}
