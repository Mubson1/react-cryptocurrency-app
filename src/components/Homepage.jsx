import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import CryptoCurrencies from './CryptoCurrencies'
import News from './News'
import Loader from './Loader'

const {Title} = Typography

const Homepage = () => {
  //using the hook that redux toolkit created while exporting this useGetCryptosQuery - isFetching is a state like loading or error
  const {data, isFetching} = useGetCryptosQuery(10)
  //if we console.log data, it will return something like: {...,...,data{...,...,stats,...}}.So, if there is data(above state), go inside the data property of the object and take the stats that is within that data property only if it exists
  //stats is also an object that contains properties like total, totalCoins, totalExchanges, etc
  const globalStats = data?.data?.stats
  if(isFetching) return <Loader />

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        {/* in ant design, there are 24 spaces and span={12} means col is going to take half the space of the screen*/}
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total}/>
        </Col>
        <Col span={12}>
          {/* millify converts long numbers into pretty, human-readable strings. For example, 30224 turns into 30.2K */}
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/>
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/>
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/>
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/>
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'>
          <Link to="/cryptocurrencies">
            Show More
          </Link>
        </Title>
      </div>
      <CryptoCurrencies simplified/>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'>
          <Link to="/news">
            Show More
          </Link>
        </Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage
