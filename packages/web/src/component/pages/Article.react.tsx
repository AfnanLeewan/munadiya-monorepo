import ArticleCard from '../organs/ArticleCard.react'
import articleCover from '../../../../../assets/images/articleCover.jpg'
import { Box, Grid, Icon, Stack, Typography } from '@mui/material'
import { theme } from '@/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCircle,
  faMicrophone,
  faNewspaper,
  faPlayCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const article = {
  items: [
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
  ],
}

const recArticle = {
  items: [
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      cateagory: ['อากีดะห์', 'มันฮัจญ์'],
    },
  ],
}

function ArticlePage() {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} px={'20%'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'row'}
        gap={3}
      >
        <Typography color={theme.palette.secondary.main} variant="heading1">
          บทความ
        </Typography>
        <FontAwesomeIcon
          icon={faNewspaper}
          size="3x"
          color={theme.palette.secondary.main}
        />
      </Box>
      <Typography color={theme.palette.text.primary} variant="heading2" my={5}>
        บทความแนะนำ
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'row'}
        gap={3}
      >
        {recArticle.items.map((item) => {
          return (
            <ArticleCard
              cateagory={item.cateagory}
              coverImage={item.coverImage}
            />
          )
        })}
      </Box>
      <Typography color={theme.palette.text.primary} variant="heading2" my={5}>
        เลือกอ่านบทความ
      </Typography>
      {/* <Box display={'flex'} justifyContent={'center'} alignItems={'center'}> */}
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 3, md: 4 }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {article.items.map((item) => {
          return (
            <Grid item>
              <ArticleCard
                cateagory={item.cateagory}
                topic={item.topic}
                coverImage={item.coverImage}
                date={item.date}
                writer={item.writer}
              />
            </Grid>
          )
        })}
      </Grid>
      {/* </Box> */}
    </Stack>
  )
}
export default ArticlePage
