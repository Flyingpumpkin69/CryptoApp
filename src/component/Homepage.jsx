import React from 'react';
import milifiy from 'millify';
import {Cryptocurrencies,News} from '../component'
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
const {Title} = Typography


const Homepage = () => {
const {data, isFetching } = useGetCryptosQuery(10);

const globalStats = data?.data?.stats;
// console.log(`this is`)
if(isFetching) return 'loading...'

  return (
    <>
    <Title level={2} className='heading'>
        Global Cryptocurrencies Stats
    </Title>
    <Row>
      <Col span={12}> <Statistic title='Total Cryptocurrencies' value={globalStats.total}/> </Col>
      
      <Col span={12}> <Statistic title='Total Marketcap' value={milifiy(globalStats.totalMarketCap)} /> </Col>
      <Col span={12}> <Statistic title='Total 24h Volume' value={milifiy(globalStats.total24hVolume)} /> </Col>
      <Col span={12}> <Statistic title='Total Markets' value={milifiy(globalStats.totalMarkets)}/> </Col>
    </Row>
    <div className='home-heading-container'>
      <Title level={2} className='home-title'>TOP 10 Cryptocurrencies in the world</Title>
      <Title level={3} className='show-more'><Link to='/cryptocurrencies'>SHOW MORE</Link></Title>
    </div>
    <Cryptocurrencies simplified/>
    <div className='home-heading-container'>
      <Title level={2} className='home-title'>Latest crypto new</Title>
      <Title level={3} className='show-more'><Link to='/news'>SHOW MORE</Link></Title>
    </div>
    <News simplified/>
    </>
  )
}

export default Homepage