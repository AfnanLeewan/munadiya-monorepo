import { Container, Typography, Card, useTheme, Grid } from '@mui/material'

export default function Footer() {
  const theme = useTheme()
  return (
    <Card
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        padding:1,
        backgroundColor: theme.palette.secondary.main
      }}
      component="footer"
      square
      variant="outlined"
    >
    <Container maxWidth="lg">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography color="white" variant="subtitle2">
            Munadiya @Coppyright 2024
          </Typography>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </Container>
    </Card>
  )
}
