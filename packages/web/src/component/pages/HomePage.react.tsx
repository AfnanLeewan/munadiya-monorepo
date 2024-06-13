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
  faMicrophone,
  faPlayCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import cover from '../../../../../assets/images/cover.jpg'
import book from '../../../../../assets/images/book1.png'
import article from '../../../../../assets/images/article.jpg'
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
const RECOMMEND_ARTICLE = [article, article, article, article]
function HomePage() {
  const images = [{ url: cover }, { url: 'cover.jpg' }, { url: 'images/3.jpg' }]
  const YoutubeEmbed = () => (
    <Box>
      <iframe
        width="700"
        height="450"
        src={`https://www.youtube.com/embed/G7e3kgahJ4g`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  )

  return (
    <Stack >
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
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >

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

      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Box mx="10%" display="flex" my={10} gap={10}>
        <Box>
          <YoutubeEmbed />
        </Box>
        <Box mt={10}>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography color={theme.palette.main.main} variant="heading1">
              วิดีโอ
            </Typography>
            <FontAwesomeIcon
              color={theme.palette.main.main}
              size="5x"
              icon={faPlayCircle}
            />
          </Box>
          <Typography variant="h6" sx={{ width: '600px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            tincidunt dolor eget quam viverra, scelerisque sollicitudin lectus
          </Typography>
          <Button
            sx={{
              bgcolor: theme.palette.main.main,
              gap: 1,
              borderRadius: 3,
              my: 3,
              color: 'white',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <Typography variant="h6" color="white">
              เพิ่มเติม
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box mx="10%" display="flex" my={10} gap={10}>
        <Box mt={10}>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography color={theme.palette.secondary.main} variant="heading1">
              พอดแคส
            </Typography>
            <FontAwesomeIcon
              color={theme.palette.secondary.main}
              size="5x"
              icon={faMicrophone}
            />
          </Box>
          <Typography variant="h6" sx={{ width: '800px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            tincidunt dolor eget quam viverra, scelerisque sollicitudin lectus
          </Typography>
          <Button
            sx={{
              bgcolor: theme.palette.secondary.main,
              gap: 1,
              borderRadius: 3,
              my: 3,
              color: 'white',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <Typography variant="h6" color="white">
              เพิ่มเติม
            </Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: 3,
              bgcolor: 'white',
            }}
          >
            <FontAwesomeIcon
              color={theme.palette.secondary.main}
              size="3x"
              icon={faMicrophone}
            />
            <Typography variant="h6" sx={{ width: '400px' }}>
              Lorem ipsum dolor sit amet,
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: 3,
              bgcolor: 'white',
            }}
          >
            <FontAwesomeIcon
              color={theme.palette.secondary.main}
              size="3x"
              icon={faMicrophone}
            />
            <Typography variant="h6" sx={{ width: '400px' }}>
              Lorem ipsum dolor sit amet,
            </Typography>
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: 3,
              bgcolor: 'white',
            }}
          >
            <FontAwesomeIcon
              color={theme.palette.secondary.main}
              size="3x"
              icon={faMicrophone}
            />
            <Typography variant="h6" sx={{ width: '400px' }}>
              Lorem ipsum dolor sit amet,
            </Typography>
          </Paper>
        </Box>
      </Box>
      </Box>
      <Box
        mt={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="heading1">พวกเราคือใคร ?</Typography>
        <Box
          p="10%"
          display="flex"
          width="100"
          flexDirection="column"
          gap={6}
          mt={5}
          bgcolor="#F2F0F0"
        >
          <Typography variant="h4" align="center">
            “พวกเราคือคนกลุ่มเล็กๆ ที่มีความฝัน
            และอุดมการณ์ที่จะสร้างมาตรฐานการเรียนรู้อิสลามอย่างเป็นรูปธรรมให้เกิดขึ้นในประเทศไทย”
          </Typography>
          <Typography variant="h4" align="center">
            งานของเรา คือ
            การถ่ายทอดองค์ความรู้วิชาการศาสนาที่นักวิชาการแนะนำมาสู่ภาษาไทย
            ผ่านการสอนอย่างเป็นระบบและงานแปล โดยทำการคัดเลือกอย่างเป็นขั้นตอน
            ให้เหมาะสมกับสถานะของผู้เรียน ตามคำแนะนำของนักวิชาการอิสลาม
          </Typography>
        </Box>
      </Box>
      <Box
        m={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="heading1">ติดต่อเรา</Typography>
        <Typography variant="h4">Facebook : XXXXXXXX</Typography>
        <Typography variant="h4">Telephone : 0XX-XXX-XXXX</Typography>
        <Typography variant="h4">Email : munadiya@email.com</Typography>
      </Box>
    </Stack>
  )
}

export default HomePage
