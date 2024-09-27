import { useSnackbar, ProviderContext, VariantType } from 'notistack'

let useSnackbarRef: ProviderContext
export const SnackbarUtilitiesConfigurator = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export const snackbarUtilities = {
  toast(message: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(message, { variant })
  },
  success(message: string) {
    this.toast(message, 'success')
  },
  error(message: string) {
    this.toast(message, 'error')
  },
  info(message: string) {
    this.toast(message, 'info')
  },
  warning(message: string) {
    this.toast(message, 'warning')
  },
}
