import { Box, StyledEngineProvider, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.react'
import Footer from './Footer.react'

export default function HomePageTemplate() {
  const theme = useTheme()
  return (
    <Box
      width="100%"
      bgcolor={theme.palette.gray.light}
      sx={{
        overflowX: 'hidden',
      }}
    >
      <StyledEngineProvider injectFirst>
        <Box>
          <Navbar />
          <Box>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </StyledEngineProvider>
    </Box>
  )
}
