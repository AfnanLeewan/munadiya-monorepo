import { CssBaseline, Grow, ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import App from './App'
import { client } from './services/react-query/client.react'
import { theme } from './theme'
import './i18n/config'

dayjs.extend(customParseFormat)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(weekOfYear)
dayjs.extend(isSameOrAfter)
dayjs.locale('th')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          SnackbarProps={{ style: { minWidth: 0 } }}
          TransitionComponent={Grow}
        >
          <App />
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <CssBaseline />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
