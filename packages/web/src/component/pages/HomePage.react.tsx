<<<<<<< Updated upstream
function HomePage() {
  return (
    <div>This is HomePages</div>
=======
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import SimpleImageSlider from 'react-simple-image-slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
import cover from '../../../../../assets/images/cover.jpg'
import book from '../../../../../assets/images/book1.png'
import { theme } from '@/theme'

const CATAGORY_BOOK_AMOUNT = 7
const CATAGORY_BOOK = {
  item: [
    {
      nameTh: 'อะกีดะฮ์',
      nameAr: 'العقيدة',
    },
    {
      nameTh: 'อะกีดะฮ์',
      nameAr: 'العقيدة',
    },
    {
      nameTh: 'อะกีดะฮ์',
      nameAr: 'العقيدة',
    },
    {
      nameTh: 'อะกีดะฮ์',
      nameAr: 'العقيدة',
    },
  ],
  total: 7,
}
const RECOMMEND_BOOK = [book, book, book]
function HomePage() {
  const images = [{ url: cover }, { url: 'cover.jpg' }, { url: 'images/3.jpg' }]
  return (
    <Stack>
      <Box>
        <SimpleImageSlider
          width="100%"
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </Box>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="heading1">หมวดหมู่หนังสือ</Typography>
        <Typography variant="heading2" color={theme.palette.secondary.main}>
          {CATAGORY_BOOK_AMOUNT} หมวด
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        gap={4}
        mt={3}
        sx={{ width: '100%' }}
      >
        <Button>
          <FontAwesomeIcon
            size="4x"
            color={theme.palette.main.main}
            icon={faChevronCircleLeft}
          />
        </Button>
        {CATAGORY_BOOK.item.map((catagory) => {
          return (
            <Paper
              elevation={1}
              sx={{
                width: 270,
                height: 278,
                bgcolor: theme.palette.secondary.main,
                borderRadius: '25px',
              }}
            >
              <Stack alignItems="center">
                <Box
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: '100%', height: '174px' }}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography fontFamily={'Prompt'} color="white" variant="h2">
                    {catagory.nameAr}
                  </Typography>
                </Box>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={theme.palette.main.main}
                  sx={{
                    width: '100%',
                    height: '104px',
                    borderBottomRightRadius: '25px',
                    borderBottomLeftRadius: '25px',
                  }}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    color={theme.palette.secondary.main}
                    variant="heading3"
                  >
                    {catagory.nameTh}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )
        })}
        <Button>
          <FontAwesomeIcon
            size="4x"
            color={theme.palette.main.main}
            icon={faChevronCircleRight}
          />
        </Button>
      </Box>
      <Box>
        <Box mt={2} display="flex" justifyContent="center" gap={1}>
          <FontAwesomeIcon color={theme.palette.main.main} icon={faCircle} />
          <FontAwesomeIcon color={theme.palette.gray.dark} icon={faCircle} />
        </Box>
        <Typography
          mt={3}
          variant="heading2"
          align="center"
          color={theme.palette.secondary.main}
        >
          หนังสือแนะนำ
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={10}
          mt={5}
        >
          {RECOMMEND_BOOK.map((rbook) => {
            return (
              <Box
                bgcolor={theme.palette.main.main}
                sx={{
                  width: '300px',
                  height: '400px',
                  backgroundImage: `url(${rbook})`, // Set the background image
                  backgroundSize: 'cover', // Adjust the background size as needed
                  backgroundPosition: 'center', // Center the background image
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
            )
          })}
        </Box>
      </Box>
      <Typography
        mt={5}
        variant="heading2"
        sx={{ textDecoration: 'underline' }}
        align="center"
      >
        Ebooks สำหรับดาวน์โหลดฟรี
      </Typography>
      <Box>
        <Typography color={theme.palette.secondary.main} variant="heading1">
          บทความ
        </Typography>
        <Typography variant="h6" sx={{ width: '800px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          tincidunt dolor eget quam viverra, scelerisque sollicitudin lectus
        </Typography>
      </Box>
    </Stack>
>>>>>>> Stashed changes
  )
}

export default HomePage
