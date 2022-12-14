import React from 'react'
import {Line} from 'react-chartjs-2'
import {Col, Row, Typography} from 'antd'

//while loading chartjs an error of "category is not a registered scale" was showing. This is how I solved it
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);


const {Title} = Typography

const LineChart = ({coinHistory, currentPrice, coinName}) => {
    const coinPrice = []
    const coinTimestamp = []
    
    //so, when the user selects 1day, length might be 1
    for(let i = 0; i < coinHistory?.data?.history?.length; i += 1){
        coinPrice.push(coinHistory?.data?.history[i].price)
    }
    for(let i = 0; i < coinHistory?.data?.history?.length; i += 1){
        // timestamp is like a code. So, we need to convert the timestamp to a date - toLocaleDateString would make the date more readable
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }
    console.log(coinTimestamp)

    //the data object that is required to create a chart looks like this:
    const data = {
        labels: coinTimestamp,
        
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }
    const options = {

      };

    return (
    <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                <Title level={5} className='current-price'>Current {coinName} Price: ${currentPrice}</Title>
            </Col>
        </Row>
        {/* To create a chart, we need data and options */}
        <Line data={data} options={options} />
    </>
  )
}

export default LineChart
