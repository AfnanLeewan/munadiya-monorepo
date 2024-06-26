import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, alpha } from '@mui/material'
import { theme } from '@/theme'

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

export default function ArticleCard({
  topic,
  writer,
  category,
  coverImage,
  date,
  w,
  h,
  onClick,
}: ArticleCardProps) {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: w,
        maxHeight: h,
        minWidth: '150px',
        cursor: 'pointer',
      }}
    >
      <CardActionArea>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={coverImage}
            loading="lazy"
            alt="article cover image"
            onClick={onClick}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {category.map((item, index) => {
              return (
                <Box
                  py="2px"
                  px="6px"
                  sx={{
                    backgroundColor: alpha(theme.palette.secondary.main, 0.91),
                    marginLeft: index > 0 ? '5px' : 0,
                    borderRadius: '6px',
                  }}
                >
                  <Typography
                    variant="body2"
                    color={theme.palette.text.primary}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
        {topic && (
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.2em',
                height: '2.4em',
              }}
            >
              {topic}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {writer}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {date}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  )
}
