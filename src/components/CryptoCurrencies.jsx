import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import {useGetCryptosQuery} from '../services/cryptoApi'
import Loader from './Loader'

const CryptoCurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)
  },[cryptosList, searchTerm])
  if(isFetching) return <Loader />

  return (
    <>
      {!simplified &&
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>}

      {/* gutters is used in antd which is simply some spaces between items */}
      <Row gutter={[32,32]} className="crypto-card-contaier">
        {cryptos?.map((currency) => (
          //Since a col has a total width of 24. So, when the screen is extra small, show 1 item(24/24) and if large, show 4 items(24/6)
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
                <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className='crypto-image' src={currency.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </Card>
              </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies
