/**
 * Extended toaster, predfined styles and icons
 */
export function useNotify() {
  const toast = useToast()

  function notifySuccess(options: Partial<Toast>) {
    toast.add({
      color: 'success',
      icon: 'lucide-circle-check-big',
      progress: false,
      ...options,
    })
  }

  function notifyError(options: Partial<Toast>) {
    toast.add({
      color: 'error',
      icon: 'lucide-circle-x',
      progress: false,
      ...options,
    })
  }

  function notifyWarning(options: Partial<Toast>) {
    toast.add({
      color: 'warning',
      icon: 'lucide-circle-x',
      progress: false,
      ...options,
    })
  }

  return {
    notifyError,
    notifySuccess,
    notifyWarning,
  }
}
