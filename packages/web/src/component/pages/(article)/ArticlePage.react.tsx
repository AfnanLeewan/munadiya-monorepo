import ArticleCard from '../../organs/ArticleCard.react'
import articleCover from '../../../../../assets/images/article.jpg'
import { Box, Grid, Icon, Pagination, Stack, Typography } from '@mui/material'
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
import React, { useEffect, useState } from 'react'
import { articles } from './mockdata'
import { recArticles } from './mockdata'
import ArticleModal from '@/component/organs/ArticleModal.react'

type ArticleCardProps = {
  topic: string
  writer: string
  category: string[]
  coverImage: string
  date: string
  h: string
  w: string
  onClick: () => void
}

function ArticlePage() {
  const [page, setPage] = useState(1)
  const [articleData, setArticleData] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState('')

  const totalPages = Math.ceil(articles.article.length / 12)

  const handleOpenModal = (aid: string) => {
    setSelectedArticle(aid)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedArticle('')
  }

  const handlePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    setPage(pageNumber)
  }

  const fetchArticle = (page: number) => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const data = articles.article.slice((page - 1) * 12, page * 12)
      setArticleData(data)
      setIsLoading(false)
      console.log(data)
    }, 500)
  }

  useEffect(() => {
    fetchArticle(page)
  }, [page])

  return (
    <Stack justifyContent={'center'} alignItems={'center'} display={'flex'}>
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
        mb={8}
        sx={{ width: '100%' }}
      >
        {recArticles.items.map((item, index) => {
          return (
            <ArticleCard
              onClick={() => handleOpenModal(item.aid)}
              category={item.category}
              coverImage={item.coverImage}
              w={index === 1 ? '400px' : '300px'}
              h={index === 1 ? '400px' : '300px'}
            />
          )
        })}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        bgcolor={theme.palette.main.main}
        px={'20%'}
        pt={1}
        pb={5}
        sx={{
          width: '100%',
          borderTopLeftRadius: '50px',
          borderTopRightRadius: '50px',
        }}
      >
        <Typography
          color={theme.palette.text.primary}
          variant="heading2"
          my={5}
        >
          เลือกอ่านบทความ
        </Typography>
        {!isLoading && articleData.length > 0 ? (
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 3, md: 4 }}
            columnSpacing={{ xs: 0, sm: 3, md: 4 }}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {articleData.map((article, index) => (
              <Grid
                item
                key={article.aid}
                xs={12}
                sm={6}
                md={3}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <ArticleCard
                  onClick={() => handleOpenModal(article.aid)}
                  category={article.category}
                  topic={article.topic}
                  coverImage={article.coverImage}
                  date={article.date}
                  writer={article.writer}
                  w={'250px'}
                  h={'400px'}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box py={40}>Loading...</Box>
        )}

        <Box my={5}>
          <Pagination
            count={totalPages}
            size="large"
            color="secondary"
            page={page}
            onChange={handlePage}
          />
        </Box>
      </Box>

      <ArticleModal
        open={modalOpen}
        handleClose={handleCloseModal}
        articleId={selectedArticle}
      />
    </Stack>
  )
}
export default ArticlePage
