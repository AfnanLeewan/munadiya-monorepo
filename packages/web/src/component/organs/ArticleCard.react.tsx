import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

type ArticleCardProps = {
  topic: String
  writer: String
  cateagory: String[]
  coverImage: String
  date: String
}

export default function ArticleCard({
  topic,
  writer,
  cateagory,
  coverImage,
  date,
}: ArticleCardProps) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={coverImage}
          alt="article cover image"
        />
        {topic && (
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {writer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  )
}
