import articleCover from '../../../../../../assets/images/article.jpg'

export const recArticles = {
  items: [
    {
      aid: '1',
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      category: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      aid: '2',
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      category: ['อากีดะห์', 'มันฮัจญ์'],
    },
    {
      aid: '3',
      topic: 'ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠',
      writer: 'เชคซอและห์ ซินดี้',
      coverImage: articleCover,
      date: '24 มีนาคม 2567',
      category: ['อากีดะห์', 'มันฮัจญ์'],
    },
  ],
}

const mockAmout = 12 * 16
let mockArticle = []
for (let i = 0; i < mockAmout; i++) {
  mockArticle.push({
    aid: `${i + 1}`,
    topic: `${i + 1}. ความสัมพันธ์ระหว่างตัวบทและสติปัญญา 🧠`,
    writer: 'เชคซอและห์ ซินดี้',
    coverImage: articleCover,
    date: '24 มีนาคม 2567',
    category: ['อากีดะห์', 'มันฮัจญ์'],
  })
}

export const articles = {
  article: mockArticle,
}
