import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const {Text, Title} = Typography
const{Option} = Select

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data} = useGetCryptosQuery(100)

  const {data: cryptoNews} = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12})
  const demoImage = 'https://www.biamon.ch/wp-content/uploads/2018/03/2-2.jpg'
  const user = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  if(!cryptoNews?.value) return 'Loading ...'

  return (
    <>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder="Select a Crypto"
            optionFilterProp="chidren"
            onChange={(value) => setNewsCategory(value)}
            // It is filtering out the options so that it only shows the selected news
            filterOption={(input, option) => option.chidren.toLowerCase().indexOf(input.toLowerCase()) > 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                {/* Here, target="_blank" opens the linked document in a new window or tab */}
                <a href={news.url} target="_blank" rel="norefferrer">
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>{news.name}</Title>
                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                  </div>
                  <p>
                    {news.description > 100 
                      ? `${news.description.substring(0,100)} ...`
                      : news.description
                    }
                  </p>
                  <div className='provider-container'>
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || user} alt=""/>
                      <Text className='provider-name'>{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
        ))}
      </Row>
    </>
  )
}

export default News
