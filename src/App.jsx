import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'
import {Navbar, Exchanges, Homepage, CryptoCurrencies, News, CryptoDetails} from './components'
import './styles/App.css'

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path="/" element={<Homepage />}/>
            
              <Route path="/exchanges" element={<Exchanges />}/>
            
              <Route path="/cryptocurrencies" element={<CryptoCurrencies />}/>
            
              <Route path="/crypto/:coinId" element={<CryptoDetails />}/>
            
              <Route path="/news" element={<News />}/>
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{color:'white', textAlign:'center'}}>
            Crypto <br/>
            All rights reserved
          </Typography.Title>
          {/* space is like a div in antd with some designs */}
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
