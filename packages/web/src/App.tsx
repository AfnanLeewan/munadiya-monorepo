import { RouterProvider } from 'react-router-dom'
// import { FieldFormatTokenMap, LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
// import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import router from '@/routers/index'
// import AuthProvider from '@/providers/AuthProvider'
// import { useEnv } from '@/hooks/useEnv'
// import { useSnackbarQueue } from '@/hooks/useSnackbarQueue'
// import { EnvContextProvider } from '@/providers/EnvProvider'
import { useGetAPI } from './hooks/useAPI'
import { envService } from './services/EnvService'

export default function App() {
  const backendUrl = envService.getBackendUrl()
  const { data } = useGetAPI<{ message: string }>(`${backendUrl}/hello`)
  // const { data: envConfig, loading, error } = useEnv()
  // const { enqueueSnackbar } = useSnackbarQueue()
  // useEffect(() => {
  //   if (error) {
  //     enqueueSnackbar('เกิดข้อผิดพลาดในการโหลดข้อมูล', { variant: 'error' })
  //   }
  // }, [enqueueSnackbar, envConfig, error])

  // if (loading || !envConfig) {
  //   return <div>Loading...</div>
  // }

  return (
    // <EnvContextProvider data={envConfig}>
    //   <React.Suspense fallback={<div>Loading...</div>}>
    //     <LocalizationProvider
    //       dateAdapter={BuddhistEraAdapter}
    //       adapterLocale="th"
    //       dateFormats={{
    //         year: 'BBBB',
    //         monthAndYear: 'MMMM BBBB',
    //       }}
    //     >
    //       <AuthProvider>
    //      <RouterProvider router={router} />
    //       </AuthProvider>
    //     </LocalizationProvider>
    //   </React.Suspense>
    // </EnvContextProvider>
    <>
      <Box>data from back : {data?.message}</Box>
      <RouterProvider router={router} />
    </>
  )
}
